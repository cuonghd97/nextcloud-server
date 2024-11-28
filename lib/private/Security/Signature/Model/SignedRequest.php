<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OC\Security\Signature\Model;

use JsonSerializable;
use NCU\Security\Signature\Exceptions\SignatoryNotFoundException;
use NCU\Security\Signature\Exceptions\SignatureElementNotFoundException;
use NCU\Security\Signature\ISignedRequest;
use NCU\Security\Signature\Model\Signatory;

/**
 * @inheritDoc
 *
 * @since 31.0.0
 */
class SignedRequest implements ISignedRequest, JsonSerializable {
	private string $digest;
	private array $signingElements = [];
	private array $signatureData = [];
	private string $signature = '';
	private ?Signatory $signatory = null;

	public function __construct(
		private readonly string $body,
	) {
		// digest is created on the fly using $body
		$this->digest = 'SHA-256=' . base64_encode(hash('sha256', mb_convert_encoding($body, 'UTF-8', mb_detect_encoding($body)), true));
	}

	/**
	 * @inheritDoc
	 *
	 * @return string
	 * @since 31.0.0
	 */
	public function getBody(): string {
		return $this->body;
	}

	/**
	 * @inheritDoc
	 *
	 * @return string
	 * @since 31.0.0
	 */
	public function getDigest(): string {
		return $this->digest;
	}

	/**
	 * @inheritDoc
	 *
	 * @param array $elements
	 *
	 * @return self
	 * @since 31.0.0
	 */
	public function setSigningElements(array $elements): self {
		$this->signingElements = $elements;
		return $this;
	}

	/**
	 * @inheritDoc
	 *
	 * @return array
	 * @since 31.0.0
	 */
	public function getSigningElements(): array {
		return $this->signingElements;
	}

	/**
	 * @param string $key
	 *
	 * @return string
	 * @throws SignatureElementNotFoundException
	 * @since 31.0.0
	 *
	 */
	public function getSigningElement(string $key): string { // getSignatureDetail / getSignatureEntry() ?
		if (!array_key_exists($key, $this->signingElements)) {
			throw new SignatureElementNotFoundException('missing element ' . $key . ' in Signature header');
		}

		return $this->signingElements[$key];
	}

	/**
	 * @inheritDoc
	 *
	 * @param array $data
	 *
	 * @return self
	 * @since 31.0.0
	 */
	public function setSignatureData(array $data): self {
		$this->signatureData = $data;
		return $this;
	}

	/**
	 * @inheritDoc
	 *
	 * @return array
	 * @since 31.0.0
	 */
	public function getSignatureData(): array {
		return $this->signatureData;
	}

	/**
	 * @inheritDoc
	 *
	 * @param string $signature
	 *
	 * @return self
	 * @since 31.0.0
	 */
	public function setSignature(string $signature): self {
		$this->signature = $signature;
		return $this;
	}

	/**
	 * @inheritDoc
	 *
	 * @return string
	 * @since 31.0.0
	 */
	public function getSignature(): string {
		return $this->signature;
	}

	/**
	 * @inheritDoc
	 *
	 * @param Signatory $signatory
	 * @return self
	 * @since 31.0.0
	 */
	public function setSignatory(Signatory $signatory): self {
		$this->signatory = $signatory;
		return $this;
	}

	/**
	 * @inheritDoc
	 *
	 * @return Signatory
	 * @throws SignatoryNotFoundException
	 * @since 31.0.0
	 */
	public function getSignatory(): Signatory {
		if ($this->signatory === null) {
			throw new SignatoryNotFoundException();
		}

		return $this->signatory;
	}

	/**
	 * @inheritDoc
	 *
	 * @return bool
	 * @since 31.0.0
	 */
	public function hasSignatory(): bool {
		return ($this->signatory !== null);
	}

	public function jsonSerialize(): array {
		return [
			'body' => $this->body,
			'digest' => $this->digest,
			'signatureElements' => $this->signingElements,
			'clearSignature' => $this->signatureData,
			'signedSignature' => $this->signature,
			'signatory' => $this->signatory ?? false,
		];
	}
}
