<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OC\Security\Signature\Model;

use JsonSerializable;
use NCU\Security\Signature\Enum\SignatureAlgorithm;
use NCU\Security\Signature\Exceptions\IdentityNotFoundException;
use NCU\Security\Signature\Exceptions\IncomingRequestException;
use NCU\Security\Signature\Exceptions\InvalidSignatureException;
use NCU\Security\Signature\Exceptions\SignatoryException;
use NCU\Security\Signature\Exceptions\SignatoryNotFoundException;
use NCU\Security\Signature\Exceptions\SignatureElementNotFoundException;
use NCU\Security\Signature\Exceptions\SignatureException;
use NCU\Security\Signature\Exceptions\SignatureNotFoundException;
use NCU\Security\Signature\IIncomingSignedRequest;
use NCU\Security\Signature\ISignatureManager;
use NCU\Security\Signature\Model\Signatory;
use OC\Security\Signature\SignatureManager;
use OCP\IRequest;

/**
 * @inheritDoc
 *
 * @see ISignatureManager for details on signature
 * @since 31.0.0
 */
class IncomingSignedRequest extends SignedRequest implements
	IIncomingSignedRequest,
	JsonSerializable {
	private string $origin = '';

	/**
	 * @throws IncomingRequestException if incoming request is wrongly signed
	 * @throws SignatureNotFoundException if signature is not fully implemented
	 */
	public function __construct(
		string $body,
		private readonly IRequest $request,
		private readonly array $options = [],
	) {
		parent::__construct($body);
		$this->verifyHeadersFromRequest();
		$this->extractSignatureHeaderFromRequest();
	}

	/**
	 * confirm that:
	 *
	 * - date is available in the header and its value is less than 5 minutes old
	 * - content-length is available and is the same as the payload size
	 * - digest is available and fit the checksum of the payload
	 *
	 * @throws IncomingRequestException
	 * @throws SignatureNotFoundException
	 */
	private function verifyHeadersFromRequest(): void {
		// confirm presence of date, content-length, digest and Signature
		$date = $this->getRequest()->getHeader('date');
		if ($date === '') {
			throw new SignatureNotFoundException('missing date in header');
		}
		$contentLength = $this->getRequest()->getHeader('content-length');
		if ($contentLength === '') {
			throw new SignatureNotFoundException('missing content-length in header');
		}
		$digest = $this->getRequest()->getHeader('digest');
		if ($digest === '') {
			throw new SignatureNotFoundException('missing digest in header');
		}
		if ($this->getRequest()->getHeader('Signature') === '') {
			throw new SignatureNotFoundException('missing Signature in header');
		}

		// confirm date
		try {
			$dTime = new \DateTime($date);
			$requestTime = $dTime->getTimestamp();
		} catch (\Exception) {
			throw new IncomingRequestException('datetime exception');
		}
		if ($requestTime < (time() - ($this->options['ttl'] ?? SignatureManager::DATE_TTL))) {
			throw new IncomingRequestException('object is too old');
		}

		// confirm validity of content-length
		if (strlen($this->getBody()) !== (int)$contentLength) {
			throw new IncomingRequestException('inexact content-length in header');
		}

		// confirm digest value, based on body
		if ($digest !== $this->getDigest()) {
			throw new IncomingRequestException('invalid value for digest in header');
		}
	}

	/**
	 * extract data from the header entry 'Signature' and convert its content from string to an array
	 * also confirm that it contains the minimum mandatory information
	 *
	 * @throws IncomingRequestException
	 */
	private function extractSignatureHeaderFromRequest(): void {
		$details = [];
		foreach (explode(',', $this->getRequest()->getHeader('Signature')) as $entry) {
			if ($entry === '' || !strpos($entry, '=')) {
				continue;
			}

			[$k, $v] = explode('=', $entry, 2);
			preg_match('/^"([^"]+)"$/', $v, $var);
			if ($var[0] !== '') {
				$v = trim($var[0], '"');
			}
			$details[$k] = $v;
		}

		$this->setSigningElements($details);

		try {
			// confirm keys are in the Signature header
			$this->getSigningElement('keyId');
			$this->getSigningElement('headers');
			$this->setSignature($this->getSigningElement('signature'));
		} catch (SignatureElementNotFoundException $e) {
			throw new IncomingRequestException($e->getMessage());
		}
	}

	/**
	 * @inheritDoc
	 *
	 * @return IRequest
	 * @since 31.0.0
	 */
	public function getRequest(): IRequest {
		return $this->request;
	}

	/**
	 * @inheritDoc
	 *
	 * @param Signatory $signatory
	 *
	 * @return $this
	 * @throws IdentityNotFoundException
	 * @throws IncomingRequestException
	 * @throws SignatoryException
	 * @since 31.0.0
	 */
	public function setSignatory(Signatory $signatory): self {
		$identity = \OCP\Server::get(ISignatureManager::class)->extractIdentityFromUri($signatory->getKeyId());
		if ($identity !== $this->getOrigin()) {
			throw new SignatoryException('keyId from provider is different from the one from signed request');
		}

		parent::setSignatory($signatory);
		return $this;
	}

	/**
	 * @inheritDoc
	 *
	 * @param string $origin
	 * @return IIncomingSignedRequest
	 * @since 31.0.0
	 */
	public function setOrigin(string $origin): IIncomingSignedRequest {
		$this->origin = $origin;
		return $this;
	}

	/**
	 * @inheritDoc
	 *
	 * @return string
	 * @throws IncomingRequestException
	 * @since 31.0.0
	 */
	public function getOrigin(): string {
		if ($this->origin === '') {
			throw new IncomingRequestException('empty origin');
		}
		return $this->origin;
	}

	/**
	 * returns the keyId extracted from the signature headers.
	 * keyId is a mandatory entry in the headers of a signed request.
	 *
	 * @return string
	 * @throws SignatureElementNotFoundException
	 * @since 31.0.0
	 */
	public function getKeyId(): string {
		return $this->getSigningElement('keyId');
	}

	/**
	 * @inheritDoc
	 *
	 * @throws SignatureException
	 * @throws SignatoryNotFoundException
	 * @since 31.0.0
	 */
	public function verify(): void {
		$publicKey = $this->getSignatory()->getPublicKey();
		if ($publicKey === '') {
			throw new SignatoryNotFoundException('empty public key');
		}

		$algorithm = SignatureAlgorithm::tryFrom($this->getSigningElement('algorithm')) ?? SignatureAlgorithm::SHA256;
		if (openssl_verify(
			implode("\n", $this->getSignatureData()),
			base64_decode($this->getSignature()),
			$publicKey,
			$algorithm->value
		) !== 1) {
			throw new InvalidSignatureException('signature issue');
		}
	}

	public function jsonSerialize(): array {
		return array_merge(
			parent::jsonSerialize(),
			[
				'options' => $this->options,
				'origin' => $this->origin,
			]
		);
	}
}
