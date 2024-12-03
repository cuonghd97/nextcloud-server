/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/theming/src/helpers/refreshStyles.js":
/*!***************************************************!*\
  !*** ./apps/theming/src/helpers/refreshStyles.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   refreshStyles: () => (/* binding */ refreshStyles)
/* harmony export */ });
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Refresh server-side generated theming CSS
 * This resolves when all themes are reloaded
 */
async function refreshStyles() {
  const themes = [...document.head.querySelectorAll('link.theme')];
  const promises = themes.map(theme => new Promise(resolve => {
    const url = new URL(theme.href);
    url.searchParams.set('v', Date.now());
    const newTheme = theme.cloneNode();
    newTheme.href = url.toString();
    newTheme.onload = () => {
      theme.remove();
      resolve();
    };
    document.head.append(newTheme);
  }));

  // Wait until all themes are loaded
  await Promise.allSettled(promises);
}

/***/ }),

/***/ "./apps/theming/src/personal-settings.js":
/*!***********************************************!*\
  !*** ./apps/theming/src/personal-settings.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.mjs");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _helpers_refreshStyles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/refreshStyles.js */ "./apps/theming/src/helpers/refreshStyles.js");
/* harmony import */ var _UserTheming_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserTheming.vue */ "./apps/theming/src/UserTheming.vue");
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */





// eslint-disable-next-line camelcase
__webpack_require__.nc = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getCSPNonce)();
vue__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.OC = OC;
vue__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.t = t;
const View = vue__WEBPACK_IMPORTED_MODULE_3__["default"].extend(_UserTheming_vue__WEBPACK_IMPORTED_MODULE_2__["default"]);
const theming = new View();
theming.$mount('#theming');
theming.$on('update:background', _helpers_refreshStyles_js__WEBPACK_IMPORTED_MODULE_1__.refreshStyles);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=script&lang=ts":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=script&lang=ts ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _vueuse_integrations_useSortable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vueuse/integrations/useSortable */ "./node_modules/@vueuse/integrations/useSortable.mjs");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-frag */ "./node_modules/vue-frag/dist/frag.esm.js");
/* harmony import */ var _AppOrderSelectorElement_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppOrderSelectorElement.vue */ "./apps/theming/src/components/AppOrderSelectorElement.vue");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_3__.defineComponent)({
  name: 'AppOrderSelector',
  components: {
    AppOrderSelectorElement: _AppOrderSelectorElement_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    Fragment: vue_frag__WEBPACK_IMPORTED_MODULE_1__.Fragment
  },
  props: {
    /**
     * Details like status information that need to be forwarded to the interactive elements
     */
    ariaDetails: {
      type: String,
      default: null
    },
    /**
     * List of apps to reorder
     */
    value: {
      type: Array,
      required: true
    }
  },
  emits: {
    /**
     * Update the apps list on reorder
     * @param value The new value of the app list
     */
    'update:value': value => Array.isArray(value)
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    /**
     * The Element that contains the app list
     */
    const listElement = (0,vue__WEBPACK_IMPORTED_MODULE_3__.ref)(null);
    /**
     * The app list with setter that will ement the `update:value` event
     */
    const appList = (0,vue__WEBPACK_IMPORTED_MODULE_3__.computed)({
      get: () => props.value,
      // Ensure the sortable.js does not mess with the default attribute
      set: list => {
        const newValue = [...list].sort((a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0) || list.indexOf(a) - list.indexOf(b));
        if (newValue.some((_ref2, index) => {
          let {
            id
          } = _ref2;
          return id !== props.value[index].id;
        })) {
          emit('update:value', newValue);
        } else {
          // forceUpdate as the DOM has changed because of a drag event, but the reactive state has not -> wrong state
          renderCount.value += 1;
        }
      }
    });
    /**
     * Helper to force rerender the list in case of a invalid drag event
     */
    const renderCount = (0,vue__WEBPACK_IMPORTED_MODULE_3__.ref)(0);
    /**
     * Handle drag & drop sorting
     */
    (0,_vueuse_integrations_useSortable__WEBPACK_IMPORTED_MODULE_4__.useSortable)(listElement, appList, {
      filter: '.order-selector-element--disabled'
    });
    /**
     * Array of all AppOrderSelectorElement components used to for keeping the focus after button click
     */
    const selectorElements = (0,vue__WEBPACK_IMPORTED_MODULE_3__.ref)([]);
    /**
     * We use the updated hook here to verify all selector elements keep the focus on the last pressed button
     * This is needed to be done in this component to make sure Sortable.JS has finished sorting the elements before focussing an element
     */
    (0,vue__WEBPACK_IMPORTED_MODULE_3__.onUpdated)(() => {
      selectorElements.value.forEach(element => element.keepFocus());
    });
    /**
     * Handle element is moved up
     * @param index The index of the element that is moved
     */
    const moveUp = index => {
      const before = index > 1 ? props.value.slice(0, index - 1) : [];
      // skip if not possible, because of default default app
      if (props.value[index - 1]?.default) {
        return;
      }
      const after = [props.value[index - 1]];
      if (index < props.value.length - 1) {
        after.push(...props.value.slice(index + 1));
      }
      emit('update:value', [...before, props.value[index], ...after]);
    };
    /**
     * Handle element is moved down
     * @param index The index of the element that is moved
     */
    const moveDown = index => {
      const before = index > 0 ? props.value.slice(0, index) : [];
      before.push(props.value[index + 1]);
      const after = index < props.value.length - 2 ? props.value.slice(index + 2) : [];
      emit('update:value', [...before, props.value[index], ...after]);
    };
    /**
     * Additional status information to show to screen reader users for accessibility
     */
    const statusInfo = (0,vue__WEBPACK_IMPORTED_MODULE_3__.ref)('');
    /**
     * ID to be used on the status info element
     */
    const statusInfoId = `sorting-status-info-${(Math.random() + 1).toString(36).substring(7)}`;
    /**
     * Update the status information for the currently selected app
     * @param index Index of the app that is currently selected
     */
    const updateStatusInfo = index => {
      statusInfo.value = (0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__.translate)('theming', 'Current selected app: {app}, position {position} of {total}', {
        app: props.value[index].label,
        position: index + 1,
        total: props.value.length
      });
    };
    return {
      appList,
      listElement,
      moveDown,
      moveUp,
      statusInfoId,
      statusInfo,
      updateStatusInfo,
      renderCount,
      selectorElements
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=script&lang=ts":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=script&lang=ts ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_material_design_icons_ArrowDown_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-material-design-icons/ArrowDown.vue */ "./node_modules/vue-material-design-icons/ArrowDown.vue");
/* harmony import */ var vue_material_design_icons_ArrowUp_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-material-design-icons/ArrowUp.vue */ "./node_modules/vue-material-design-icons/ArrowUp.vue");
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcButton.mjs");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_4__.defineComponent)({
  name: 'AppOrderSelectorElement',
  components: {
    IconArrowDown: vue_material_design_icons_ArrowDown_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    IconArrowUp: vue_material_design_icons_ArrowUp_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    NcButton: _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    /**
     * Needs to be forwarded to the buttons (as interactive elements)
     */
    ariaDescribedby: {
      type: String,
      default: null
    },
    ariaDetails: {
      type: String,
      default: null
    },
    app: {
      type: Object,
      required: true
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'move:up': () => true,
    'move:down': () => true,
    /**
     * We need this as Sortable.js removes all native focus event listeners
     */
    'update:focus': () => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const buttonUp = (0,vue__WEBPACK_IMPORTED_MODULE_4__.ref)();
    const buttonDown = (0,vue__WEBPACK_IMPORTED_MODULE_4__.ref)();
    /**
     * Used to decide if we need to trigger focus() an a button on update
     */
    let needsFocus = 0;
    /**
     * Handle move up, ensure focus is kept on the button
     */
    const moveUp = () => {
      emit('move:up');
      needsFocus = 1; // request focus on buttonUp
    };
    /**
     * Handle move down, ensure focus is kept on the button
     */
    const moveDown = () => {
      emit('move:down');
      needsFocus = -1; // request focus on buttonDown
    };
    /**
     * Reset the focus on the last used button.
     * If the button is now visible anymore (because this element is the first/last) then the opposite button is focussed
     *
     * This function is exposed to the "AppOrderSelector" component which triggers this when the list was successfully rerendered
     */
    const keepFocus = () => {
      if (needsFocus !== 0) {
        // focus requested
        if ((needsFocus === 1 || props.isLast) && !props.isFirst) {
          // either requested to btn up and it is not the first, or it was requested to btn down but it is the last
          (0,vue__WEBPACK_IMPORTED_MODULE_4__.nextTick)(() => buttonUp.value.$el.focus());
        } else {
          (0,vue__WEBPACK_IMPORTED_MODULE_4__.nextTick)(() => buttonDown.value.$el.focus());
        }
      }
      needsFocus = 0;
    };
    return {
      buttonUp,
      buttonDown,
      moveUp,
      moveDown,
      keepFocus,
      t: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__.translate
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=script&lang=ts":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=script&lang=ts ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.mjs");
/* harmony import */ var _AppOrderSelector_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AppOrderSelector.vue */ "./apps/theming/src/components/AppOrderSelector.vue");
/* harmony import */ var vue_material_design_icons_Undo_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-material-design-icons/Undo.vue */ "./node_modules/vue-material-design-icons/Undo.vue");
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcButton.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcNoteCard_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcNoteCard.js */ "./node_modules/@nextcloud/vue/dist/Components/NcNoteCard.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcSettingsSection_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcSettingsSection.js */ "./node_modules/@nextcloud/vue/dist/Components/NcSettingsSection.mjs");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_10__.defineComponent)({
  name: 'UserAppMenuSection',
  components: {
    AppOrderSelector: _AppOrderSelector_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    IconUndo: vue_material_design_icons_Undo_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    NcButton: _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_7__["default"],
    NcNoteCard: _nextcloud_vue_dist_Components_NcNoteCard_js__WEBPACK_IMPORTED_MODULE_8__["default"],
    NcSettingsSection: _nextcloud_vue_dist_Components_NcSettingsSection_js__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  setup() {
    const {
      /** The app order currently defined by the user */
      userAppOrder,
      /** The enforced default app set by the administrator (if any) */
      enforcedDefaultApp
    } = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'navigationBar');
    /**
     * Array of all available apps, it is set by a core controller for the app menu, so it is always available
     */
    const initialAppOrder = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('core', 'apps').filter(_ref => {
      let {
        type
      } = _ref;
      return type === 'link';
    }).map(app => ({
      ...app,
      label: app.name,
      default: app.default && app.app === enforcedDefaultApp
    }));
    /**
     * Check if a custom app order is used or the default is shown
     */
    const hasCustomAppOrder = (0,vue__WEBPACK_IMPORTED_MODULE_10__.ref)(!Array.isArray(userAppOrder) || Object.values(userAppOrder).length > 0);
    /**
     * Track if the app order has changed, so the user can be informed to reload
     */
    const hasAppOrderChanged = (0,vue__WEBPACK_IMPORTED_MODULE_10__.computed)(() => initialAppOrder.some((_ref2, index) => {
      let {
        id
      } = _ref2;
      return id !== appOrder.value[index].id;
    }));
    /** ID of the "app order has changed" NcNodeCard, used for the aria-details of the apporder */
    const elementIdAppOrderChanged = 'theming-apporder-changed-infocard';
    /** ID of the "you can not change the default app" NcNodeCard, used for the aria-details of the apporder */
    const elementIdEnforcedDefaultApp = 'theming-apporder-changed-infocard';
    /**
     * The aria-details value of the app order selector
     * contains the space separated list of element ids of NcNoteCards
     */
    const ariaDetailsAppOrder = (0,vue__WEBPACK_IMPORTED_MODULE_10__.computed)(() => (hasAppOrderChanged.value ? `${elementIdAppOrderChanged} ` : '') + (enforcedDefaultApp ? elementIdEnforcedDefaultApp : ''));
    /**
     * The current apporder (sorted by user)
     */
    const appOrder = (0,vue__WEBPACK_IMPORTED_MODULE_10__.ref)([...initialAppOrder]);
    /**
     * Update the app order, called when the user sorts entries
     * @param value The new app order value
     */
    const updateAppOrder = value => {
      const order = {};
      value.forEach((_ref3, index) => {
        let {
          app,
          id
        } = _ref3;
        order[id] = {
          order: index,
          app
        };
      });
      saveSetting('apporder', order).then(() => {
        appOrder.value = value;
        hasCustomAppOrder.value = true;
      }).catch(error => {
        console.warn('Could not set the app order', error);
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__.showError)((0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__.translate)('theming', 'Could not set the app order'));
      });
    };
    /**
     * Reset the app order to the default
     */
    const resetAppOrder = async () => {
      try {
        await saveSetting('apporder', []);
        hasCustomAppOrder.value = false;
        // Reset our app order list
        const {
          data
        } = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_3__.generateOcsUrl)('/core/navigation/apps'), {
          headers: {
            'OCS-APIRequest': 'true'
          }
        });
        appOrder.value = data.ocs.data.map(app => ({
          ...app,
          label: app.name,
          default: app.default && app.app === enforcedDefaultApp
        }));
      } catch (error) {
        console.warn(error);
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__.showError)((0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__.translate)('theming', 'Could not reset the app order'));
      }
    };
    const saveSetting = async (key, value) => {
      const url = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_3__.generateOcsUrl)('apps/provisioning_api/api/v1/config/users/{appId}/{configKey}', {
        appId: 'core',
        configKey: key
      });
      return await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].post(url, {
        configValue: JSON.stringify(value)
      });
    };
    return {
      appOrder,
      updateAppOrder,
      resetAppOrder,
      enforcedDefaultApp,
      hasAppOrderChanged,
      hasCustomAppOrder,
      ariaDetailsAppOrder,
      elementIdAppOrderChanged,
      elementIdEnforcedDefaultApp,
      t: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__.translate
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=script&lang=ts":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=script&lang=ts ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var colord__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! colord */ "./node_modules/colord/index.mjs");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.mjs");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcButton.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcColorPicker_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcColorPicker.js */ "./node_modules/@nextcloud/vue/dist/Components/NcColorPicker.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcLoadingIcon_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcLoadingIcon.js */ "./node_modules/@nextcloud/vue/dist/Components/NcLoadingIcon.mjs");
/* harmony import */ var vue_material_design_icons_Palette_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-material-design-icons/Palette.vue */ "./node_modules/vue-material-design-icons/Palette.vue");
/* harmony import */ var vue_material_design_icons_UndoVariant_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-material-design-icons/UndoVariant.vue */ "./node_modules/vue-material-design-icons/UndoVariant.vue");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");













const {
  primaryColor,
  defaultPrimaryColor
} = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'data', {
  primaryColor: '#0082c9',
  defaultPrimaryColor: '#0082c9'
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_10__.defineComponent)({
  name: 'UserPrimaryColor',
  components: {
    IconColorPalette: vue_material_design_icons_Palette_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    IconUndo: vue_material_design_icons_UndoVariant_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    NcButton: _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_5__["default"],
    NcColorPicker: _nextcloud_vue_dist_Components_NcColorPicker_js__WEBPACK_IMPORTED_MODULE_6__["default"],
    NcLoadingIcon: _nextcloud_vue_dist_Components_NcLoadingIcon_js__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  emits: ['refresh-styles'],
  data() {
    return {
      primaryColor,
      loading: false
    };
  },
  computed: {
    isdefaultPrimaryColor() {
      return (0,colord__WEBPACK_IMPORTED_MODULE_11__.colord)(this.primaryColor).isEqual((0,colord__WEBPACK_IMPORTED_MODULE_11__.colord)(defaultPrimaryColor));
    },
    debouncedOnUpdate() {
      return debounce__WEBPACK_IMPORTED_MODULE_12___default()(this.onUpdate, 500);
    }
  },
  methods: {
    t: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__.translate,
    /**
     * Global styles are reloaded so we might need to update the current value
     */
    reload() {
      const trigger = this.$refs.trigger;
      const newColor = window.getComputedStyle(trigger).backgroundColor;
      if (newColor.toLowerCase() !== this.primaryColor) {
        this.primaryColor = newColor;
      }
    },
    onReset() {
      this.primaryColor = defaultPrimaryColor;
      this.onUpdate(null);
    },
    async onUpdate(value) {
      this.loading = true;
      const url = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_3__.generateOcsUrl)('apps/provisioning_api/api/v1/config/users/{appId}/{configKey}', {
        appId: 'theming',
        configKey: 'primary_color'
      });
      try {
        if (value) {
          await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].post(url, {
            configValue: value
          });
        } else {
          await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_4__["default"].delete(url);
        }
        this.$emit('refresh-styles');
      } catch (e) {
        console.error('Could not update primary color', e);
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_0__.showError)((0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_2__.translate)('theming', 'Could not set primary color'));
      }
      this.loading = false;
    }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");
/* harmony import */ var _helpers_refreshStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/refreshStyles */ "./apps/theming/src/helpers/refreshStyles.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js */ "./node_modules/@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcSettingsSection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcSettingsSection.js */ "./node_modules/@nextcloud/vue/dist/Components/NcSettingsSection.mjs");
/* harmony import */ var _components_BackgroundSettings_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/BackgroundSettings.vue */ "./apps/theming/src/components/BackgroundSettings.vue");
/* harmony import */ var _components_ItemPreview_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/ItemPreview.vue */ "./apps/theming/src/components/ItemPreview.vue");
/* harmony import */ var _components_UserAppMenuSection_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/UserAppMenuSection.vue */ "./apps/theming/src/components/UserAppMenuSection.vue");
/* harmony import */ var _components_UserPrimaryColor_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/UserPrimaryColor.vue */ "./apps/theming/src/components/UserPrimaryColor.vue");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");










const availableThemes = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'themes', []);
const enforceTheme = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'enforceTheme', '');
const shortcutsDisabled = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'shortcutsDisabled', false);
const enableBlurFilter = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'enableBlurFilter', '');
const isUserThemingDisabled = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('theming', 'isUserThemingDisabled');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'UserTheming',
  components: {
    ItemPreview: _components_ItemPreview_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    NcCheckboxRadioSwitch: _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch_js__WEBPACK_IMPORTED_MODULE_4__["default"],
    NcSettingsSection: _nextcloud_vue_dist_Components_NcSettingsSection_js__WEBPACK_IMPORTED_MODULE_5__["default"],
    BackgroundSettings: _components_BackgroundSettings_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    UserAppMenuSection: _components_UserAppMenuSection_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    UserPrimaryColor: _components_UserPrimaryColor_vue__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  data() {
    return {
      availableThemes,
      // Admin defined configs
      enforceTheme,
      shortcutsDisabled,
      isUserThemingDisabled,
      enableBlurFilter
    };
  },
  computed: {
    themes() {
      return this.availableThemes.filter(theme => theme.type === 1);
    },
    fonts() {
      return this.availableThemes.filter(theme => theme.type === 2);
    },
    // Selected theme, fallback on first (default) if none
    selectedTheme() {
      return this.themes.find(theme => theme.enabled === true) || this.themes[0];
    },
    description() {
      // using the `t` replace method escape html, we have to do it manually :/
      return t('theming', 'Universal access is very important to us. We follow web standards and check to make everything usable also without mouse, and assistive software such as screenreaders. We aim to be compliant with the {guidelines}Web Content Accessibility Guidelines{linkend} 2.1 on AA level, with the high contrast theme even on AAA level.').replace('{guidelines}', this.guidelinesLink).replace('{linkend}', '</a>');
    },
    guidelinesLink() {
      return '<a target="_blank" href="https://www.w3.org/WAI/standards-guidelines/wcag/" rel="noreferrer nofollow">';
    },
    descriptionDetail() {
      return t('theming', 'If you find any issues, do not hesitate to report them on {issuetracker}our issue tracker{linkend}. And if you want to get involved, come join {designteam}our design team{linkend}!').replace('{issuetracker}', this.issuetrackerLink).replace('{designteam}', this.designteamLink).replace(/\{linkend\}/g, '</a>');
    },
    issuetrackerLink() {
      return '<a target="_blank" href="https://github.com/nextcloud/server/issues/" rel="noreferrer nofollow">';
    },
    designteamLink() {
      return '<a target="_blank" href="https://nextcloud.com/design" rel="noreferrer nofollow">';
    }
  },
  watch: {
    shortcutsDisabled(newState) {
      this.changeShortcutsDisabled(newState);
    }
  },
  methods: {
    // Refresh server-side generated theming CSS
    async refreshGlobalStyles() {
      await (0,_helpers_refreshStyles__WEBPACK_IMPORTED_MODULE_2__.refreshStyles)();
      this.$nextTick(() => this.$refs.primaryColor.reload());
    },
    changeTheme(_ref) {
      let {
        enabled,
        id
      } = _ref;
      // Reset selected and select new one
      this.themes.forEach(theme => {
        if (theme.id === id && enabled) {
          theme.enabled = true;
          return;
        }
        theme.enabled = false;
      });
      this.updateBodyAttributes();
      this.selectItem(enabled, id);
    },
    changeFont(_ref2) {
      let {
        enabled,
        id
      } = _ref2;
      // Reset selected and select new one
      this.fonts.forEach(font => {
        if (font.id === id && enabled) {
          font.enabled = true;
          return;
        }
        font.enabled = false;
      });
      this.updateBodyAttributes();
      this.selectItem(enabled, id);
    },
    async changeShortcutsDisabled(newState) {
      if (newState) {
        await (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"])({
          url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/provisioning_api/api/v1/config/users/{appId}/{configKey}', {
            appId: 'theming',
            configKey: 'shortcuts_disabled'
          }),
          data: {
            configValue: 'yes'
          },
          method: 'POST'
        });
      } else {
        await (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"])({
          url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/provisioning_api/api/v1/config/users/{appId}/{configKey}', {
            appId: 'theming',
            configKey: 'shortcuts_disabled'
          }),
          method: 'DELETE'
        });
      }
    },
    async changeEnableBlurFilter() {
      this.enableBlurFilter = this.enableBlurFilter === 'no' ? 'yes' : 'no';
      await (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"])({
        url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/provisioning_api/api/v1/config/users/{appId}/{configKey}', {
          appId: 'theming',
          configKey: 'force_enable_blur_filter'
        }),
        data: {
          configValue: this.enableBlurFilter
        },
        method: 'POST'
      });
      // Refresh the styles
      this.$emit('update:background');
    },
    updateBodyAttributes() {
      const enabledThemesIDs = this.themes.filter(theme => theme.enabled === true).map(theme => theme.id);
      const enabledFontsIDs = this.fonts.filter(font => font.enabled === true).map(font => font.id);
      this.themes.forEach(theme => {
        document.body.toggleAttribute(`data-theme-${theme.id}`, theme.enabled);
      });
      this.fonts.forEach(font => {
        document.body.toggleAttribute(`data-theme-${font.id}`, font.enabled);
      });
      document.body.setAttribute('data-themes', [...enabledThemesIDs, ...enabledFontsIDs].join(','));
    },
    /**
     * Commit a change and force reload css
     * Fetching the file again will trigger the server update
     *
     * @param {boolean} enabled the theme state
     * @param {string} themeId the theme ID to change
     */
    async selectItem(enabled, themeId) {
      try {
        if (enabled) {
          await (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/theming/api/v1/theme/{themeId}/enable', {
              themeId
            }),
            method: 'PUT'
          });
        } else {
          await (0,_nextcloud_axios__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateOcsUrl)('apps/theming/api/v1/theme/{themeId}', {
              themeId
            }),
            method: 'DELETE'
          });
        }
      } catch (err) {
        console.error(err, err.response);
        OC.Notification.showTemporary(t('theming', err.response.data.ocs.meta.message + '. Unable to apply the setting.'));
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.mjs");
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");
/* harmony import */ var node_vibrant_lib_color_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node-vibrant/lib/color.js */ "./node_modules/node-vibrant/lib/color.js");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.mjs");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _nextcloud_vue_dist_Components_NcColorPicker_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcColorPicker.js */ "./node_modules/@nextcloud/vue/dist/Components/NcColorPicker.mjs");
/* harmony import */ var node_vibrant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! node-vibrant */ "./node_modules/node-vibrant/lib/browser.js");
/* harmony import */ var node_vibrant__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(node_vibrant__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var vue_material_design_icons_Check_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-material-design-icons/Check.vue */ "./node_modules/vue-material-design-icons/Check.vue");
/* harmony import */ var vue_material_design_icons_ImageEdit_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-material-design-icons/ImageEdit.vue */ "./node_modules/vue-material-design-icons/ImageEdit.vue");
/* harmony import */ var vue_material_design_icons_Palette_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue-material-design-icons/Palette.vue */ "./node_modules/vue-material-design-icons/Palette.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");












const shippedBackgroundList = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__.loadState)('theming', 'shippedBackgrounds');
const backgroundImage = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__.loadState)('theming', 'userBackgroundImage');
const {
  backgroundImage: defaultBackgroundImage,
  // backgroundColor: defaultBackgroundColor,
  backgroundMime: defaultBackgroundMime,
  defaultShippedBackground
} = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__.loadState)('theming', 'themingDefaults');
const prefixWithBaseUrl = url => (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateFilePath)('theming', '', 'img/background/') + url;
const __default__ = {
  name: 'BackgroundSettings',
  components: {
    Check: vue_material_design_icons_Check_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    ColorPalette: vue_material_design_icons_Palette_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    ImageEdit: vue_material_design_icons_ImageEdit_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    NcColorPicker: _nextcloud_vue_dist_Components_NcColorPicker_js__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
  data() {
    return {
      loading: false,
      Theming: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__.loadState)('theming', 'data', {}),
      // User background image and color settings
      backgroundImage
    };
  },
  computed: {
    shippedBackgrounds() {
      return Object.keys(shippedBackgroundList).filter(background => {
        // If the admin did not changed the global background
        // let's hide the default background to not show it twice
        return background !== defaultShippedBackground || !this.isGlobalBackgroundDefault;
      }).map(fileName => {
        return {
          name: fileName,
          url: prefixWithBaseUrl(fileName),
          preview: prefixWithBaseUrl('preview/' + fileName),
          details: shippedBackgroundList[fileName]
        };
      });
    },
    isGlobalBackgroundDefault() {
      return defaultBackgroundMime === '';
    },
    isGlobalBackgroundDeleted() {
      return defaultBackgroundMime === 'backgroundColor';
    },
    cssDefaultBackgroundImage() {
      return `url('${defaultBackgroundImage}')`;
    }
  },
  methods: {
    /**
     * Do we need to invert the text if color is too bright?
     *
     * @param {string} color the hex color
     */
    invertTextColor(color) {
      return this.calculateLuma(color) > 0.6;
    },
    /**
     * Calculate luminance of provided hex color
     *
     * @param {string} color the hex color
     */
    calculateLuma(color) {
      const [red, green, blue] = this.hexToRGB(color);
      return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
    },
    /**
     * Convert hex color to RGB
     *
     * @param {string} hex the hex color
     */
    hexToRGB(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    },
    /**
     * Update local state
     *
     * @param {object} data destructuring object
     * @param {string} data.backgroundColor background color value
     * @param {string} data.backgroundImage background image value
     * @param {string} data.version cache buster number
     * @see https://github.com/nextcloud/server/blob/c78bd45c64d9695724fc44fe8453a88824b85f2f/apps/theming/lib/Controller/UserThemeController.php#L187-L191
     */
    async update(data) {
      // Update state
      this.backgroundImage = data.backgroundImage;
      this.Theming.backgroundColor = data.backgroundColor;

      // Notify parent and reload style
      this.$emit('update:background');
      this.loading = false;
    },
    async setDefault() {
      this.loading = 'default';
      const result = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_5__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/default'));
      this.update(result.data);
    },
    async setShipped(shipped) {
      this.loading = shipped;
      const result = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_5__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/shipped'), {
        value: shipped
      });
      this.update(result.data);
    },
    async setFile(path) {
      let color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.loading = 'custom';
      const result = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_5__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/custom'), {
        value: path,
        color
      });
      this.update(result.data);
    },
    async removeBackground() {
      this.loading = 'remove';
      const result = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_5__["default"].delete((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/custom'));
      this.update(result.data);
    },
    async pickColor(color) {
      this.loading = 'color';
      const {
        data
      } = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_5__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/apps/theming/background/color'), {
        color: color || '#0082c9'
      });
      this.update(data);
    },
    debouncePickColor: debounce__WEBPACK_IMPORTED_MODULE_11___default()(function () {
      this.pickColor(...arguments);
    }, 200),
    pickFile() {
      const picker = (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_2__.getFilePickerBuilder)(t('theming', 'Select a background from your files')).allowDirectories(false).setMimeTypeFilter(['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml', 'image/svg']).setMultiSelect(false).addButton({
        id: 'select',
        label: t('theming', 'Select background'),
        callback: nodes => {
          this.applyFile(nodes[0]?.path);
        },
        type: 'primary'
      }).build();
      picker.pick();
    },
    async applyFile(path) {
      if (!path || typeof path !== 'string' || path.trim().length === 0 || path === '/') {
        console.error('No valid background have been selected', {
          path
        });
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_2__.showError)(t('theming', 'No background has been selected'));
        return;
      }
      this.loading = 'custom';

      // Extract primary color from image
      let response = null;
      let color = null;
      try {
        const fileUrl = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateRemoteUrl)('dav/files/' + (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)().uid + path);
        response = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_5__["default"].get(fileUrl, {
          responseType: 'blob'
        });
        const blobUrl = URL.createObjectURL(response.data);
        const palette = await this.getColorPaletteFromBlob(blobUrl);

        // DarkVibrant is accessible AND visually pleasing
        // Vibrant is not accessible enough and others are boring
        color = palette?.DarkVibrant?.hex;
        this.setFile(path, color);

        // Log data
        console.debug('Extracted colour', color, 'from custom image', path, palette);
      } catch (error) {
        this.setFile(path);
        console.error('Unable to extract colour from custom image', {
          error,
          path,
          response,
          color
        });
      }
    },
    /**
     * Extract a Vibrant color palette from a blob URL
     *
     * @param {string} blobUrl the blob URL
     * @return {Promise<Palette>}
     */
    getColorPaletteFromBlob(blobUrl) {
      return new Promise((resolve, reject) => {
        const vibrant = new (node_vibrant__WEBPACK_IMPORTED_MODULE_7___default())(blobUrl);
        vibrant.getPalette((error, palette) => {
          if (error) {
            reject(error);
          }
          resolve(palette);
        });
      });
    }
  }
};

const __injectCSSVars__ = () => {
  (0,vue__WEBPACK_IMPORTED_MODULE_12__.useCssVars)((_vm, _setup) => ({
    "2cb9c9e7-cssDefaultBackgroundImage": _vm.cssDefaultBackgroundImage
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js */ "./node_modules/@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.mjs");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ItemPreview',
  components: {
    NcCheckboxRadioSwitch: _nextcloud_vue_dist_Components_NcCheckboxRadioSwitch_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    enforced: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    theme: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: ''
    },
    unique: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    switchType() {
      return this.unique ? 'switch' : 'radio';
    },
    name() {
      return !this.unique ? this.type : null;
    },
    img() {
      return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateFilePath)('theming', 'img', this.theme.id + '.jpg');
    },
    checked: {
      get() {
        return this.selected;
      },
      set(checked) {
        if (this.enforced) {
          return;
        }
        console.debug('Changed theme', this.theme.id, checked);

        // If this is a radio, we can only enable
        if (!this.unique) {
          this.$emit('change', {
            enabled: true,
            id: this.theme.id
          });
          return;
        }

        // If this is a switch, we can disable the theme
        this.$emit('change', {
          enabled: checked === true,
          id: this.theme.id
        });
      }
    }
  },
  methods: {
    onToggle() {
      if (this.enforced) {
        return;
      }
      if (this.switchType === 'radio') {
        this.checked = true;
        return;
      }

      // Invert state
      this.checked = !this.checked;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=template&id=27ad2758&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=template&id=27ad2758&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", [_c("NcSettingsSection", {
    staticClass: "theming",
    attrs: {
      name: _vm.t("theming", "Appearance and accessibility settings")
    }
  }, [_c("p", {
    domProps: {
      innerHTML: _vm._s(_vm.description)
    }
  }), _vm._v(" "), _c("p", {
    domProps: {
      innerHTML: _vm._s(_vm.descriptionDetail)
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "theming__preview-list"
  }, _vm._l(_vm.themes, function (theme) {
    return _c("ItemPreview", {
      key: theme.id,
      attrs: {
        enforced: theme.id === _vm.enforceTheme,
        selected: _vm.selectedTheme.id === theme.id,
        theme: theme,
        unique: _vm.themes.length === 1,
        type: "theme"
      },
      on: {
        change: _vm.changeTheme
      }
    });
  }), 1), _vm._v(" "), _c("div", {
    staticClass: "theming__preview-list"
  }, _vm._l(_vm.fonts, function (theme) {
    return _c("ItemPreview", {
      key: theme.id,
      attrs: {
        selected: theme.enabled,
        theme: theme,
        unique: _vm.fonts.length === 1,
        type: "font"
      },
      on: {
        change: _vm.changeFont
      }
    });
  }), 1), _vm._v(" "), _c("h3", [_vm._v(_vm._s(_vm.t("theming", "Misc accessibility options")))]), _vm._v(" "), _c("NcCheckboxRadioSwitch", {
    attrs: {
      type: "checkbox",
      checked: _vm.enableBlurFilter === "yes",
      indeterminate: _vm.enableBlurFilter === ""
    },
    on: {
      "update:checked": _vm.changeEnableBlurFilter
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("theming", "Enable blur background filter (may increase GPU load)")) + "\n\t\t")])], 1), _vm._v(" "), _c("NcSettingsSection", {
    attrs: {
      name: _vm.t("theming", "Primary color"),
      description: _vm.isUserThemingDisabled ? _vm.t("theming", "Customization has been disabled by your administrator") : _vm.t("theming", "Set a primary color to highlight important elements. The color used for elements such as primary buttons might differ a bit as it gets adjusted to fulfill accessibility requirements.")
    }
  }, [!_vm.isUserThemingDisabled ? _c("UserPrimaryColor", {
    ref: "primaryColor",
    on: {
      "refresh-styles": _vm.refreshGlobalStyles
    }
  }) : _vm._e()], 1), _vm._v(" "), _c("NcSettingsSection", {
    staticClass: "background",
    attrs: {
      name: _vm.t("theming", "Background and color"),
      description: _vm.isUserThemingDisabled ? _vm.t("theming", "Customization has been disabled by your administrator") : _vm.t("theming", "The background can be set to an image from the default set, a custom uploaded image, or a plain color.")
    }
  }, [!_vm.isUserThemingDisabled ? _c("BackgroundSettings", {
    staticClass: "background__grid",
    on: {
      "update:background": _vm.refreshGlobalStyles
    }
  }) : _vm._e()], 1), _vm._v(" "), _c("NcSettingsSection", {
    attrs: {
      name: _vm.t("theming", "Keyboard shortcuts"),
      description: _vm.t("theming", "In some cases keyboard shortcuts can interfere with accessibility tools. In order to allow focusing on your tool correctly you can disable all keyboard shortcuts here. This will also disable all available shortcuts in apps.")
    }
  }, [_c("NcCheckboxRadioSwitch", {
    staticClass: "theming__preview-toggle",
    attrs: {
      checked: _vm.shortcutsDisabled,
      type: "switch"
    },
    on: {
      "update:checked": function ($event) {
        _vm.shortcutsDisabled = $event;
      },
      change: _vm.changeShortcutsDisabled
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("theming", "Disable all keyboard shortcuts")) + "\n\t\t")])], 1), _vm._v(" "), _c("UserAppMenuSection")], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("Fragment", [_c("div", {
    staticClass: "hidden-visually",
    attrs: {
      id: _vm.statusInfoId,
      "aria-live": "polite",
      role: "status"
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.statusInfo) + "\n\t")]), _vm._v(" "), _c("ol", {
    ref: "listElement",
    staticClass: "order-selector",
    attrs: {
      "data-cy-app-order": ""
    }
  }, _vm._l(_vm.appList, function (app, index) {
    return _c("AppOrderSelectorElement", _vm._g({
      key: `${app.id}${_vm.renderCount}`,
      ref: "selectorElements",
      refInFor: true,
      attrs: {
        app: app,
        "aria-details": _vm.ariaDetails,
        "aria-describedby": _vm.statusInfoId,
        "is-first": index === 0 || !!_vm.appList[index - 1].default,
        "is-last": index === _vm.value.length - 1
      }
    }, app.default ? {} : {
      "move:up": () => _vm.moveUp(index),
      "move:down": () => _vm.moveDown(index),
      "update:focus": () => _vm.updateStatusInfo(index)
    }));
  }), 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("li", {
    class: {
      "order-selector-element": true,
      "order-selector-element--disabled": _vm.app.default
    },
    attrs: {
      "data-cy-app-order-element": _vm.app.id
    },
    on: {
      focusin: function ($event) {
        return _vm.$emit("update:focus");
      }
    }
  }, [_c("svg", {
    attrs: {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      role: "presentation"
    }
  }, [_c("image", {
    staticClass: "order-selector-element__icon",
    attrs: {
      preserveAspectRatio: "xMinYMin meet",
      x: "0",
      y: "0",
      width: "20",
      height: "20",
      "xlink:href": _vm.app.icon
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "order-selector-element__label"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.app.label ?? _vm.app.id) + "\n\t")]), _vm._v(" "), _c("div", {
    staticClass: "order-selector-element__actions"
  }, [_c("NcButton", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.isFirst && !_vm.app.default,
      expression: "!isFirst && !app.default"
    }],
    ref: "buttonUp",
    attrs: {
      "aria-label": _vm.t("settings", "Move up"),
      "aria-describedby": _vm.ariaDescribedby,
      "aria-details": _vm.ariaDetails,
      "data-cy-app-order-button": "up",
      type: "tertiary-no-background"
    },
    on: {
      click: _vm.moveUp
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("IconArrowUp", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }])
  }), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isFirst || !!_vm.app.default,
      expression: "isFirst || !!app.default"
    }],
    staticClass: "order-selector-element__placeholder",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" "), _c("NcButton", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.isLast && !_vm.app.default,
      expression: "!isLast && !app.default"
    }],
    ref: "buttonDown",
    attrs: {
      "aria-label": _vm.t("settings", "Move down"),
      "aria-describedby": _vm.ariaDescribedby,
      "aria-details": _vm.ariaDetails,
      "data-cy-app-order-button": "down",
      type: "tertiary-no-background"
    },
    on: {
      click: _vm.moveDown
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("IconArrowDown", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }])
  }), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isLast || !!_vm.app.default,
      expression: "isLast || !!app.default"
    }],
    staticClass: "order-selector-element__placeholder",
    attrs: {
      "aria-hidden": "true"
    }
  })], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "background-selector",
    attrs: {
      "data-user-theming-background-settings": ""
    }
  }, [_c("button", {
    class: {
      "icon-loading": _vm.loading === "custom",
      "background background__filepicker": true,
      "background--active": _vm.backgroundImage === "custom"
    },
    attrs: {
      "aria-pressed": _vm.backgroundImage === "custom",
      "data-user-theming-background-custom": "",
      tabindex: "0"
    },
    on: {
      click: _vm.pickFile
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "Custom background")) + "\n\t\t"), _vm.backgroundImage !== "custom" ? _c("ImageEdit", {
    attrs: {
      size: 20
    }
  }) : _vm._e(), _vm._v(" "), _c("Check", {
    attrs: {
      size: 44
    }
  })], 1), _vm._v(" "), _c("NcColorPicker", {
    on: {
      "update:value": _vm.debouncePickColor
    },
    model: {
      value: _vm.Theming.backgroundColor,
      callback: function ($$v) {
        _vm.$set(_vm.Theming, "backgroundColor", $$v);
      },
      expression: "Theming.backgroundColor"
    }
  }, [_c("button", {
    class: {
      "icon-loading": _vm.loading === "color",
      "background background__color": true,
      "background--active": _vm.backgroundImage === "color"
    },
    style: {
      backgroundColor: _vm.Theming.backgroundColor,
      "--border-color": _vm.Theming.backgroundColor
    },
    attrs: {
      "aria-pressed": _vm.backgroundImage === "color",
      "data-color": _vm.Theming.backgroundColor,
      "data-color-bright": _vm.invertTextColor(_vm.Theming.backgroundColor),
      "data-user-theming-background-color": "",
      tabindex: "0"
    },
    on: {
      click: function ($event) {
        _vm.backgroundImage !== "color" && _vm.debouncePickColor(_vm.Theming.backgroundColor);
      }
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("theming", "Plain background") /* TRANSLATORS: Background using a single color */) + "\n\t\t\t"), _vm.backgroundImage !== "color" ? _c("ColorPalette", {
    attrs: {
      size: 20
    }
  }) : _vm._e(), _vm._v(" "), _c("Check", {
    attrs: {
      size: 44
    }
  })], 1)]), _vm._v(" "), _c("button", {
    class: {
      "icon-loading": _vm.loading === "default",
      "background background__default": true,
      "background--active": _vm.backgroundImage === "default"
    },
    style: {
      "--border-color": _vm.Theming.defaultBackgroundColor
    },
    attrs: {
      "aria-pressed": _vm.backgroundImage === "default",
      "data-color-bright": _vm.invertTextColor(_vm.Theming.defaultBackgroundColor),
      "data-user-theming-background-default": "",
      tabindex: "0"
    },
    on: {
      click: _vm.setDefault
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "Default background")) + "\n\t\t"), _c("Check", {
    attrs: {
      size: 44
    }
  })], 1), _vm._v(" "), _vm._l(_vm.shippedBackgrounds, function (shippedBackground) {
    return _c("button", {
      key: shippedBackground.name,
      class: {
        "background background__shipped": true,
        "icon-loading": _vm.loading === shippedBackground.name,
        "background--active": _vm.backgroundImage === shippedBackground.name
      },
      style: {
        backgroundImage: "url(" + shippedBackground.preview + ")",
        "--border-color": shippedBackground.details.primary_color
      },
      attrs: {
        title: shippedBackground.details.attribution,
        "aria-label": shippedBackground.details.description,
        "aria-pressed": _vm.backgroundImage === shippedBackground.name,
        "data-color-bright": _vm.invertTextColor(shippedBackground.details.background_color),
        "data-user-theming-background-shipped": shippedBackground.name,
        tabindex: "0"
      },
      on: {
        click: function ($event) {
          return _vm.setShipped(shippedBackground.name);
        }
      }
    }, [_c("Check", {
      attrs: {
        size: 44
      }
    })], 1);
  })], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "theming__preview",
    class: "theming__preview--" + _vm.theme.id
  }, [_c("div", {
    staticClass: "theming__preview-image",
    style: {
      backgroundImage: "url(" + _vm.img + ")"
    },
    on: {
      click: _vm.onToggle
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "theming__preview-description"
  }, [_c("h3", [_vm._v(_vm._s(_vm.theme.title))]), _vm._v(" "), _c("p", {
    staticClass: "theming__preview-explanation"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.theme.description) + "\n\t\t")]), _vm._v(" "), _vm.enforced ? _c("span", {
    staticClass: "theming__preview-warning",
    attrs: {
      role: "note"
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("theming", "Theme selection is enforced")) + "\n\t\t")]) : _vm._e(), _vm._v(" "), _c("NcCheckboxRadioSwitch", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.enforced,
      expression: "!enforced"
    }],
    staticClass: "theming__preview-toggle",
    attrs: {
      checked: _vm.checked,
      disabled: _vm.enforced,
      name: _vm.name,
      type: _vm.switchType
    },
    on: {
      "update:checked": function ($event) {
        _vm.checked = $event;
      }
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.theme.enableLabel) + "\n\t\t")])], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("NcSettingsSection", {
    attrs: {
      name: _vm.t("theming", "Navigation bar settings")
    }
  }, [_c("p", [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "You can configure the app order used for the navigation bar. The first entry will be the default app, opened after login or when clicking on the logo.")) + "\n\t")]), _vm._v(" "), _vm.enforcedDefaultApp ? _c("NcNoteCard", {
    attrs: {
      id: _vm.elementIdEnforcedDefaultApp,
      type: "info"
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "The default app can not be changed because it was configured by the administrator.")) + "\n\t")]) : _vm._e(), _vm._v(" "), _vm.hasAppOrderChanged ? _c("NcNoteCard", {
    attrs: {
      id: _vm.elementIdAppOrderChanged,
      type: "info"
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "The app order was changed, to see it in action you have to reload the page.")) + "\n\t")]) : _vm._e(), _vm._v(" "), _c("AppOrderSelector", {
    staticClass: "user-app-menu-order",
    attrs: {
      "aria-details": _vm.ariaDetailsAppOrder,
      value: _vm.appOrder
    },
    on: {
      "update:value": _vm.updateAppOrder
    }
  }), _vm._v(" "), _c("NcButton", {
    attrs: {
      "data-test-id": "btn-apporder-reset",
      disabled: !_vm.hasCustomAppOrder,
      type: "tertiary"
    },
    on: {
      click: _vm.resetAppOrder
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("IconUndo", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }])
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "Reset default app order")) + "\n\t")])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    staticClass: "primary-color__wrapper"
  }, [_c("NcColorPicker", {
    attrs: {
      "data-user-theming-primary-color": ""
    },
    on: {
      "update:value": _vm.debouncedOnUpdate
    },
    model: {
      value: _vm.primaryColor,
      callback: function ($$v) {
        _vm.primaryColor = $$v;
      },
      expression: "primaryColor"
    }
  }, [_c("button", {
    ref: "trigger",
    staticClass: "color-container primary-color__trigger",
    style: {
      "background-color": _vm.primaryColor
    },
    attrs: {
      "data-user-theming-primary-color-trigger": ""
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("theming", "Primary color")) + "\n\t\t\t"), _vm.loading ? _c("NcLoadingIcon") : _c("IconColorPalette", {
    attrs: {
      size: 20
    }
  })], 1)]), _vm._v(" "), _c("NcButton", {
    attrs: {
      type: "tertiary",
      disabled: _vm.isdefaultPrimaryColor
    },
    on: {
      click: _vm.onReset
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("IconUndo", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }])
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("theming", "Reset primary color")) + "\n\t")])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.theming p[data-v-27ad2758] {
  max-width: 800px;
}
.theming[data-v-27ad2758] a {
  font-weight: bold;
}
.theming[data-v-27ad2758] a:hover, .theming[data-v-27ad2758] a:focus {
  text-decoration: underline;
}
.theming__preview-list[data-v-27ad2758] {
  --gap: 30px;
  display: grid;
  margin-top: var(--gap);
  column-gap: var(--gap);
  row-gap: var(--gap);
}
.background__grid[data-v-27ad2758] {
  margin-top: 30px;
}
@media (max-width: 1440px) {
.theming__preview-list[data-v-27ad2758] {
    display: flex;
    flex-direction: column;
}
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.order-selector[data-v-bc6b1dbc] {
  width: max-content;
  min-width: 260px;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.order-selector-element[data-v-49204daa] {
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding-inline: 12px;
}
.order-selector-element[data-v-49204daa]:hover {
  background-color: var(--color-background-hover);
  border-radius: var(--border-radius-large);
}
.order-selector-element--disabled[data-v-49204daa] {
  border-color: var(--color-text-maxcontrast);
  color: var(--color-text-maxcontrast);
}
.order-selector-element--disabled .order-selector-element__icon[data-v-49204daa] {
  opacity: 75%;
}
.order-selector-element__actions[data-v-49204daa] {
  flex: 0 0;
  display: flex;
  flex-direction: row;
  gap: 6px;
}
.order-selector-element__label[data-v-49204daa] {
  flex: 1 1;
  text-overflow: ellipsis;
  overflow: hidden;
}
.order-selector-element__placeholder[data-v-49204daa] {
  height: 44px;
  width: 44px;
}
.order-selector-element__icon[data-v-49204daa] {
  filter: var(--background-invert-if-bright);
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.background-selector[data-v-2cb9c9e7] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.background-selector .background-color[data-v-2cb9c9e7] {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 176px;
  height: 96px;
  margin: 8px;
  border-radius: var(--border-radius-large);
  background-color: var(--color-primary);
}
.background-selector .background[data-v-2cb9c9e7] {
  overflow: hidden;
  width: 176px;
  height: 96px;
  margin: 8px;
  text-align: center;
  word-wrap: break-word;
  hyphens: auto;
  border: 2px solid var(--color-main-background);
  border-radius: var(--border-radius-large);
  background-position: center center;
  background-size: cover;
}
.background-selector .background__filepicker[data-v-2cb9c9e7] {
  background-color: var(--color-main-text);
  background-color: var(--color-background-dark);
}
.background-selector .background__filepicker.background--active[data-v-2cb9c9e7] {
  color: var(--color-background-plain-text);
  background-image: var(--image-background);
}
.background-selector .background__default[data-v-2cb9c9e7] {
  background-color: var(--color-background-plain);
  background-image: linear-gradient(to bottom, rgba(23, 23, 23, 0.5), rgba(23, 23, 23, 0.5)), var(--2cb9c9e7-cssDefaultBackgroundImage);
}
.background-selector .background__filepicker[data-v-2cb9c9e7], .background-selector .background__default[data-v-2cb9c9e7], .background-selector .background__color[data-v-2cb9c9e7] {
  border-color: var(--color-border);
}
.background-selector .background__default[data-v-2cb9c9e7], .background-selector .background__shipped[data-v-2cb9c9e7] {
  color: white;
}
.background-selector .background[data-color-bright][data-v-2cb9c9e7] {
  color: black;
}
.background-selector .background--active[data-v-2cb9c9e7], .background-selector .background[data-v-2cb9c9e7]:hover, .background-selector .background[data-v-2cb9c9e7]:focus {
  outline: 2px solid var(--color-main-text) !important;
  border-color: var(--color-main-background) !important;
}
.background-selector .background span[data-v-2cb9c9e7] {
  margin: 4px;
}
.background-selector .background .check-icon[data-v-2cb9c9e7] {
  display: none;
}
.background-selector .background--active:not(.icon-loading) .check-icon[data-v-2cb9c9e7] {
  display: block !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.theming__preview[data-v-5d6fc2af] {
  --ratio: 16;
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.theming__preview[data-v-5d6fc2af],
.theming__preview *[data-v-5d6fc2af] {
  user-select: none;
}
.theming__preview-image[data-v-5d6fc2af] {
  flex-basis: calc(16px * var(--ratio));
  flex-shrink: 0;
  height: calc(10px * var(--ratio));
  margin-right: var(--gap);
  cursor: pointer;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-position: top left;
  background-size: cover;
}
.theming__preview-explanation[data-v-5d6fc2af] {
  margin-bottom: 10px;
}
.theming__preview-description[data-v-5d6fc2af] {
  display: flex;
  flex-direction: column;
}
.theming__preview-description h3[data-v-5d6fc2af] {
  font-weight: bold;
  margin-bottom: 0;
}
.theming__preview-description label[data-v-5d6fc2af] {
  padding: 12px 0;
}
.theming__preview-warning[data-v-5d6fc2af] {
  color: var(--color-warning);
}
@media (max-width: 682.6666666667px) {
.theming__preview[data-v-5d6fc2af] {
    flex-direction: column;
}
.theming__preview-image[data-v-5d6fc2af] {
    margin: 0;
}
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.user-app-menu-order[data-v-79a64974] {
  margin-block: 12px;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.primary-color__wrapper[data-v-753fb662] {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}
.primary-color__trigger[data-v-753fb662] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  width: 350px;
  max-width: 100vw;
  height: 96px;
  word-wrap: break-word;
  hyphens: auto;
  border: 2px solid var(--color-main-background);
  border-radius: var(--border-radius-large);
}
.primary-color__trigger[data-v-753fb662]:active {
  background-color: var(--color-primary-hover) !important;
}
.primary-color__trigger[data-v-753fb662]:hover, .primary-color__trigger[data-v-753fb662]:focus, .primary-color__trigger[data-v-753fb662]:focus-visible {
  border-color: var(--color-main-background) !important;
  outline: 2px solid var(--color-main-text) !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/lodash/_baseEach.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ "./node_modules/lodash/_baseForOwn.js"),
    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ "./node_modules/lodash/_createBaseEach.js");

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),

/***/ "./node_modules/lodash/_baseFilter.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseFilter.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js");

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;


/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),

/***/ "./node_modules/lodash/_createBaseEach.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),

/***/ "./node_modules/lodash/defaults.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/defaults.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(object, sources) {
  object = Object(object);

  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : undefined;

  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }

  while (++index < length) {
    var source = sources[index];
    var props = keysIn(source);
    var propsIndex = -1;
    var propsLength = props.length;

    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];

      if (value === undefined ||
          (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        object[key] = source[key];
      }
    }
  }

  return object;
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/lodash/filter.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/filter.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    baseFilter = __webpack_require__(/*! ./_baseFilter */ "./node_modules/lodash/_baseFilter.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 *
 * // Combining several predicates using `_.overEvery` or `_.overSome`.
 * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
 * // => objects for ['fred', 'barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;


/***/ }),

/***/ "./node_modules/node-vibrant/lib/browser.js":
/*!**************************************************!*\
  !*** ./node_modules/node-vibrant/lib/browser.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var vibrant_1 = __importDefault(__webpack_require__(/*! ./vibrant */ "./node_modules/node-vibrant/lib/vibrant.js"));
var browser_1 = __importDefault(__webpack_require__(/*! ./image/browser */ "./node_modules/node-vibrant/lib/image/browser.js"));
vibrant_1.default.DefaultOpts.ImageClass = browser_1.default;
module.exports = vibrant_1.default;
//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/builder.js":
/*!**************************************************!*\
  !*** ./node_modules/node-vibrant/lib/builder.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var vibrant_1 = __importDefault(__webpack_require__(/*! ./vibrant */ "./node_modules/node-vibrant/lib/vibrant.js"));
var clone = __webpack_require__(/*! lodash/clone */ "./node_modules/lodash/clone.js");
var Builder = /** @class */ (function () {
    function Builder(src, opts) {
        if (opts === void 0) { opts = {}; }
        this._src = src;
        this._opts = opts;
        this._opts.filters = clone(vibrant_1.default.DefaultOpts.filters);
    }
    Builder.prototype.maxColorCount = function (n) {
        this._opts.colorCount = n;
        return this;
    };
    Builder.prototype.maxDimension = function (d) {
        this._opts.maxDimension = d;
        return this;
    };
    Builder.prototype.addFilter = function (f) {
        this._opts.filters.push(f);
        return this;
    };
    Builder.prototype.removeFilter = function (f) {
        var i = this._opts.filters.indexOf(f);
        if (i > 0)
            this._opts.filters.splice(i);
        return this;
    };
    Builder.prototype.clearFilters = function () {
        this._opts.filters = [];
        return this;
    };
    Builder.prototype.quality = function (q) {
        this._opts.quality = q;
        return this;
    };
    Builder.prototype.useImageClass = function (imageClass) {
        this._opts.ImageClass = imageClass;
        return this;
    };
    Builder.prototype.useGenerator = function (generator) {
        this._opts.generator = generator;
        return this;
    };
    Builder.prototype.useQuantizer = function (quantizer) {
        this._opts.quantizer = quantizer;
        return this;
    };
    Builder.prototype.build = function () {
        return new vibrant_1.default(this._src, this._opts);
    };
    Builder.prototype.getPalette = function (cb) {
        return this.build().getPalette(cb);
    };
    Builder.prototype.getSwatches = function (cb) {
        return this.build().getPalette(cb);
    };
    return Builder;
}());
exports["default"] = Builder;
//# sourceMappingURL=builder.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/color.js":
/*!************************************************!*\
  !*** ./node_modules/node-vibrant/lib/color.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Swatch = void 0;
var util_1 = __webpack_require__(/*! ./util */ "./node_modules/node-vibrant/lib/util.js");
var filter = __webpack_require__(/*! lodash/filter */ "./node_modules/lodash/filter.js");
var Swatch = /** @class */ (function () {
    function Swatch(rgb, population) {
        this._rgb = rgb;
        this._population = population;
    }
    Swatch.applyFilter = function (colors, f) {
        return typeof f === 'function'
            ? filter(colors, function (_a) {
                var r = _a.r, g = _a.g, b = _a.b;
                return f(r, g, b, 255);
            })
            : colors;
    };
    Object.defineProperty(Swatch.prototype, "r", {
        get: function () { return this._rgb[0]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "g", {
        get: function () { return this._rgb[1]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "b", {
        get: function () { return this._rgb[2]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "rgb", {
        get: function () { return this._rgb; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "hsl", {
        get: function () {
            if (!this._hsl) {
                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
                this._hsl = util_1.rgbToHsl(r, g, b);
            }
            return this._hsl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "hex", {
        get: function () {
            if (!this._hex) {
                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
                this._hex = util_1.rgbToHex(r, g, b);
            }
            return this._hex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "population", {
        get: function () { return this._population; },
        enumerable: false,
        configurable: true
    });
    Swatch.prototype.toJSON = function () {
        return {
            rgb: this.rgb,
            population: this.population
        };
    };
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getRgb = function () { return this._rgb; };
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getHsl = function () { return this.hsl; };
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getPopulation = function () { return this._population; };
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getHex = function () { return this.hex; };
    Swatch.prototype.getYiq = function () {
        if (!this._yiq) {
            var rgb = this._rgb;
            this._yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        }
        return this._yiq;
    };
    Object.defineProperty(Swatch.prototype, "titleTextColor", {
        get: function () {
            if (!this._titleTextColor) {
                this._titleTextColor = this.getYiq() < 200 ? '#fff' : '#000';
            }
            return this._titleTextColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "bodyTextColor", {
        get: function () {
            if (!this._bodyTextColor) {
                this._bodyTextColor = this.getYiq() < 150 ? '#fff' : '#000';
            }
            return this._bodyTextColor;
        },
        enumerable: false,
        configurable: true
    });
    Swatch.prototype.getTitleTextColor = function () {
        return this.titleTextColor;
    };
    Swatch.prototype.getBodyTextColor = function () {
        return this.bodyTextColor;
    };
    return Swatch;
}());
exports.Swatch = Swatch;
//# sourceMappingURL=color.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/filter/default.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/filter/default.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function defaultFilter(r, g, b, a) {
    return a >= 125 &&
        !(r > 250 && g > 250 && b > 250);
}
exports["default"] = defaultFilter;
//# sourceMappingURL=default.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/filter/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/node-vibrant/lib/filter/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineFilters = void 0;
var default_1 = __webpack_require__(/*! ./default */ "./node_modules/node-vibrant/lib/filter/default.js");
Object.defineProperty(exports, "Default", ({ enumerable: true, get: function () { return default_1.default; } }));
function combineFilters(filters) {
    // TODO: caching
    if (!Array.isArray(filters) || filters.length === 0)
        return null;
    return function (r, g, b, a) {
        if (a === 0)
            return false;
        for (var i = 0; i < filters.length; i++) {
            if (!filters[i](r, g, b, a))
                return false;
        }
        return true;
    };
}
exports.combineFilters = combineFilters;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/generator/default.js":
/*!************************************************************!*\
  !*** ./node_modules/node-vibrant/lib/generator/default.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var color_1 = __webpack_require__(/*! ../color */ "./node_modules/node-vibrant/lib/color.js");
var util_1 = __webpack_require__(/*! ../util */ "./node_modules/node-vibrant/lib/util.js");
var defaults = __webpack_require__(/*! lodash/defaults */ "./node_modules/lodash/defaults.js");
var DefaultOpts = {
    targetDarkLuma: 0.26,
    maxDarkLuma: 0.45,
    minLightLuma: 0.55,
    targetLightLuma: 0.74,
    minNormalLuma: 0.3,
    targetNormalLuma: 0.5,
    maxNormalLuma: 0.7,
    targetMutesSaturation: 0.3,
    maxMutesSaturation: 0.4,
    targetVibrantSaturation: 1.0,
    minVibrantSaturation: 0.35,
    weightSaturation: 3,
    weightLuma: 6.5,
    weightPopulation: 0.5
};
function _findMaxPopulation(swatches) {
    var p = 0;
    swatches.forEach(function (s) {
        p = Math.max(p, s.getPopulation());
    });
    return p;
}
function _isAlreadySelected(palette, s) {
    return palette.Vibrant === s ||
        palette.DarkVibrant === s ||
        palette.LightVibrant === s ||
        palette.Muted === s ||
        palette.DarkMuted === s ||
        palette.LightMuted === s;
}
function _createComparisonValue(saturation, targetSaturation, luma, targetLuma, population, maxPopulation, opts) {
    function weightedMean() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var sum = 0;
        var weightSum = 0;
        for (var i = 0; i < values.length; i += 2) {
            var value = values[i];
            var weight = values[i + 1];
            sum += value * weight;
            weightSum += weight;
        }
        return sum / weightSum;
    }
    function invertDiff(value, targetValue) {
        return 1 - Math.abs(value - targetValue);
    }
    return weightedMean(invertDiff(saturation, targetSaturation), opts.weightSaturation, invertDiff(luma, targetLuma), opts.weightLuma, population / maxPopulation, opts.weightPopulation);
}
function _findColorVariation(palette, swatches, maxPopulation, targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation, opts) {
    var max = null;
    var maxValue = 0;
    swatches.forEach(function (swatch) {
        var _a = swatch.getHsl(), s = _a[1], l = _a[2];
        if (s >= minSaturation && s <= maxSaturation &&
            l >= minLuma && l <= maxLuma &&
            !_isAlreadySelected(palette, swatch)) {
            var value = _createComparisonValue(s, targetSaturation, l, targetLuma, swatch.getPopulation(), maxPopulation, opts);
            if (max === null || value > maxValue) {
                max = swatch;
                maxValue = value;
            }
        }
    });
    return max;
}
function _generateVariationColors(swatches, maxPopulation, opts) {
    var palette = {};
    // mVibrantSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);
    palette.Vibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mLightVibrantSwatch = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);
    palette.LightVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mDarkVibrantSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);
    palette.DarkVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mMutedSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);
    palette.Muted = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    // mLightMutedColor = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);
    palette.LightMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    // mDarkMutedSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);
    palette.DarkMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    return palette;
}
function _generateEmptySwatches(palette, maxPopulation, opts) {
    if (palette.Vibrant === null && palette.DarkVibrant === null && palette.LightVibrant === null) {
        if (palette.DarkVibrant === null && palette.DarkMuted !== null) {
            var _a = palette.DarkMuted.getHsl(), h = _a[0], s = _a[1], l = _a[2];
            l = opts.targetDarkLuma;
            palette.DarkVibrant = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
        }
        if (palette.LightVibrant === null && palette.LightMuted !== null) {
            var _b = palette.LightMuted.getHsl(), h = _b[0], s = _b[1], l = _b[2];
            l = opts.targetDarkLuma;
            palette.DarkVibrant = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
        }
    }
    if (palette.Vibrant === null && palette.DarkVibrant !== null) {
        var _c = palette.DarkVibrant.getHsl(), h = _c[0], s = _c[1], l = _c[2];
        l = opts.targetNormalLuma;
        palette.Vibrant = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
    }
    else if (palette.Vibrant === null && palette.LightVibrant !== null) {
        var _d = palette.LightVibrant.getHsl(), h = _d[0], s = _d[1], l = _d[2];
        l = opts.targetNormalLuma;
        palette.Vibrant = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
    }
    if (palette.DarkVibrant === null && palette.Vibrant !== null) {
        var _e = palette.Vibrant.getHsl(), h = _e[0], s = _e[1], l = _e[2];
        l = opts.targetDarkLuma;
        palette.DarkVibrant = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
    }
    if (palette.LightVibrant === null && palette.Vibrant !== null) {
        var _f = palette.Vibrant.getHsl(), h = _f[0], s = _f[1], l = _f[2];
        l = opts.targetLightLuma;
        palette.LightVibrant = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
    }
    if (palette.Muted === null && palette.Vibrant !== null) {
        var _g = palette.Vibrant.getHsl(), h = _g[0], s = _g[1], l = _g[2];
        l = opts.targetMutesSaturation;
        palette.Muted = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
    }
    if (palette.DarkMuted === null && palette.DarkVibrant !== null) {
        var _h = palette.DarkVibrant.getHsl(), h = _h[0], s = _h[1], l = _h[2];
        l = opts.targetMutesSaturation;
        palette.DarkMuted = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
    }
    if (palette.LightMuted === null && palette.LightVibrant !== null) {
        var _j = palette.LightVibrant.getHsl(), h = _j[0], s = _j[1], l = _j[2];
        l = opts.targetMutesSaturation;
        palette.LightMuted = new color_1.Swatch(util_1.hslToRgb(h, s, l), 0);
    }
}
var DefaultGenerator = function (swatches, opts) {
    opts = defaults({}, opts, DefaultOpts);
    var maxPopulation = _findMaxPopulation(swatches);
    var palette = _generateVariationColors(swatches, maxPopulation, opts);
    _generateEmptySwatches(palette, maxPopulation, opts);
    return palette;
};
exports["default"] = DefaultGenerator;
//# sourceMappingURL=default.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/generator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/generator/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var default_1 = __webpack_require__(/*! ./default */ "./node_modules/node-vibrant/lib/generator/default.js");
Object.defineProperty(exports, "Default", ({ enumerable: true, get: function () { return default_1.default; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/image/base.js":
/*!*****************************************************!*\
  !*** ./node_modules/node-vibrant/lib/image/base.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageBase = void 0;
var ImageBase = /** @class */ (function () {
    function ImageBase() {
    }
    ImageBase.prototype.scaleDown = function (opts) {
        var width = this.getWidth();
        var height = this.getHeight();
        var ratio = 1;
        if (opts.maxDimension > 0) {
            var maxSide = Math.max(width, height);
            if (maxSide > opts.maxDimension)
                ratio = opts.maxDimension / maxSide;
        }
        else {
            ratio = 1 / opts.quality;
        }
        if (ratio < 1)
            this.resize(width * ratio, height * ratio, ratio);
    };
    ImageBase.prototype.applyFilter = function (filter) {
        var imageData = this.getImageData();
        if (typeof filter === 'function') {
            var pixels = imageData.data;
            var n = pixels.length / 4;
            var offset = void 0, r = void 0, g = void 0, b = void 0, a = void 0;
            for (var i = 0; i < n; i++) {
                offset = i * 4;
                r = pixels[offset + 0];
                g = pixels[offset + 1];
                b = pixels[offset + 2];
                a = pixels[offset + 3];
                // Mark ignored color
                if (!filter(r, g, b, a))
                    pixels[offset + 3] = 0;
            }
        }
        return Promise.resolve(imageData);
    };
    return ImageBase;
}());
exports.ImageBase = ImageBase;
//# sourceMappingURL=base.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/image/browser.js":
/*!********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/image/browser.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var base_1 = __webpack_require__(/*! ./base */ "./node_modules/node-vibrant/lib/image/base.js");
var Url = __importStar(__webpack_require__(/*! url */ "./node_modules/url/url.js"));
function isRelativeUrl(url) {
    var u = Url.parse(url);
    return u.protocol === null &&
        u.host === null &&
        u.port === null;
}
function isSameOrigin(a, b) {
    var ua = Url.parse(a);
    var ub = Url.parse(b);
    // https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
    return ua.protocol === ub.protocol &&
        ua.hostname === ub.hostname &&
        ua.port === ub.port;
}
var BrowserImage = /** @class */ (function (_super) {
    __extends(BrowserImage, _super);
    function BrowserImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserImage.prototype._initCanvas = function () {
        var img = this.image;
        var canvas = this._canvas = document.createElement('canvas');
        var context = this._context = canvas.getContext('2d');
        canvas.className = 'vibrant-canvas';
        canvas.style.display = 'none';
        this._width = canvas.width = img.width;
        this._height = canvas.height = img.height;
        context.drawImage(img, 0, 0);
        document.body.appendChild(canvas);
    };
    BrowserImage.prototype.load = function (image) {
        var _this = this;
        var img = null;
        var src = null;
        if (typeof image === 'string') {
            img = document.createElement('img');
            if (!isRelativeUrl(image) && !isSameOrigin(window.location.href, image)) {
                img.crossOrigin = 'anonymous';
            }
            src = img.src = image;
        }
        else if (image instanceof HTMLImageElement) {
            img = image;
            src = image.src;
        }
        else {
            return Promise.reject(new Error("Cannot load buffer as an image in browser"));
        }
        this.image = img;
        return new Promise(function (resolve, reject) {
            var onImageLoad = function () {
                _this._initCanvas();
                resolve(_this);
            };
            if (img.complete) {
                // Already loaded
                onImageLoad();
            }
            else {
                img.onload = onImageLoad;
                img.onerror = function (e) { return reject(new Error("Fail to load image: " + src)); };
            }
        });
    };
    BrowserImage.prototype.clear = function () {
        this._context.clearRect(0, 0, this._width, this._height);
    };
    BrowserImage.prototype.update = function (imageData) {
        this._context.putImageData(imageData, 0, 0);
    };
    BrowserImage.prototype.getWidth = function () {
        return this._width;
    };
    BrowserImage.prototype.getHeight = function () {
        return this._height;
    };
    BrowserImage.prototype.resize = function (targetWidth, targetHeight, ratio) {
        var _a = this, canvas = _a._canvas, context = _a._context, img = _a.image;
        this._width = canvas.width = targetWidth;
        this._height = canvas.height = targetHeight;
        context.scale(ratio, ratio);
        context.drawImage(img, 0, 0);
    };
    BrowserImage.prototype.getPixelCount = function () {
        return this._width * this._height;
    };
    BrowserImage.prototype.getImageData = function () {
        return this._context.getImageData(0, 0, this._width, this._height);
    };
    BrowserImage.prototype.remove = function () {
        if (this._canvas && this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    };
    return BrowserImage;
}(base_1.ImageBase));
exports["default"] = BrowserImage;
//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/quantizer/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/quantizer/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebWorker = void 0;
var mmcq_1 = __webpack_require__(/*! ./mmcq */ "./node_modules/node-vibrant/lib/quantizer/mmcq.js");
Object.defineProperty(exports, "MMCQ", ({ enumerable: true, get: function () { return mmcq_1.default; } }));
exports.WebWorker = null;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/quantizer/mmcq.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/quantizer/mmcq.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var color_1 = __webpack_require__(/*! ../color */ "./node_modules/node-vibrant/lib/color.js");
var vbox_1 = __importDefault(__webpack_require__(/*! ./vbox */ "./node_modules/node-vibrant/lib/quantizer/vbox.js"));
var pqueue_1 = __importDefault(__webpack_require__(/*! ./pqueue */ "./node_modules/node-vibrant/lib/quantizer/pqueue.js"));
var fractByPopulations = 0.75;
function _splitBoxes(pq, target) {
    var lastSize = pq.size();
    while (pq.size() < target) {
        var vbox = pq.pop();
        if (vbox && vbox.count() > 0) {
            var _a = vbox.split(), vbox1 = _a[0], vbox2 = _a[1];
            pq.push(vbox1);
            if (vbox2 && vbox2.count() > 0)
                pq.push(vbox2);
            // No more new boxes, converged
            if (pq.size() === lastSize) {
                break;
            }
            else {
                lastSize = pq.size();
            }
        }
        else {
            break;
        }
    }
}
var MMCQ = function (pixels, opts) {
    if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {
        throw new Error('Wrong MMCQ parameters');
    }
    var vbox = vbox_1.default.build(pixels);
    var hist = vbox.hist;
    var colorCount = Object.keys(hist).length;
    var pq = new pqueue_1.default(function (a, b) { return a.count() - b.count(); });
    pq.push(vbox);
    // first set of colors, sorted by population
    _splitBoxes(pq, fractByPopulations * opts.colorCount);
    // Re-order
    var pq2 = new pqueue_1.default(function (a, b) { return a.count() * a.volume() - b.count() * b.volume(); });
    pq2.contents = pq.contents;
    // next set - generate the median cuts using the (npix * vol) sorting.
    _splitBoxes(pq2, opts.colorCount - pq2.size());
    // calculate the actual colors
    return generateSwatches(pq2);
};
function generateSwatches(pq) {
    var swatches = [];
    while (pq.size()) {
        var v = pq.pop();
        var color = v.avg();
        var r = color[0], g = color[1], b = color[2];
        swatches.push(new color_1.Swatch(color, v.count()));
    }
    return swatches;
}
exports["default"] = MMCQ;
//# sourceMappingURL=mmcq.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/quantizer/pqueue.js":
/*!***********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/quantizer/pqueue.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var PQueue = /** @class */ (function () {
    function PQueue(comparator) {
        this._comparator = comparator;
        this.contents = [];
        this._sorted = false;
    }
    PQueue.prototype._sort = function () {
        if (!this._sorted) {
            this.contents.sort(this._comparator);
            this._sorted = true;
        }
    };
    PQueue.prototype.push = function (item) {
        this.contents.push(item);
        this._sorted = false;
    };
    PQueue.prototype.peek = function (index) {
        this._sort();
        index = typeof index === 'number' ? index : this.contents.length - 1;
        return this.contents[index];
    };
    PQueue.prototype.pop = function () {
        this._sort();
        return this.contents.pop();
    };
    PQueue.prototype.size = function () {
        return this.contents.length;
    };
    PQueue.prototype.map = function (mapper) {
        this._sort();
        return this.contents.map(mapper);
    };
    return PQueue;
}());
exports["default"] = PQueue;
//# sourceMappingURL=pqueue.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/quantizer/vbox.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/quantizer/vbox.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var util_1 = __webpack_require__(/*! ../util */ "./node_modules/node-vibrant/lib/util.js");
var VBox = /** @class */ (function () {
    function VBox(r1, r2, g1, g2, b1, b2, hist) {
        this._volume = -1;
        this._count = -1;
        this.dimension = { r1: r1, r2: r2, g1: g1, g2: g2, b1: b1, b2: b2 };
        this.hist = hist;
    }
    VBox.build = function (pixels, shouldIgnore) {
        var hn = 1 << (3 * util_1.SIGBITS);
        var hist = new Uint32Array(hn);
        var rmax;
        var rmin;
        var gmax;
        var gmin;
        var bmax;
        var bmin;
        var r;
        var g;
        var b;
        var a;
        rmax = gmax = bmax = 0;
        rmin = gmin = bmin = Number.MAX_VALUE;
        var n = pixels.length / 4;
        var i = 0;
        while (i < n) {
            var offset = i * 4;
            i++;
            r = pixels[offset + 0];
            g = pixels[offset + 1];
            b = pixels[offset + 2];
            a = pixels[offset + 3];
            // Ignored pixels' alpha is marked as 0 in filtering stage
            if (a === 0)
                continue;
            r = r >> util_1.RSHIFT;
            g = g >> util_1.RSHIFT;
            b = b >> util_1.RSHIFT;
            var index = util_1.getColorIndex(r, g, b);
            hist[index] += 1;
            if (r > rmax)
                rmax = r;
            if (r < rmin)
                rmin = r;
            if (g > gmax)
                gmax = g;
            if (g < gmin)
                gmin = g;
            if (b > bmax)
                bmax = b;
            if (b < bmin)
                bmin = b;
        }
        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, hist);
    };
    VBox.prototype.invalidate = function () {
        this._volume = this._count = -1;
        this._avg = null;
    };
    VBox.prototype.volume = function () {
        if (this._volume < 0) {
            var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
            this._volume = (r2 - r1 + 1) * (g2 - g1 + 1) * (b2 - b1 + 1);
        }
        return this._volume;
    };
    VBox.prototype.count = function () {
        if (this._count < 0) {
            var hist = this.hist;
            var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
            var c = 0;
            for (var r = r1; r <= r2; r++) {
                for (var g = g1; g <= g2; g++) {
                    for (var b = b1; b <= b2; b++) {
                        var index = util_1.getColorIndex(r, g, b);
                        c += hist[index];
                    }
                }
            }
            this._count = c;
        }
        return this._count;
    };
    VBox.prototype.clone = function () {
        var hist = this.hist;
        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
        return new VBox(r1, r2, g1, g2, b1, b2, hist);
    };
    VBox.prototype.avg = function () {
        if (!this._avg) {
            var hist = this.hist;
            var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
            var ntot = 0;
            var mult = 1 << (8 - util_1.SIGBITS);
            var rsum = void 0;
            var gsum = void 0;
            var bsum = void 0;
            rsum = gsum = bsum = 0;
            for (var r = r1; r <= r2; r++) {
                for (var g = g1; g <= g2; g++) {
                    for (var b = b1; b <= b2; b++) {
                        var index = util_1.getColorIndex(r, g, b);
                        var h = hist[index];
                        ntot += h;
                        rsum += (h * (r + 0.5) * mult);
                        gsum += (h * (g + 0.5) * mult);
                        bsum += (h * (b + 0.5) * mult);
                    }
                }
            }
            if (ntot) {
                this._avg = [
                    ~~(rsum / ntot),
                    ~~(gsum / ntot),
                    ~~(bsum / ntot)
                ];
            }
            else {
                this._avg = [
                    ~~(mult * (r1 + r2 + 1) / 2),
                    ~~(mult * (g1 + g2 + 1) / 2),
                    ~~(mult * (b1 + b2 + 1) / 2)
                ];
            }
        }
        return this._avg;
    };
    VBox.prototype.contains = function (rgb) {
        var r = rgb[0], g = rgb[1], b = rgb[2];
        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
        r >>= util_1.RSHIFT;
        g >>= util_1.RSHIFT;
        b >>= util_1.RSHIFT;
        return r >= r1 && r <= r2 &&
            g >= g1 && g <= g2 &&
            b >= b1 && b <= b2;
    };
    VBox.prototype.split = function () {
        var hist = this.hist;
        var _a = this.dimension, r1 = _a.r1, r2 = _a.r2, g1 = _a.g1, g2 = _a.g2, b1 = _a.b1, b2 = _a.b2;
        var count = this.count();
        if (!count)
            return [];
        if (count === 1)
            return [this.clone()];
        var rw = r2 - r1 + 1;
        var gw = g2 - g1 + 1;
        var bw = b2 - b1 + 1;
        var maxw = Math.max(rw, gw, bw);
        var accSum = null;
        var sum;
        var total;
        sum = total = 0;
        var maxd = null;
        if (maxw === rw) {
            maxd = 'r';
            accSum = new Uint32Array(r2 + 1);
            for (var r = r1; r <= r2; r++) {
                sum = 0;
                for (var g = g1; g <= g2; g++) {
                    for (var b = b1; b <= b2; b++) {
                        var index = util_1.getColorIndex(r, g, b);
                        sum += hist[index];
                    }
                }
                total += sum;
                accSum[r] = total;
            }
        }
        else if (maxw === gw) {
            maxd = 'g';
            accSum = new Uint32Array(g2 + 1);
            for (var g = g1; g <= g2; g++) {
                sum = 0;
                for (var r = r1; r <= r2; r++) {
                    for (var b = b1; b <= b2; b++) {
                        var index = util_1.getColorIndex(r, g, b);
                        sum += hist[index];
                    }
                }
                total += sum;
                accSum[g] = total;
            }
        }
        else {
            maxd = 'b';
            accSum = new Uint32Array(b2 + 1);
            for (var b = b1; b <= b2; b++) {
                sum = 0;
                for (var r = r1; r <= r2; r++) {
                    for (var g = g1; g <= g2; g++) {
                        var index = util_1.getColorIndex(r, g, b);
                        sum += hist[index];
                    }
                }
                total += sum;
                accSum[b] = total;
            }
        }
        var splitPoint = -1;
        var reverseSum = new Uint32Array(accSum.length);
        for (var i = 0; i < accSum.length; i++) {
            var d = accSum[i];
            if (splitPoint < 0 && d > total / 2)
                splitPoint = i;
            reverseSum[i] = total - d;
        }
        var vbox = this;
        function doCut(d) {
            var dim1 = d + '1';
            var dim2 = d + '2';
            var d1 = vbox.dimension[dim1];
            var d2 = vbox.dimension[dim2];
            var vbox1 = vbox.clone();
            var vbox2 = vbox.clone();
            var left = splitPoint - d1;
            var right = d2 - splitPoint;
            if (left <= right) {
                d2 = Math.min(d2 - 1, ~~(splitPoint + right / 2));
                d2 = Math.max(0, d2);
            }
            else {
                d2 = Math.max(d1, ~~(splitPoint - 1 - left / 2));
                d2 = Math.min(vbox.dimension[dim2], d2);
            }
            while (!accSum[d2])
                d2++;
            var c2 = reverseSum[d2];
            while (!c2 && accSum[d2 - 1])
                c2 = reverseSum[--d2];
            vbox1.dimension[dim2] = d2;
            vbox2.dimension[dim1] = d2 + 1;
            return [vbox1, vbox2];
        }
        return doCut(maxd);
    };
    return VBox;
}());
exports["default"] = VBox;
//# sourceMappingURL=vbox.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/util.js":
/*!***********************************************!*\
  !*** ./node_modules/node-vibrant/lib/util.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getColorIndex = exports.getColorDiffStatus = exports.hexDiff = exports.rgbDiff = exports.deltaE94 = exports.rgbToCIELab = exports.xyzToCIELab = exports.rgbToXyz = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.defer = exports.RSHIFT = exports.SIGBITS = exports.DELTAE94_DIFF_STATUS = void 0;
exports.DELTAE94_DIFF_STATUS = {
    NA: 0,
    PERFECT: 1,
    CLOSE: 2,
    GOOD: 10,
    SIMILAR: 50
};
exports.SIGBITS = 5;
exports.RSHIFT = 8 - exports.SIGBITS;
function defer() {
    var resolve;
    var reject;
    // eslint-disable-next-line promise/param-names
    var promise = new Promise(function (_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
    });
    // @ts-ignore
    return { resolve: resolve, reject: reject, promise: promise };
}
exports.defer = defer;
function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m === null ? null : [m[1], m[2], m[3]].map(function (s) { return parseInt(s, 16); });
}
exports.hexToRgb = hexToRgb;
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
}
exports.rgbToHex = rgbToHex;
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h;
    var s;
    var l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        // @ts-ignore
        h /= 6;
    }
    // @ts-ignore
    return [h, s, l];
}
exports.rgbToHsl = rgbToHsl;
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    function hue2rgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    if (s === 0) {
        r = g = b = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - (1 / 3));
    }
    return [
        r * 255,
        g * 255,
        b * 255
    ];
}
exports.hslToRgb = hslToRgb;
function rgbToXyz(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    r = r > 0.04045 ? Math.pow((r + 0.005) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.005) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.005) / 1.055, 2.4) : b / 12.92;
    r *= 100;
    g *= 100;
    b *= 100;
    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x, y, z];
}
exports.rgbToXyz = rgbToXyz;
function xyzToCIELab(x, y, z) {
    var REF_X = 95.047;
    var REF_Y = 100;
    var REF_Z = 108.883;
    x /= REF_X;
    y /= REF_Y;
    z /= REF_Z;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    var L = 116 * y - 16;
    var a = 500 * (x - y);
    var b = 200 * (y - z);
    return [L, a, b];
}
exports.xyzToCIELab = xyzToCIELab;
function rgbToCIELab(r, g, b) {
    var _a = rgbToXyz(r, g, b), x = _a[0], y = _a[1], z = _a[2];
    return xyzToCIELab(x, y, z);
}
exports.rgbToCIELab = rgbToCIELab;
function deltaE94(lab1, lab2) {
    var WEIGHT_L = 1;
    var WEIGHT_C = 1;
    var WEIGHT_H = 1;
    var L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
    var L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];
    var dL = L1 - L2;
    var da = a1 - a2;
    var db = b1 - b2;
    var xC1 = Math.sqrt(a1 * a1 + b1 * b1);
    var xC2 = Math.sqrt(a2 * a2 + b2 * b2);
    var xDL = L2 - L1;
    var xDC = xC2 - xC1;
    var xDE = Math.sqrt(dL * dL + da * da + db * db);
    var xDH = (Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC)))
        ? Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC)
        : 0;
    var xSC = 1 + 0.045 * xC1;
    var xSH = 1 + 0.015 * xC1;
    xDL /= WEIGHT_L;
    xDC /= WEIGHT_C * xSC;
    xDH /= WEIGHT_H * xSH;
    return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);
}
exports.deltaE94 = deltaE94;
function rgbDiff(rgb1, rgb2) {
    var lab1 = rgbToCIELab.apply(undefined, rgb1);
    var lab2 = rgbToCIELab.apply(undefined, rgb2);
    return deltaE94(lab1, lab2);
}
exports.rgbDiff = rgbDiff;
function hexDiff(hex1, hex2) {
    var rgb1 = hexToRgb(hex1);
    var rgb2 = hexToRgb(hex2);
    return rgbDiff(rgb1, rgb2);
}
exports.hexDiff = hexDiff;
function getColorDiffStatus(d) {
    if (d < exports.DELTAE94_DIFF_STATUS.NA) {
        return 'N/A';
    }
    // Not perceptible by human eyes
    if (d <= exports.DELTAE94_DIFF_STATUS.PERFECT) {
        return 'Perfect';
    }
    // Perceptible through close observation
    if (d <= exports.DELTAE94_DIFF_STATUS.CLOSE) {
        return 'Close';
    }
    // Perceptible at a glance
    if (d <= exports.DELTAE94_DIFF_STATUS.GOOD) {
        return 'Good';
    }
    // Colors are more similar than opposite
    if (d < exports.DELTAE94_DIFF_STATUS.SIMILAR) {
        return 'Similar';
    }
    return 'Wrong';
}
exports.getColorDiffStatus = getColorDiffStatus;
function getColorIndex(r, g, b) {
    return (r << (2 * exports.SIGBITS)) + (g << exports.SIGBITS) + b;
}
exports.getColorIndex = getColorIndex;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/node-vibrant/lib/vibrant.js":
/*!**************************************************!*\
  !*** ./node_modules/node-vibrant/lib/vibrant.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var color_1 = __webpack_require__(/*! ./color */ "./node_modules/node-vibrant/lib/color.js");
var builder_1 = __importDefault(__webpack_require__(/*! ./builder */ "./node_modules/node-vibrant/lib/builder.js"));
var Util = __importStar(__webpack_require__(/*! ./util */ "./node_modules/node-vibrant/lib/util.js"));
var Quantizer = __importStar(__webpack_require__(/*! ./quantizer */ "./node_modules/node-vibrant/lib/quantizer/index.js"));
var Generator = __importStar(__webpack_require__(/*! ./generator */ "./node_modules/node-vibrant/lib/generator/index.js"));
var Filters = __importStar(__webpack_require__(/*! ./filter */ "./node_modules/node-vibrant/lib/filter/index.js"));
var defaults = __webpack_require__(/*! lodash/defaults */ "./node_modules/lodash/defaults.js");
var Vibrant = /** @class */ (function () {
    function Vibrant(_src, opts) {
        this._src = _src;
        this.opts = defaults({}, opts, Vibrant.DefaultOpts);
        this.opts.combinedFilter = Filters.combineFilters(this.opts.filters);
    }
    Vibrant.from = function (src) {
        return new builder_1.default(src);
    };
    Vibrant.prototype._process = function (image, opts) {
        var quantizer = opts.quantizer, generator = opts.generator;
        image.scaleDown(opts);
        return image.applyFilter(opts.combinedFilter)
            .then(function (imageData) { return quantizer(imageData.data, opts); })
            .then(function (colors) { return color_1.Swatch.applyFilter(colors, opts.combinedFilter); })
            .then(function (colors) { return Promise.resolve(generator(colors)); });
    };
    Vibrant.prototype.palette = function () {
        return this.swatches();
    };
    Vibrant.prototype.swatches = function () {
        return this._palette;
    };
    Vibrant.prototype.getPalette = function (cb) {
        var _this = this;
        var image = new this.opts.ImageClass();
        var result = image.load(this._src)
            .then(function (image) { return _this._process(image, _this.opts); })
            .then(function (palette) {
            _this._palette = palette;
            image.remove();
            return palette;
        }, function (err) {
            image.remove();
            throw err;
        });
        if (cb)
            result.then(function (palette) { return cb(null, palette); }, function (err) { return cb(err); });
        return result;
    };
    Vibrant.Builder = builder_1.default;
    Vibrant.Quantizer = Quantizer;
    Vibrant.Generator = Generator;
    Vibrant.Filter = Filters;
    Vibrant.Util = Util;
    Vibrant.Swatch = color_1.Swatch;
    Vibrant.DefaultOpts = {
        colorCount: 64,
        quality: 5,
        generator: Generator.Default,
        ImageClass: null,
        quantizer: Quantizer.MMCQ,
        filters: [Filters.Default]
    };
    return Vibrant;
}());
exports["default"] = Vibrant;
//# sourceMappingURL=vibrant.js.map

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_style_index_0_id_27ad2758_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_style_index_0_id_27ad2758_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_style_index_0_id_27ad2758_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_style_index_0_id_27ad2758_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_style_index_0_id_27ad2758_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_style_index_0_id_bc6b1dbc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_style_index_0_id_bc6b1dbc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_style_index_0_id_bc6b1dbc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_style_index_0_id_bc6b1dbc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_style_index_0_id_bc6b1dbc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_style_index_0_id_49204daa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_style_index_0_id_49204daa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_style_index_0_id_49204daa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_style_index_0_id_49204daa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_style_index_0_id_49204daa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_style_index_0_id_79a64974_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_style_index_0_id_79a64974_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_style_index_0_id_79a64974_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_style_index_0_id_79a64974_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_style_index_0_id_79a64974_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_style_index_0_id_753fb662_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_style_index_0_id_753fb662_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_style_index_0_id_753fb662_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_style_index_0_id_753fb662_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_style_index_0_id_753fb662_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./apps/theming/src/UserTheming.vue":
/*!******************************************!*\
  !*** ./apps/theming/src/UserTheming.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserTheming_vue_vue_type_template_id_27ad2758_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserTheming.vue?vue&type=template&id=27ad2758&scoped=true */ "./apps/theming/src/UserTheming.vue?vue&type=template&id=27ad2758&scoped=true");
/* harmony import */ var _UserTheming_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserTheming.vue?vue&type=script&lang=js */ "./apps/theming/src/UserTheming.vue?vue&type=script&lang=js");
/* harmony import */ var _UserTheming_vue_vue_type_style_index_0_id_27ad2758_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true */ "./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserTheming_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserTheming_vue_vue_type_template_id_27ad2758_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _UserTheming_vue_vue_type_template_id_27ad2758_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "27ad2758",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/UserTheming.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelector.vue":
/*!**********************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelector.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AppOrderSelector_vue_vue_type_template_id_bc6b1dbc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true */ "./apps/theming/src/components/AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true");
/* harmony import */ var _AppOrderSelector_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppOrderSelector.vue?vue&type=script&lang=ts */ "./apps/theming/src/components/AppOrderSelector.vue?vue&type=script&lang=ts");
/* harmony import */ var _AppOrderSelector_vue_vue_type_style_index_0_id_bc6b1dbc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss */ "./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AppOrderSelector_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppOrderSelector_vue_vue_type_template_id_bc6b1dbc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _AppOrderSelector_vue_vue_type_template_id_bc6b1dbc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "bc6b1dbc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/AppOrderSelector.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelectorElement.vue":
/*!*****************************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelectorElement.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AppOrderSelectorElement_vue_vue_type_template_id_49204daa_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true */ "./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true");
/* harmony import */ var _AppOrderSelectorElement_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppOrderSelectorElement.vue?vue&type=script&lang=ts */ "./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=script&lang=ts");
/* harmony import */ var _AppOrderSelectorElement_vue_vue_type_style_index_0_id_49204daa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true */ "./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AppOrderSelectorElement_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppOrderSelectorElement_vue_vue_type_template_id_49204daa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _AppOrderSelectorElement_vue_vue_type_template_id_49204daa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "49204daa",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/AppOrderSelectorElement.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue":
/*!************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true */ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true");
/* harmony import */ var _BackgroundSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BackgroundSettings.vue?vue&type=script&lang=js */ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js");
/* harmony import */ var _BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss */ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BackgroundSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2cb9c9e7",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/BackgroundSettings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue":
/*!*****************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true */ "./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true");
/* harmony import */ var _ItemPreview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemPreview.vue?vue&type=script&lang=js */ "./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js");
/* harmony import */ var _ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true */ "./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ItemPreview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5d6fc2af",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/ItemPreview.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/UserAppMenuSection.vue":
/*!************************************************************!*\
  !*** ./apps/theming/src/components/UserAppMenuSection.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserAppMenuSection_vue_vue_type_template_id_79a64974_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true */ "./apps/theming/src/components/UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true");
/* harmony import */ var _UserAppMenuSection_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserAppMenuSection.vue?vue&type=script&lang=ts */ "./apps/theming/src/components/UserAppMenuSection.vue?vue&type=script&lang=ts");
/* harmony import */ var _UserAppMenuSection_vue_vue_type_style_index_0_id_79a64974_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss */ "./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserAppMenuSection_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserAppMenuSection_vue_vue_type_template_id_79a64974_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _UserAppMenuSection_vue_vue_type_template_id_79a64974_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "79a64974",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/UserAppMenuSection.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/theming/src/components/UserPrimaryColor.vue":
/*!**********************************************************!*\
  !*** ./apps/theming/src/components/UserPrimaryColor.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserPrimaryColor_vue_vue_type_template_id_753fb662_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true */ "./apps/theming/src/components/UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true");
/* harmony import */ var _UserPrimaryColor_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserPrimaryColor.vue?vue&type=script&lang=ts */ "./apps/theming/src/components/UserPrimaryColor.vue?vue&type=script&lang=ts");
/* harmony import */ var _UserPrimaryColor_vue_vue_type_style_index_0_id_753fb662_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss */ "./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserPrimaryColor_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserPrimaryColor_vue_vue_type_template_id_753fb662_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _UserPrimaryColor_vue_vue_type_template_id_753fb662_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "753fb662",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/theming/src/components/UserPrimaryColor.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./node_modules/vue-material-design-icons/ImageEdit.vue":
/*!**************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/ImageEdit.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ImageEdit_vue_vue_type_template_id_112051ee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageEdit.vue?vue&type=template&id=112051ee */ "./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=template&id=112051ee");
/* harmony import */ var _ImageEdit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageEdit.vue?vue&type=script&lang=js */ "./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ImageEdit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ImageEdit_vue_vue_type_template_id_112051ee__WEBPACK_IMPORTED_MODULE_0__.render,
  _ImageEdit_vue_vue_type_template_id_112051ee__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/vue-material-design-icons/ImageEdit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ImageEditIcon",
  emits: ['click'],
  props: {
    title: {
      type: String,
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
});


/***/ }),

/***/ "./node_modules/vue-material-design-icons/Palette.vue":
/*!************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/Palette.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Palette_vue_vue_type_template_id_4b2c277f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Palette.vue?vue&type=template&id=4b2c277f */ "./node_modules/vue-material-design-icons/Palette.vue?vue&type=template&id=4b2c277f");
/* harmony import */ var _Palette_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Palette.vue?vue&type=script&lang=js */ "./node_modules/vue-material-design-icons/Palette.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Palette_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Palette_vue_vue_type_template_id_4b2c277f__WEBPACK_IMPORTED_MODULE_0__.render,
  _Palette_vue_vue_type_template_id_4b2c277f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/vue-material-design-icons/Palette.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Palette.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Palette.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PaletteIcon",
  emits: ['click'],
  props: {
    title: {
      type: String,
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
});


/***/ }),

/***/ "./node_modules/vue-material-design-icons/Undo.vue":
/*!*********************************************************!*\
  !*** ./node_modules/vue-material-design-icons/Undo.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Undo_vue_vue_type_template_id_6cb34d10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Undo.vue?vue&type=template&id=6cb34d10 */ "./node_modules/vue-material-design-icons/Undo.vue?vue&type=template&id=6cb34d10");
/* harmony import */ var _Undo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Undo.vue?vue&type=script&lang=js */ "./node_modules/vue-material-design-icons/Undo.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Undo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Undo_vue_vue_type_template_id_6cb34d10__WEBPACK_IMPORTED_MODULE_0__.render,
  _Undo_vue_vue_type_template_id_6cb34d10__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/vue-material-design-icons/Undo.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Undo.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Undo.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "UndoIcon",
  emits: ['click'],
  props: {
    title: {
      type: String,
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
});


/***/ }),

/***/ "./node_modules/vue-material-design-icons/UndoVariant.vue":
/*!****************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/UndoVariant.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UndoVariant_vue_vue_type_template_id_d35261f6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UndoVariant.vue?vue&type=template&id=d35261f6 */ "./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=template&id=d35261f6");
/* harmony import */ var _UndoVariant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UndoVariant.vue?vue&type=script&lang=js */ "./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=script&lang=js");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UndoVariant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _UndoVariant_vue_vue_type_template_id_d35261f6__WEBPACK_IMPORTED_MODULE_0__.render,
  _UndoVariant_vue_vue_type_template_id_d35261f6__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/vue-material-design-icons/UndoVariant.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "UndoVariantIcon",
  emits: ['click'],
  props: {
    title: {
      type: String,
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
});


/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelector.vue?vue&type=script&lang=ts":
/*!**********************************************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelector.vue?vue&type=script&lang=ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelector.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=script&lang=ts");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=script&lang=ts":
/*!*****************************************************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=script&lang=ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelectorElement.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=script&lang=ts");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/components/UserAppMenuSection.vue?vue&type=script&lang=ts":
/*!************************************************************************************!*\
  !*** ./apps/theming/src/components/UserAppMenuSection.vue?vue&type=script&lang=ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserAppMenuSection.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=script&lang=ts");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/components/UserPrimaryColor.vue?vue&type=script&lang=ts":
/*!**********************************************************************************!*\
  !*** ./apps/theming/src/components/UserPrimaryColor.vue?vue&type=script&lang=ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserPrimaryColor.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=script&lang=ts");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/UserTheming.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./apps/theming/src/UserTheming.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserTheming.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/theming/src/UserTheming.vue?vue&type=template&id=27ad2758&scoped=true":
/*!************************************************************************************!*\
  !*** ./apps/theming/src/UserTheming.vue?vue&type=template&id=27ad2758&scoped=true ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_template_id_27ad2758_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_template_id_27ad2758_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_template_id_27ad2758_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserTheming.vue?vue&type=template&id=27ad2758&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=template&id=27ad2758&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true":
/*!****************************************************************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_template_id_bc6b1dbc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_template_id_bc6b1dbc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_template_id_bc6b1dbc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=template&id=bc6b1dbc&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_template_id_49204daa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_template_id_49204daa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_template_id_49204daa_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=template&id=49204daa&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true":
/*!******************************************************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_template_id_2cb9c9e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=template&id=2cb9c9e7&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_template_id_5d6fc2af_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=template&id=5d6fc2af&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true":
/*!******************************************************************************************************!*\
  !*** ./apps/theming/src/components/UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_template_id_79a64974_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_template_id_79a64974_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_template_id_79a64974_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=template&id=79a64974&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true":
/*!****************************************************************************************************!*\
  !*** ./apps/theming/src/components/UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_template_id_753fb662_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_template_id_753fb662_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_template_id_753fb662_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=template&id=753fb662&scoped=true");


/***/ }),

/***/ "./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserTheming_vue_vue_type_style_index_0_id_27ad2758_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/UserTheming.vue?vue&type=style&index=0&id=27ad2758&lang=scss&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss":
/*!*******************************************************************************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelector_vue_vue_type_style_index_0_id_bc6b1dbc_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelector.vue?vue&type=style&index=0&id=bc6b1dbc&scoped=true&lang=scss");


/***/ }),

/***/ "./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true":
/*!**************************************************************************************************************************!*\
  !*** ./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppOrderSelectorElement_vue_vue_type_style_index_0_id_49204daa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/AppOrderSelectorElement.vue?vue&type=style&index=0&id=49204daa&lang=scss&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss":
/*!*********************************************************************************************************************!*\
  !*** ./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundSettings_vue_vue_type_style_index_0_id_2cb9c9e7_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/BackgroundSettings.vue?vue&type=style&index=0&id=2cb9c9e7&scoped=true&lang=scss");


/***/ }),

/***/ "./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPreview_vue_vue_type_style_index_0_id_5d6fc2af_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/ItemPreview.vue?vue&type=style&index=0&id=5d6fc2af&lang=scss&scoped=true");


/***/ }),

/***/ "./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss":
/*!*********************************************************************************************************************!*\
  !*** ./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserAppMenuSection_vue_vue_type_style_index_0_id_79a64974_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserAppMenuSection.vue?vue&type=style&index=0&id=79a64974&scoped=true&lang=scss");


/***/ }),

/***/ "./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss":
/*!*******************************************************************************************************************!*\
  !*** ./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserPrimaryColor_vue_vue_type_style_index_0_id_753fb662_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/theming/src/components/UserPrimaryColor.vue?vue&type=style&index=0&id=753fb662&scoped=true&lang=scss");


/***/ }),

/***/ "./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_ImageEdit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/index.js??vue-loader-options!./ImageEdit.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_vue_loader_lib_index_js_vue_loader_options_ImageEdit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/vue-material-design-icons/Palette.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/Palette.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_Palette_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/index.js??vue-loader-options!./Palette.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Palette.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_vue_loader_lib_index_js_vue_loader_options_Palette_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/vue-material-design-icons/Undo.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/Undo.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_Undo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/index.js??vue-loader-options!./Undo.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Undo.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_vue_loader_lib_index_js_vue_loader_options_Undo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_UndoVariant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/index.js??vue-loader-options!./UndoVariant.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_vue_loader_lib_index_js_vue_loader_options_UndoVariant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=template&id=112051ee":
/*!********************************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=template&id=112051ee ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_ImageEdit_vue_vue_type_template_id_112051ee__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_ImageEdit_vue_vue_type_template_id_112051ee__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_ImageEdit_vue_vue_type_template_id_112051ee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../vue-loader/lib/index.js??vue-loader-options!./ImageEdit.vue?vue&type=template&id=112051ee */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=template&id=112051ee");


/***/ }),

/***/ "./node_modules/vue-material-design-icons/Palette.vue?vue&type=template&id=4b2c277f":
/*!******************************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/Palette.vue?vue&type=template&id=4b2c277f ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_Palette_vue_vue_type_template_id_4b2c277f__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_Palette_vue_vue_type_template_id_4b2c277f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_Palette_vue_vue_type_template_id_4b2c277f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../vue-loader/lib/index.js??vue-loader-options!./Palette.vue?vue&type=template&id=4b2c277f */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Palette.vue?vue&type=template&id=4b2c277f");


/***/ }),

/***/ "./node_modules/vue-material-design-icons/Undo.vue?vue&type=template&id=6cb34d10":
/*!***************************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/Undo.vue?vue&type=template&id=6cb34d10 ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_Undo_vue_vue_type_template_id_6cb34d10__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_Undo_vue_vue_type_template_id_6cb34d10__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_Undo_vue_vue_type_template_id_6cb34d10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../vue-loader/lib/index.js??vue-loader-options!./Undo.vue?vue&type=template&id=6cb34d10 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Undo.vue?vue&type=template&id=6cb34d10");


/***/ }),

/***/ "./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=template&id=d35261f6":
/*!**********************************************************************************************!*\
  !*** ./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=template&id=d35261f6 ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_UndoVariant_vue_vue_type_template_id_d35261f6__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_UndoVariant_vue_vue_type_template_id_d35261f6__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_vue_loader_lib_index_js_vue_loader_options_UndoVariant_vue_vue_type_template_id_d35261f6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../vue-loader/lib/index.js??vue-loader-options!./UndoVariant.vue?vue&type=template&id=d35261f6 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=template&id=d35261f6");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=template&id=112051ee":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/ImageEdit.vue?vue&type=template&id=112051ee ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "span",
    _vm._b(
      {
        staticClass: "material-design-icon image-edit-icon",
        attrs: {
          "aria-hidden": _vm.title ? null : true,
          "aria-label": _vm.title,
          role: "img",
        },
        on: {
          click: function ($event) {
            return _vm.$emit("click", $event)
          },
        },
      },
      "span",
      _vm.$attrs,
      false
    ),
    [
      _c(
        "svg",
        {
          staticClass: "material-design-icon__svg",
          attrs: {
            fill: _vm.fillColor,
            width: _vm.size,
            height: _vm.size,
            viewBox: "0 0 24 24",
          },
        },
        [
          _c(
            "path",
            {
              attrs: {
                d: "M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M21 5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H11V19.1L12.1 18H5L8.5 13.5L11 16.5L14.5 12L16.1 14.1L21 9.1V5Z",
              },
            },
            [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()]
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Palette.vue?vue&type=template&id=4b2c277f":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Palette.vue?vue&type=template&id=4b2c277f ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "span",
    _vm._b(
      {
        staticClass: "material-design-icon palette-icon",
        attrs: {
          "aria-hidden": _vm.title ? null : true,
          "aria-label": _vm.title,
          role: "img",
        },
        on: {
          click: function ($event) {
            return _vm.$emit("click", $event)
          },
        },
      },
      "span",
      _vm.$attrs,
      false
    ),
    [
      _c(
        "svg",
        {
          staticClass: "material-design-icon__svg",
          attrs: {
            fill: _vm.fillColor,
            width: _vm.size,
            height: _vm.size,
            viewBox: "0 0 24 24",
          },
        },
        [
          _c(
            "path",
            {
              attrs: {
                d: "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",
              },
            },
            [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()]
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Undo.vue?vue&type=template&id=6cb34d10":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/Undo.vue?vue&type=template&id=6cb34d10 ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "span",
    _vm._b(
      {
        staticClass: "material-design-icon undo-icon",
        attrs: {
          "aria-hidden": _vm.title ? null : true,
          "aria-label": _vm.title,
          role: "img",
        },
        on: {
          click: function ($event) {
            return _vm.$emit("click", $event)
          },
        },
      },
      "span",
      _vm.$attrs,
      false
    ),
    [
      _c(
        "svg",
        {
          staticClass: "material-design-icon__svg",
          attrs: {
            fill: _vm.fillColor,
            width: _vm.size,
            height: _vm.size,
            viewBox: "0 0 24 24",
          },
        },
        [
          _c(
            "path",
            {
              attrs: {
                d: "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z",
              },
            },
            [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()]
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=template&id=d35261f6":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-material-design-icons/UndoVariant.vue?vue&type=template&id=d35261f6 ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "span",
    _vm._b(
      {
        staticClass: "material-design-icon undo-variant-icon",
        attrs: {
          "aria-hidden": _vm.title ? null : true,
          "aria-label": _vm.title,
          role: "img",
        },
        on: {
          click: function ($event) {
            return _vm.$emit("click", $event)
          },
        },
      },
      "span",
      _vm.$attrs,
      false
    ),
    [
      _c(
        "svg",
        {
          staticClass: "material-design-icon__svg",
          attrs: {
            fill: _vm.fillColor,
            width: _vm.size,
            height: _vm.size,
            viewBox: "0 0 24 24",
          },
        },
        [
          _c(
            "path",
            {
              attrs: {
                d: "M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z",
              },
            },
            [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()]
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/@nextcloud/vue/dist/Components/NcColorPicker.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@nextcloud/vue/dist/Components/NcColorPicker.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _chunks_NcColorPicker_B3WnrXPa_mjs__WEBPACK_IMPORTED_MODULE_0__.N)
/* harmony export */ });
/* harmony import */ var _chunks_NcColorPicker_B3WnrXPa_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chunks/NcColorPicker-B3WnrXPa.mjs */ "./node_modules/@nextcloud/vue/dist/chunks/NcColorPicker-B3WnrXPa.mjs");




/***/ }),

/***/ "./node_modules/@vueuse/integrations/node_modules/@vueuse/core/index.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/@vueuse/integrations/node_modules/@vueuse/core/index.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultMagicKeysAliasMap: () => (/* binding */ DefaultMagicKeysAliasMap),
/* harmony export */   StorageSerializers: () => (/* binding */ StorageSerializers),
/* harmony export */   TransitionPresets: () => (/* binding */ TransitionPresets),
/* harmony export */   assert: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.assert),
/* harmony export */   asyncComputed: () => (/* binding */ computedAsync),
/* harmony export */   autoResetRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.autoResetRef),
/* harmony export */   breakpointsAntDesign: () => (/* binding */ breakpointsAntDesign),
/* harmony export */   breakpointsBootstrapV5: () => (/* binding */ breakpointsBootstrapV5),
/* harmony export */   breakpointsMasterCss: () => (/* binding */ breakpointsMasterCss),
/* harmony export */   breakpointsPrimeFlex: () => (/* binding */ breakpointsPrimeFlex),
/* harmony export */   breakpointsQuasar: () => (/* binding */ breakpointsQuasar),
/* harmony export */   breakpointsSematic: () => (/* binding */ breakpointsSematic),
/* harmony export */   breakpointsTailwind: () => (/* binding */ breakpointsTailwind),
/* harmony export */   breakpointsVuetify: () => (/* binding */ breakpointsVuetify),
/* harmony export */   breakpointsVuetifyV2: () => (/* binding */ breakpointsVuetifyV2),
/* harmony export */   breakpointsVuetifyV3: () => (/* binding */ breakpointsVuetifyV3),
/* harmony export */   bypassFilter: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.bypassFilter),
/* harmony export */   camelize: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.camelize),
/* harmony export */   clamp: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.clamp),
/* harmony export */   cloneFnJSON: () => (/* binding */ cloneFnJSON),
/* harmony export */   computedAsync: () => (/* binding */ computedAsync),
/* harmony export */   computedEager: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.computedEager),
/* harmony export */   computedInject: () => (/* binding */ computedInject),
/* harmony export */   computedWithControl: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.computedWithControl),
/* harmony export */   containsProp: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.containsProp),
/* harmony export */   controlledComputed: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.controlledComputed),
/* harmony export */   controlledRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.controlledRef),
/* harmony export */   createEventHook: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook),
/* harmony export */   createFetch: () => (/* binding */ createFetch),
/* harmony export */   createFilterWrapper: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createFilterWrapper),
/* harmony export */   createGlobalState: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createGlobalState),
/* harmony export */   createInjectionState: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createInjectionState),
/* harmony export */   createReactiveFn: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createReactiveFn),
/* harmony export */   createReusableTemplate: () => (/* binding */ createReusableTemplate),
/* harmony export */   createSharedComposable: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createSharedComposable),
/* harmony export */   createSingletonPromise: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createSingletonPromise),
/* harmony export */   createTemplatePromise: () => (/* binding */ createTemplatePromise),
/* harmony export */   createUnrefFn: () => (/* binding */ createUnrefFn),
/* harmony export */   customStorageEventName: () => (/* binding */ customStorageEventName),
/* harmony export */   debounceFilter: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.debounceFilter),
/* harmony export */   debouncedRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.debouncedRef),
/* harmony export */   debouncedWatch: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.debouncedWatch),
/* harmony export */   defaultDocument: () => (/* binding */ defaultDocument),
/* harmony export */   defaultLocation: () => (/* binding */ defaultLocation),
/* harmony export */   defaultNavigator: () => (/* binding */ defaultNavigator),
/* harmony export */   defaultWindow: () => (/* binding */ defaultWindow),
/* harmony export */   directiveHooks: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.directiveHooks),
/* harmony export */   eagerComputed: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.eagerComputed),
/* harmony export */   executeTransition: () => (/* binding */ executeTransition),
/* harmony export */   extendRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.extendRef),
/* harmony export */   formatDate: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.formatDate),
/* harmony export */   formatTimeAgo: () => (/* binding */ formatTimeAgo),
/* harmony export */   get: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.get),
/* harmony export */   getLifeCycleTarget: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.getLifeCycleTarget),
/* harmony export */   getSSRHandler: () => (/* binding */ getSSRHandler),
/* harmony export */   hasOwn: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn),
/* harmony export */   hyphenate: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.hyphenate),
/* harmony export */   identity: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.identity),
/* harmony export */   ignorableWatch: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.ignorableWatch),
/* harmony export */   increaseWithUnit: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.increaseWithUnit),
/* harmony export */   injectLocal: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.injectLocal),
/* harmony export */   invoke: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.invoke),
/* harmony export */   isClient: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient),
/* harmony export */   isDef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isDef),
/* harmony export */   isDefined: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isDefined),
/* harmony export */   isIOS: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isIOS),
/* harmony export */   isObject: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isObject),
/* harmony export */   isWorker: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isWorker),
/* harmony export */   makeDestructurable: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.makeDestructurable),
/* harmony export */   mapGamepadToXbox360Controller: () => (/* binding */ mapGamepadToXbox360Controller),
/* harmony export */   noop: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop),
/* harmony export */   normalizeDate: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.normalizeDate),
/* harmony export */   notNullish: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.notNullish),
/* harmony export */   now: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.now),
/* harmony export */   objectEntries: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.objectEntries),
/* harmony export */   objectOmit: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.objectOmit),
/* harmony export */   objectPick: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.objectPick),
/* harmony export */   onClickOutside: () => (/* binding */ onClickOutside),
/* harmony export */   onKeyDown: () => (/* binding */ onKeyDown),
/* harmony export */   onKeyPressed: () => (/* binding */ onKeyPressed),
/* harmony export */   onKeyStroke: () => (/* binding */ onKeyStroke),
/* harmony export */   onKeyUp: () => (/* binding */ onKeyUp),
/* harmony export */   onLongPress: () => (/* binding */ onLongPress),
/* harmony export */   onStartTyping: () => (/* binding */ onStartTyping),
/* harmony export */   pausableFilter: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.pausableFilter),
/* harmony export */   pausableWatch: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.pausableWatch),
/* harmony export */   promiseTimeout: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.promiseTimeout),
/* harmony export */   provideLocal: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.provideLocal),
/* harmony export */   rand: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.rand),
/* harmony export */   reactify: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.reactify),
/* harmony export */   reactifyObject: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.reactifyObject),
/* harmony export */   reactiveComputed: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.reactiveComputed),
/* harmony export */   reactiveOmit: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.reactiveOmit),
/* harmony export */   reactivePick: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.reactivePick),
/* harmony export */   refAutoReset: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.refAutoReset),
/* harmony export */   refDebounced: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.refDebounced),
/* harmony export */   refDefault: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.refDefault),
/* harmony export */   refThrottled: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.refThrottled),
/* harmony export */   refWithControl: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.refWithControl),
/* harmony export */   resolveRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.resolveRef),
/* harmony export */   resolveUnref: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.resolveUnref),
/* harmony export */   set: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.set),
/* harmony export */   setSSRHandler: () => (/* binding */ setSSRHandler),
/* harmony export */   syncRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.syncRef),
/* harmony export */   syncRefs: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.syncRefs),
/* harmony export */   templateRef: () => (/* binding */ templateRef),
/* harmony export */   throttleFilter: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.throttleFilter),
/* harmony export */   throttledRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.throttledRef),
/* harmony export */   throttledWatch: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.throttledWatch),
/* harmony export */   timestamp: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.timestamp),
/* harmony export */   toReactive: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toReactive),
/* harmony export */   toRef: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef),
/* harmony export */   toRefs: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRefs),
/* harmony export */   toValue: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue),
/* harmony export */   tryOnBeforeMount: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnBeforeMount),
/* harmony export */   tryOnBeforeUnmount: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnBeforeUnmount),
/* harmony export */   tryOnMounted: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted),
/* harmony export */   tryOnScopeDispose: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose),
/* harmony export */   tryOnUnmounted: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnUnmounted),
/* harmony export */   unrefElement: () => (/* binding */ unrefElement),
/* harmony export */   until: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.until),
/* harmony export */   useActiveElement: () => (/* binding */ useActiveElement),
/* harmony export */   useAnimate: () => (/* binding */ useAnimate),
/* harmony export */   useArrayDifference: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayDifference),
/* harmony export */   useArrayEvery: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayEvery),
/* harmony export */   useArrayFilter: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayFilter),
/* harmony export */   useArrayFind: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayFind),
/* harmony export */   useArrayFindIndex: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayFindIndex),
/* harmony export */   useArrayFindLast: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayFindLast),
/* harmony export */   useArrayIncludes: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayIncludes),
/* harmony export */   useArrayJoin: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayJoin),
/* harmony export */   useArrayMap: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayMap),
/* harmony export */   useArrayReduce: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayReduce),
/* harmony export */   useArraySome: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArraySome),
/* harmony export */   useArrayUnique: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useArrayUnique),
/* harmony export */   useAsyncQueue: () => (/* binding */ useAsyncQueue),
/* harmony export */   useAsyncState: () => (/* binding */ useAsyncState),
/* harmony export */   useBase64: () => (/* binding */ useBase64),
/* harmony export */   useBattery: () => (/* binding */ useBattery),
/* harmony export */   useBluetooth: () => (/* binding */ useBluetooth),
/* harmony export */   useBreakpoints: () => (/* binding */ useBreakpoints),
/* harmony export */   useBroadcastChannel: () => (/* binding */ useBroadcastChannel),
/* harmony export */   useBrowserLocation: () => (/* binding */ useBrowserLocation),
/* harmony export */   useCached: () => (/* binding */ useCached),
/* harmony export */   useClipboard: () => (/* binding */ useClipboard),
/* harmony export */   useClipboardItems: () => (/* binding */ useClipboardItems),
/* harmony export */   useCloned: () => (/* binding */ useCloned),
/* harmony export */   useColorMode: () => (/* binding */ useColorMode),
/* harmony export */   useConfirmDialog: () => (/* binding */ useConfirmDialog),
/* harmony export */   useCounter: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useCounter),
/* harmony export */   useCssVar: () => (/* binding */ useCssVar),
/* harmony export */   useCurrentElement: () => (/* binding */ useCurrentElement),
/* harmony export */   useCycleList: () => (/* binding */ useCycleList),
/* harmony export */   useDark: () => (/* binding */ useDark),
/* harmony export */   useDateFormat: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useDateFormat),
/* harmony export */   useDebounce: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useDebounce),
/* harmony export */   useDebounceFn: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useDebounceFn),
/* harmony export */   useDebouncedRefHistory: () => (/* binding */ useDebouncedRefHistory),
/* harmony export */   useDeviceMotion: () => (/* binding */ useDeviceMotion),
/* harmony export */   useDeviceOrientation: () => (/* binding */ useDeviceOrientation),
/* harmony export */   useDevicePixelRatio: () => (/* binding */ useDevicePixelRatio),
/* harmony export */   useDevicesList: () => (/* binding */ useDevicesList),
/* harmony export */   useDisplayMedia: () => (/* binding */ useDisplayMedia),
/* harmony export */   useDocumentVisibility: () => (/* binding */ useDocumentVisibility),
/* harmony export */   useDraggable: () => (/* binding */ useDraggable),
/* harmony export */   useDropZone: () => (/* binding */ useDropZone),
/* harmony export */   useElementBounding: () => (/* binding */ useElementBounding),
/* harmony export */   useElementByPoint: () => (/* binding */ useElementByPoint),
/* harmony export */   useElementHover: () => (/* binding */ useElementHover),
/* harmony export */   useElementSize: () => (/* binding */ useElementSize),
/* harmony export */   useElementVisibility: () => (/* binding */ useElementVisibility),
/* harmony export */   useEventBus: () => (/* binding */ useEventBus),
/* harmony export */   useEventListener: () => (/* binding */ useEventListener),
/* harmony export */   useEventSource: () => (/* binding */ useEventSource),
/* harmony export */   useEyeDropper: () => (/* binding */ useEyeDropper),
/* harmony export */   useFavicon: () => (/* binding */ useFavicon),
/* harmony export */   useFetch: () => (/* binding */ useFetch),
/* harmony export */   useFileDialog: () => (/* binding */ useFileDialog),
/* harmony export */   useFileSystemAccess: () => (/* binding */ useFileSystemAccess),
/* harmony export */   useFocus: () => (/* binding */ useFocus),
/* harmony export */   useFocusWithin: () => (/* binding */ useFocusWithin),
/* harmony export */   useFps: () => (/* binding */ useFps),
/* harmony export */   useFullscreen: () => (/* binding */ useFullscreen),
/* harmony export */   useGamepad: () => (/* binding */ useGamepad),
/* harmony export */   useGeolocation: () => (/* binding */ useGeolocation),
/* harmony export */   useIdle: () => (/* binding */ useIdle),
/* harmony export */   useImage: () => (/* binding */ useImage),
/* harmony export */   useInfiniteScroll: () => (/* binding */ useInfiniteScroll),
/* harmony export */   useIntersectionObserver: () => (/* binding */ useIntersectionObserver),
/* harmony export */   useInterval: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useInterval),
/* harmony export */   useIntervalFn: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useIntervalFn),
/* harmony export */   useKeyModifier: () => (/* binding */ useKeyModifier),
/* harmony export */   useLastChanged: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useLastChanged),
/* harmony export */   useLocalStorage: () => (/* binding */ useLocalStorage),
/* harmony export */   useMagicKeys: () => (/* binding */ useMagicKeys),
/* harmony export */   useManualRefHistory: () => (/* binding */ useManualRefHistory),
/* harmony export */   useMediaControls: () => (/* binding */ useMediaControls),
/* harmony export */   useMediaQuery: () => (/* binding */ useMediaQuery),
/* harmony export */   useMemoize: () => (/* binding */ useMemoize),
/* harmony export */   useMemory: () => (/* binding */ useMemory),
/* harmony export */   useMounted: () => (/* binding */ useMounted),
/* harmony export */   useMouse: () => (/* binding */ useMouse),
/* harmony export */   useMouseInElement: () => (/* binding */ useMouseInElement),
/* harmony export */   useMousePressed: () => (/* binding */ useMousePressed),
/* harmony export */   useMutationObserver: () => (/* binding */ useMutationObserver),
/* harmony export */   useNavigatorLanguage: () => (/* binding */ useNavigatorLanguage),
/* harmony export */   useNetwork: () => (/* binding */ useNetwork),
/* harmony export */   useNow: () => (/* binding */ useNow),
/* harmony export */   useObjectUrl: () => (/* binding */ useObjectUrl),
/* harmony export */   useOffsetPagination: () => (/* binding */ useOffsetPagination),
/* harmony export */   useOnline: () => (/* binding */ useOnline),
/* harmony export */   usePageLeave: () => (/* binding */ usePageLeave),
/* harmony export */   useParallax: () => (/* binding */ useParallax),
/* harmony export */   useParentElement: () => (/* binding */ useParentElement),
/* harmony export */   usePerformanceObserver: () => (/* binding */ usePerformanceObserver),
/* harmony export */   usePermission: () => (/* binding */ usePermission),
/* harmony export */   usePointer: () => (/* binding */ usePointer),
/* harmony export */   usePointerLock: () => (/* binding */ usePointerLock),
/* harmony export */   usePointerSwipe: () => (/* binding */ usePointerSwipe),
/* harmony export */   usePreferredColorScheme: () => (/* binding */ usePreferredColorScheme),
/* harmony export */   usePreferredContrast: () => (/* binding */ usePreferredContrast),
/* harmony export */   usePreferredDark: () => (/* binding */ usePreferredDark),
/* harmony export */   usePreferredLanguages: () => (/* binding */ usePreferredLanguages),
/* harmony export */   usePreferredReducedMotion: () => (/* binding */ usePreferredReducedMotion),
/* harmony export */   usePrevious: () => (/* binding */ usePrevious),
/* harmony export */   useRafFn: () => (/* binding */ useRafFn),
/* harmony export */   useRefHistory: () => (/* binding */ useRefHistory),
/* harmony export */   useResizeObserver: () => (/* binding */ useResizeObserver),
/* harmony export */   useScreenOrientation: () => (/* binding */ useScreenOrientation),
/* harmony export */   useScreenSafeArea: () => (/* binding */ useScreenSafeArea),
/* harmony export */   useScriptTag: () => (/* binding */ useScriptTag),
/* harmony export */   useScroll: () => (/* binding */ useScroll),
/* harmony export */   useScrollLock: () => (/* binding */ useScrollLock),
/* harmony export */   useSessionStorage: () => (/* binding */ useSessionStorage),
/* harmony export */   useShare: () => (/* binding */ useShare),
/* harmony export */   useSorted: () => (/* binding */ useSorted),
/* harmony export */   useSpeechRecognition: () => (/* binding */ useSpeechRecognition),
/* harmony export */   useSpeechSynthesis: () => (/* binding */ useSpeechSynthesis),
/* harmony export */   useStepper: () => (/* binding */ useStepper),
/* harmony export */   useStorage: () => (/* binding */ useStorage),
/* harmony export */   useStorageAsync: () => (/* binding */ useStorageAsync),
/* harmony export */   useStyleTag: () => (/* binding */ useStyleTag),
/* harmony export */   useSupported: () => (/* binding */ useSupported),
/* harmony export */   useSwipe: () => (/* binding */ useSwipe),
/* harmony export */   useTemplateRefsList: () => (/* binding */ useTemplateRefsList),
/* harmony export */   useTextDirection: () => (/* binding */ useTextDirection),
/* harmony export */   useTextSelection: () => (/* binding */ useTextSelection),
/* harmony export */   useTextareaAutosize: () => (/* binding */ useTextareaAutosize),
/* harmony export */   useThrottle: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useThrottle),
/* harmony export */   useThrottleFn: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useThrottleFn),
/* harmony export */   useThrottledRefHistory: () => (/* binding */ useThrottledRefHistory),
/* harmony export */   useTimeAgo: () => (/* binding */ useTimeAgo),
/* harmony export */   useTimeout: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useTimeout),
/* harmony export */   useTimeoutFn: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useTimeoutFn),
/* harmony export */   useTimeoutPoll: () => (/* binding */ useTimeoutPoll),
/* harmony export */   useTimestamp: () => (/* binding */ useTimestamp),
/* harmony export */   useTitle: () => (/* binding */ useTitle),
/* harmony export */   useToNumber: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useToNumber),
/* harmony export */   useToString: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useToString),
/* harmony export */   useToggle: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useToggle),
/* harmony export */   useTransition: () => (/* binding */ useTransition),
/* harmony export */   useUrlSearchParams: () => (/* binding */ useUrlSearchParams),
/* harmony export */   useUserMedia: () => (/* binding */ useUserMedia),
/* harmony export */   useVModel: () => (/* binding */ useVModel),
/* harmony export */   useVModels: () => (/* binding */ useVModels),
/* harmony export */   useVibrate: () => (/* binding */ useVibrate),
/* harmony export */   useVirtualList: () => (/* binding */ useVirtualList),
/* harmony export */   useWakeLock: () => (/* binding */ useWakeLock),
/* harmony export */   useWebNotification: () => (/* binding */ useWebNotification),
/* harmony export */   useWebSocket: () => (/* binding */ useWebSocket),
/* harmony export */   useWebWorker: () => (/* binding */ useWebWorker),
/* harmony export */   useWebWorkerFn: () => (/* binding */ useWebWorkerFn),
/* harmony export */   useWindowFocus: () => (/* binding */ useWindowFocus),
/* harmony export */   useWindowScroll: () => (/* binding */ useWindowScroll),
/* harmony export */   useWindowSize: () => (/* binding */ useWindowSize),
/* harmony export */   watchArray: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchArray),
/* harmony export */   watchAtMost: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchAtMost),
/* harmony export */   watchDebounced: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchDebounced),
/* harmony export */   watchDeep: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchDeep),
/* harmony export */   watchIgnorable: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchIgnorable),
/* harmony export */   watchImmediate: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchImmediate),
/* harmony export */   watchOnce: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchOnce),
/* harmony export */   watchPausable: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchPausable),
/* harmony export */   watchThrottled: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchThrottled),
/* harmony export */   watchTriggerable: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchTriggerable),
/* harmony export */   watchWithFilter: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchWithFilter),
/* harmony export */   whenever: () => (/* reexport safe */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.whenever)
/* harmony export */ });
/* harmony import */ var _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vueuse/shared */ "./node_modules/@vueuse/shared/index.mjs");
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-demi */ "./node_modules/@vueuse/integrations/node_modules/vue-demi/lib/index.mjs");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");




function computedAsync(evaluationCallback, initialState, optionsOrRef) {
  let options;
  if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(optionsOrRef)) {
    options = {
      evaluating: optionsOrRef
    };
  } else {
    options = optionsOrRef || {};
  }
  const {
    lazy = false,
    evaluating = void 0,
    shallow = true,
    onError = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop
  } = options;
  const started = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(!lazy);
  const current = shallow ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(initialState) : (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialState);
  let counter = 0;
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watchEffect)(async (onInvalidate) => {
    if (!started.value)
      return;
    counter++;
    const counterAtBeginning = counter;
    let hasFinished = false;
    if (evaluating) {
      Promise.resolve().then(() => {
        evaluating.value = true;
      });
    }
    try {
      const result = await evaluationCallback((cancelCallback) => {
        onInvalidate(() => {
          if (evaluating)
            evaluating.value = false;
          if (!hasFinished)
            cancelCallback();
        });
      });
      if (counterAtBeginning === counter)
        current.value = result;
    } catch (e) {
      onError(e);
    } finally {
      if (evaluating && counterAtBeginning === counter)
        evaluating.value = false;
      hasFinished = true;
    }
  });
  if (lazy) {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
      started.value = true;
      return current.value;
    });
  } else {
    return current;
  }
}

function computedInject(key, options, defaultSource, treatDefaultAsFactory) {
  let source = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.inject)(key);
  if (defaultSource)
    source = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.inject)(key, defaultSource);
  if (treatDefaultAsFactory)
    source = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.inject)(key, defaultSource, treatDefaultAsFactory);
  if (typeof options === "function") {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)((ctx) => options(source, ctx));
  } else {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
      get: (ctx) => options.get(source, ctx),
      set: options.set
    });
  }
}

function createReusableTemplate(options = {}) {
  if (!vue_demi__WEBPACK_IMPORTED_MODULE_1__.isVue3 && !vue_demi__WEBPACK_IMPORTED_MODULE_1__.version.startsWith("2.7.")) {
    if (true)
      throw new Error("[VueUse] createReusableTemplate only works in Vue 2.7 or above.");
    return;
  }
  const {
    inheritAttrs = true
  } = options;
  const render = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)();
  const define = /* #__PURE__ */ (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
    setup(_, { slots }) {
      return () => {
        render.value = slots.default;
      };
    }
  });
  const reuse = /* #__PURE__ */ (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
    inheritAttrs,
    setup(_, { attrs, slots }) {
      return () => {
        var _a;
        if (!render.value && "development" !== "production")
          throw new Error("[VueUse] Failed to find the definition of reusable template");
        const vnode = (_a = render.value) == null ? void 0 : _a.call(render, { ...keysToCamelKebabCase(attrs), $slots: slots });
        return inheritAttrs && (vnode == null ? void 0 : vnode.length) === 1 ? vnode[0] : vnode;
      };
    }
  });
  return (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.makeDestructurable)(
    { define, reuse },
    [define, reuse]
  );
}
function keysToCamelKebabCase(obj) {
  const newObj = {};
  for (const key in obj)
    newObj[(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.camelize)(key)] = obj[key];
  return newObj;
}

function createTemplatePromise(options = {}) {
  if (!vue_demi__WEBPACK_IMPORTED_MODULE_1__.isVue3) {
    if (true)
      throw new Error("[VueUse] createTemplatePromise only works in Vue 3 or above.");
    return;
  }
  let index = 0;
  const instances = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  function create(...args) {
    const props = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowReactive)({
      key: index++,
      args,
      promise: void 0,
      resolve: () => {
      },
      reject: () => {
      },
      isResolving: false,
      options
    });
    instances.value.push(props);
    props.promise = new Promise((_resolve, _reject) => {
      props.resolve = (v) => {
        props.isResolving = true;
        return _resolve(v);
      };
      props.reject = _reject;
    }).finally(() => {
      props.promise = void 0;
      const index2 = instances.value.indexOf(props);
      if (index2 !== -1)
        instances.value.splice(index2, 1);
    });
    return props.promise;
  }
  function start(...args) {
    if (options.singleton && instances.value.length > 0)
      return instances.value[0].promise;
    return create(...args);
  }
  const component = /* #__PURE__ */ (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.defineComponent)((_, { slots }) => {
    const renderList = () => instances.value.map((props) => {
      var _a;
      return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.h)(vue_demi__WEBPACK_IMPORTED_MODULE_1__.Fragment, { key: props.key }, (_a = slots.default) == null ? void 0 : _a.call(slots, props));
    });
    if (options.transition)
      return () => (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.h)(vue_demi__WEBPACK_IMPORTED_MODULE_1__.TransitionGroup, options.transition, renderList);
    return renderList;
  });
  component.start = start;
  return component;
}

function createUnrefFn(fn) {
  return function(...args) {
    return fn.apply(this, args.map((i) => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(i)));
  };
}

function unrefElement(elRef) {
  var _a;
  const plain = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}

const defaultWindow = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient ? window : void 0;
const defaultDocument = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient ? window.document : void 0;
const defaultNavigator = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient ? window.navigator : void 0;
const defaultLocation = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient ? window.location : void 0;

function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    () => [unrefElement(target), (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(stop);
  return stop;
}

let _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window)
    return _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop;
  if (_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    Array.from(window.document.body.children).forEach((el) => el.addEventListener("click", _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop));
    window.document.documentElement.addEventListener("click", _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop);
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window, "click", listener, { passive: true, capture }),
    useEventListener(window, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window.document.activeElement))) {
          handler(event);
        }
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}

function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (e.repeat && (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
function onKeyDown(key, handler, options = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: "keydown" });
}
function onKeyPressed(key, handler, options = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: "keypress" });
}
function onKeyUp(key, handler, options = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: "keyup" });
}

const DEFAULT_DELAY = 500;
const DEFAULT_THRESHOLD = 10;
function onLongPress(target, handler, options) {
  var _a, _b;
  const elementRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => unrefElement(target));
  let timeout;
  let posStart;
  let startTimestamp;
  let hasLongPressed = false;
  function clear() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
    posStart = void 0;
    startTimestamp = void 0;
    hasLongPressed = false;
  }
  function onRelease(ev) {
    var _a2, _b2, _c;
    const [_startTimestamp, _posStart, _hasLongPressed] = [startTimestamp, posStart, hasLongPressed];
    clear();
    if (!(options == null ? void 0 : options.onMouseUp) || !_posStart || !_startTimestamp)
      return;
    if (((_a2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _a2.self) && ev.target !== elementRef.value)
      return;
    if ((_b2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _b2.prevent)
      ev.preventDefault();
    if ((_c = options == null ? void 0 : options.modifiers) == null ? void 0 : _c.stop)
      ev.stopPropagation();
    const dx = ev.x - _posStart.x;
    const dy = ev.y - _posStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    options.onMouseUp(ev.timeStamp - _startTimestamp, distance, _hasLongPressed);
  }
  function onDown(ev) {
    var _a2, _b2, _c, _d;
    if (((_a2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _a2.self) && ev.target !== elementRef.value)
      return;
    clear();
    if ((_b2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _b2.prevent)
      ev.preventDefault();
    if ((_c = options == null ? void 0 : options.modifiers) == null ? void 0 : _c.stop)
      ev.stopPropagation();
    posStart = {
      x: ev.x,
      y: ev.y
    };
    startTimestamp = ev.timeStamp;
    timeout = setTimeout(
      () => {
        hasLongPressed = true;
        handler(ev);
      },
      (_d = options == null ? void 0 : options.delay) != null ? _d : DEFAULT_DELAY
    );
  }
  function onMove(ev) {
    var _a2, _b2, _c, _d;
    if (((_a2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _a2.self) && ev.target !== elementRef.value)
      return;
    if (!posStart || (options == null ? void 0 : options.distanceThreshold) === false)
      return;
    if ((_b2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _b2.prevent)
      ev.preventDefault();
    if ((_c = options == null ? void 0 : options.modifiers) == null ? void 0 : _c.stop)
      ev.stopPropagation();
    const dx = ev.x - posStart.x;
    const dy = ev.y - posStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance >= ((_d = options == null ? void 0 : options.distanceThreshold) != null ? _d : DEFAULT_THRESHOLD))
      clear();
  }
  const listenerOptions = {
    capture: (_a = options == null ? void 0 : options.modifiers) == null ? void 0 : _a.capture,
    once: (_b = options == null ? void 0 : options.modifiers) == null ? void 0 : _b.once
  };
  const cleanup = [
    useEventListener(elementRef, "pointerdown", onDown, listenerOptions),
    useEventListener(elementRef, "pointermove", onMove, listenerOptions),
    useEventListener(elementRef, ["pointerup", "pointerleave"], onRelease, listenerOptions)
  ];
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}

function isFocusedElementEditable() {
  const { activeElement, body } = document;
  if (!activeElement)
    return false;
  if (activeElement === body)
    return false;
  switch (activeElement.tagName) {
    case "INPUT":
    case "TEXTAREA":
      return true;
  }
  return activeElement.hasAttribute("contenteditable");
}
function isTypedCharValid({
  keyCode,
  metaKey,
  ctrlKey,
  altKey
}) {
  if (metaKey || ctrlKey || altKey)
    return false;
  if (keyCode >= 48 && keyCode <= 57)
    return true;
  if (keyCode >= 65 && keyCode <= 90)
    return true;
  if (keyCode >= 97 && keyCode <= 122)
    return true;
  return false;
}
function onStartTyping(callback, options = {}) {
  const { document: document2 = defaultDocument } = options;
  const keydown = (event) => {
    !isFocusedElementEditable() && isTypedCharValid(event) && callback(event);
  };
  if (document2)
    useEventListener(document2, "keydown", keydown, { passive: true });
}

function templateRef(key, initialValue = null) {
  const instance = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.getCurrentInstance)();
  let _trigger = () => {
  };
  const element = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.customRef)((track, trigger) => {
    _trigger = trigger;
    return {
      get() {
        var _a, _b;
        track();
        return (_b = (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$refs[key]) != null ? _b : initialValue;
      },
      set() {
      }
    };
  });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(_trigger);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.onUpdated)(_trigger);
  return element;
}

function useMounted() {
  const isMounted = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const instance = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.getCurrentInstance)();
  if (instance) {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.onMounted)(() => {
      isMounted.value = true;
    }, vue_demi__WEBPACK_IMPORTED_MODULE_1__.isVue2 ? void 0 : instance);
  }
  return isMounted;
}

function useSupported(callback) {
  const isMounted = useMounted();
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    isMounted.value;
    return Boolean(callback());
  });
}

function useMutationObserver(target, callback, options = {}) {
  const { window = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window && "MutationObserver" in window);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    const value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    const items = (Array.isArray(value) ? value : [value]).map(unrefElement).filter(_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.notNullish);
    return new Set(items);
  });
  const stopWatch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    cleanup();
    stopWatch();
  };
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}

function useActiveElement(options = {}) {
  var _a;
  const {
    window = defaultWindow,
    deep = true,
    triggerOnRemoval = false
  } = options;
  const document = (_a = options.document) != null ? _a : window == null ? void 0 : window.document;
  const getDeepActiveElement = () => {
    var _a2;
    let element = document == null ? void 0 : document.activeElement;
    if (deep) {
      while (element == null ? void 0 : element.shadowRoot)
        element = (_a2 = element == null ? void 0 : element.shadowRoot) == null ? void 0 : _a2.activeElement;
    }
    return element;
  };
  const activeElement = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const trigger = () => {
    activeElement.value = getDeepActiveElement();
  };
  if (window) {
    useEventListener(window, "blur", (event) => {
      if (event.relatedTarget !== null)
        return;
      trigger();
    }, true);
    useEventListener(window, "focus", trigger, true);
  }
  if (triggerOnRemoval) {
    useMutationObserver(document, (mutations) => {
      mutations.filter((m) => m.removedNodes.length).map((n) => Array.from(n.removedNodes)).flat().forEach((node) => {
        if (node === activeElement.value)
          trigger();
      });
    }, {
      childList: true,
      subtree: true
    });
  }
  trigger();
  return activeElement;
}

function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    fpsLimit = void 0,
    window = defaultWindow
  } = options;
  const isActive = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const intervalLimit = fpsLimit ? 1e3 / fpsLimit : null;
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp) {
    if (!isActive.value || !window)
      return;
    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp;
    const delta = timestamp - previousFrameTimestamp;
    if (intervalLimit && delta < intervalLimit) {
      rafId = window.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp;
    fn({ delta, timestamp });
    rafId = window.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(pause);
  return {
    isActive: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(isActive),
    pause,
    resume
  };
}

function useAnimate(target, keyframes, options) {
  let config;
  let animateOptions;
  if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) {
    config = options;
    animateOptions = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.objectOmit)(options, ["window", "immediate", "commitStyles", "persist", "onReady", "onError"]);
  } else {
    config = { duration: options };
    animateOptions = options;
  }
  const {
    window = defaultWindow,
    immediate = true,
    commitStyles,
    persist,
    playbackRate: _playbackRate = 1,
    onReady,
    onError = (e) => {
      console.error(e);
    }
  } = config;
  const isSupported = useSupported(() => window && HTMLElement && "animate" in HTMLElement.prototype);
  const animate = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(void 0);
  const store = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowReactive)({
    startTime: null,
    currentTime: null,
    timeline: null,
    playbackRate: _playbackRate,
    pending: false,
    playState: immediate ? "idle" : "paused",
    replaceState: "active"
  });
  const pending = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => store.pending);
  const playState = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => store.playState);
  const replaceState = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => store.replaceState);
  const startTime = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return store.startTime;
    },
    set(value) {
      store.startTime = value;
      if (animate.value)
        animate.value.startTime = value;
    }
  });
  const currentTime = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return store.currentTime;
    },
    set(value) {
      store.currentTime = value;
      if (animate.value) {
        animate.value.currentTime = value;
        syncResume();
      }
    }
  });
  const timeline = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return store.timeline;
    },
    set(value) {
      store.timeline = value;
      if (animate.value)
        animate.value.timeline = value;
    }
  });
  const playbackRate = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return store.playbackRate;
    },
    set(value) {
      store.playbackRate = value;
      if (animate.value)
        animate.value.playbackRate = value;
    }
  });
  const play = () => {
    if (animate.value) {
      try {
        animate.value.play();
        syncResume();
      } catch (e) {
        syncPause();
        onError(e);
      }
    } else {
      update();
    }
  };
  const pause = () => {
    var _a;
    try {
      (_a = animate.value) == null ? void 0 : _a.pause();
      syncPause();
    } catch (e) {
      onError(e);
    }
  };
  const reverse = () => {
    var _a;
    !animate.value && update();
    try {
      (_a = animate.value) == null ? void 0 : _a.reverse();
      syncResume();
    } catch (e) {
      syncPause();
      onError(e);
    }
  };
  const finish = () => {
    var _a;
    try {
      (_a = animate.value) == null ? void 0 : _a.finish();
      syncPause();
    } catch (e) {
      onError(e);
    }
  };
  const cancel = () => {
    var _a;
    try {
      (_a = animate.value) == null ? void 0 : _a.cancel();
      syncPause();
    } catch (e) {
      onError(e);
    }
  };
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(() => unrefElement(target), (el) => {
    el && update();
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(() => keyframes, (value) => {
    !animate.value && update();
    if (!unrefElement(target) && animate.value) {
      animate.value.effect = new KeyframeEffect(
        unrefElement(target),
        (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(value),
        animateOptions
      );
    }
  }, { deep: true });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => update(true));
  });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(cancel);
  function update(init) {
    const el = unrefElement(target);
    if (!isSupported.value || !el)
      return;
    if (!animate.value)
      animate.value = el.animate((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(keyframes), animateOptions);
    if (persist)
      animate.value.persist();
    if (_playbackRate !== 1)
      animate.value.playbackRate = _playbackRate;
    if (init && !immediate)
      animate.value.pause();
    else
      syncResume();
    onReady == null ? void 0 : onReady(animate.value);
  }
  useEventListener(animate, ["cancel", "finish", "remove"], syncPause);
  useEventListener(animate, "finish", () => {
    var _a;
    if (commitStyles)
      (_a = animate.value) == null ? void 0 : _a.commitStyles();
  });
  const { resume: resumeRef, pause: pauseRef } = useRafFn(() => {
    if (!animate.value)
      return;
    store.pending = animate.value.pending;
    store.playState = animate.value.playState;
    store.replaceState = animate.value.replaceState;
    store.startTime = animate.value.startTime;
    store.currentTime = animate.value.currentTime;
    store.timeline = animate.value.timeline;
    store.playbackRate = animate.value.playbackRate;
  }, { immediate: false });
  function syncResume() {
    if (isSupported.value)
      resumeRef();
  }
  function syncPause() {
    if (isSupported.value && window)
      window.requestAnimationFrame(pauseRef);
  }
  return {
    isSupported,
    animate,
    // actions
    play,
    pause,
    reverse,
    finish,
    cancel,
    // state
    pending,
    playState,
    replaceState,
    startTime,
    currentTime,
    timeline,
    playbackRate
  };
}

function useAsyncQueue(tasks, options) {
  const {
    interrupt = true,
    onError = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    onFinished = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    signal
  } = options || {};
  const promiseState = {
    aborted: "aborted",
    fulfilled: "fulfilled",
    pending: "pending",
    rejected: "rejected"
  };
  const initialResult = Array.from(Array.from({ length: tasks.length }), () => ({ state: promiseState.pending, data: null }));
  const result = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(initialResult);
  const activeIndex = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(-1);
  if (!tasks || tasks.length === 0) {
    onFinished();
    return {
      activeIndex,
      result
    };
  }
  function updateResult(state, res) {
    activeIndex.value++;
    result[activeIndex.value].data = res;
    result[activeIndex.value].state = state;
  }
  tasks.reduce((prev, curr) => {
    return prev.then((prevRes) => {
      var _a;
      if (signal == null ? void 0 : signal.aborted) {
        updateResult(promiseState.aborted, new Error("aborted"));
        return;
      }
      if (((_a = result[activeIndex.value]) == null ? void 0 : _a.state) === promiseState.rejected && interrupt) {
        onFinished();
        return;
      }
      const done = curr(prevRes).then((currentRes) => {
        updateResult(promiseState.fulfilled, currentRes);
        activeIndex.value === tasks.length - 1 && onFinished();
        return currentRes;
      });
      if (!signal)
        return done;
      return Promise.race([done, whenAborted(signal)]);
    }).catch((e) => {
      if (signal == null ? void 0 : signal.aborted) {
        updateResult(promiseState.aborted, e);
        return e;
      }
      updateResult(promiseState.rejected, e);
      onError();
      return e;
    });
  }, Promise.resolve());
  return {
    activeIndex,
    result
  };
}
function whenAborted(signal) {
  return new Promise((resolve, reject) => {
    const error = new Error("aborted");
    if (signal.aborted)
      reject(error);
    else
      signal.addEventListener("abort", () => reject(error), { once: true });
  });
}

function useAsyncState(promise, initialState, options) {
  const {
    immediate = true,
    delay = 0,
    onError = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    onSuccess = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    resetOnExecute = true,
    shallow = true,
    throwError
  } = options != null ? options : {};
  const state = shallow ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(initialState) : (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialState);
  const isReady = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const isLoading = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(void 0);
  async function execute(delay2 = 0, ...args) {
    if (resetOnExecute)
      state.value = initialState;
    error.value = void 0;
    isReady.value = false;
    isLoading.value = true;
    if (delay2 > 0)
      await (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.promiseTimeout)(delay2);
    const _promise = typeof promise === "function" ? promise(...args) : promise;
    try {
      const data = await _promise;
      state.value = data;
      isReady.value = true;
      onSuccess(data);
    } catch (e) {
      error.value = e;
      onError(e);
      if (throwError)
        throw e;
    } finally {
      isLoading.value = false;
    }
    return state.value;
  }
  if (immediate)
    execute(delay);
  const shell = {
    state,
    isReady,
    isLoading,
    error,
    execute
  };
  function waitUntilIsLoaded() {
    return new Promise((resolve, reject) => {
      (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.until)(isLoading).toBe(false).then(() => resolve(shell)).catch(reject);
    });
  }
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilIsLoaded().then(onFulfilled, onRejected);
    }
  };
}

const defaults = {
  array: (v) => JSON.stringify(v),
  object: (v) => JSON.stringify(v),
  set: (v) => JSON.stringify(Array.from(v)),
  map: (v) => JSON.stringify(Object.fromEntries(v)),
  null: () => ""
};
function getDefaultSerialization(target) {
  if (!target)
    return defaults.null;
  if (target instanceof Map)
    return defaults.map;
  else if (target instanceof Set)
    return defaults.set;
  else if (Array.isArray(target))
    return defaults.array;
  else
    return defaults.object;
}

function useBase64(target, options) {
  const base64 = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("");
  const promise = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  function execute() {
    if (!_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient)
      return;
    promise.value = new Promise((resolve, reject) => {
      try {
        const _target = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
        if (_target == null) {
          resolve("");
        } else if (typeof _target === "string") {
          resolve(blobToBase64(new Blob([_target], { type: "text/plain" })));
        } else if (_target instanceof Blob) {
          resolve(blobToBase64(_target));
        } else if (_target instanceof ArrayBuffer) {
          resolve(window.btoa(String.fromCharCode(...new Uint8Array(_target))));
        } else if (_target instanceof HTMLCanvasElement) {
          resolve(_target.toDataURL(options == null ? void 0 : options.type, options == null ? void 0 : options.quality));
        } else if (_target instanceof HTMLImageElement) {
          const img = _target.cloneNode(false);
          img.crossOrigin = "Anonymous";
          imgLoaded(img).then(() => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL(options == null ? void 0 : options.type, options == null ? void 0 : options.quality));
          }).catch(reject);
        } else if (typeof _target === "object") {
          const _serializeFn = (options == null ? void 0 : options.serializer) || getDefaultSerialization(_target);
          const serialized = _serializeFn(_target);
          return resolve(blobToBase64(new Blob([serialized], { type: "application/json" })));
        } else {
          reject(new Error("target is unsupported types"));
        }
      } catch (error) {
        reject(error);
      }
    });
    promise.value.then((res) => base64.value = res);
    return promise.value;
  }
  if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(target) || typeof target === "function")
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(target, execute, { immediate: true });
  else
    execute();
  return {
    base64,
    promise,
    execute
  };
}
function imgLoaded(img) {
  return new Promise((resolve, reject) => {
    if (!img.complete) {
      img.onload = () => {
        resolve();
      };
      img.onerror = reject;
    } else {
      resolve();
    }
  });
}
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      resolve(e.target.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

function useBattery(options = {}) {
  const { navigator = defaultNavigator } = options;
  const events = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];
  const isSupported = useSupported(() => navigator && "getBattery" in navigator && typeof navigator.getBattery === "function");
  const charging = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const chargingTime = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const dischargingTime = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const level = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(1);
  let battery;
  function updateBatteryInfo() {
    charging.value = this.charging;
    chargingTime.value = this.chargingTime || 0;
    dischargingTime.value = this.dischargingTime || 0;
    level.value = this.level;
  }
  if (isSupported.value) {
    navigator.getBattery().then((_battery) => {
      battery = _battery;
      updateBatteryInfo.call(battery);
      useEventListener(battery, events, updateBatteryInfo, { passive: true });
    });
  }
  return {
    isSupported,
    charging,
    chargingTime,
    dischargingTime,
    level
  };
}

function useBluetooth(options) {
  let {
    acceptAllDevices = false
  } = options || {};
  const {
    filters = void 0,
    optionalServices = void 0,
    navigator = defaultNavigator
  } = options || {};
  const isSupported = useSupported(() => navigator && "bluetooth" in navigator);
  const device = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(void 0);
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(device, () => {
    connectToBluetoothGATTServer();
  });
  async function requestDevice() {
    if (!isSupported.value)
      return;
    error.value = null;
    if (filters && filters.length > 0)
      acceptAllDevices = false;
    try {
      device.value = await (navigator == null ? void 0 : navigator.bluetooth.requestDevice({
        acceptAllDevices,
        filters,
        optionalServices
      }));
    } catch (err) {
      error.value = err;
    }
  }
  const server = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const isConnected = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a;
    return ((_a = server.value) == null ? void 0 : _a.connected) || false;
  });
  async function connectToBluetoothGATTServer() {
    error.value = null;
    if (device.value && device.value.gatt) {
      device.value.addEventListener("gattserverdisconnected", () => {
      });
      try {
        server.value = await device.value.gatt.connect();
      } catch (err) {
        error.value = err;
      }
    }
  }
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
    var _a;
    if (device.value)
      (_a = device.value.gatt) == null ? void 0 : _a.connect();
  });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    var _a;
    if (device.value)
      (_a = device.value.gatt) == null ? void 0 : _a.disconnect();
  });
  return {
    isSupported,
    isConnected,
    // Device:
    device,
    requestDevice,
    // Server:
    server,
    // Errors:
    error
  };
}

function useMediaQuery(query, options = {}) {
  const { window = defaultWindow } = options;
  const isSupported = useSupported(() => window && "matchMedia" in window && typeof window.matchMedia === "function");
  let mediaQuery;
  const matches = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  const cleanup = () => {
    if (!mediaQuery)
      return;
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler);
    else
      mediaQuery.removeListener(handler);
  };
  const stopWatch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watchEffect)(() => {
    if (!isSupported.value)
      return;
    cleanup();
    mediaQuery = window.matchMedia((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(query));
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", handler);
    else
      mediaQuery.addListener(handler);
    matches.value = mediaQuery.matches;
  });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    stopWatch();
    cleanup();
    mediaQuery = void 0;
  });
  return matches;
}

const breakpointsTailwind = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
};
const breakpointsBootstrapV5 = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
const breakpointsVuetifyV2 = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1264,
  xl: 1904
};
const breakpointsVuetifyV3 = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560
};
const breakpointsVuetify = breakpointsVuetifyV2;
const breakpointsAntDesign = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
const breakpointsQuasar = {
  xs: 0,
  sm: 600,
  md: 1024,
  lg: 1440,
  xl: 1920
};
const breakpointsSematic = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop4K: 2560
};
const breakpointsMasterCss = {
  "3xs": 360,
  "2xs": 480,
  "xs": 600,
  "sm": 768,
  "md": 1024,
  "lg": 1280,
  "xl": 1440,
  "2xl": 1600,
  "3xl": 1920,
  "4xl": 2560
};
const breakpointsPrimeFlex = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

function useBreakpoints(breakpoints, options = {}) {
  function getValue(k, delta) {
    let v = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(breakpoints[(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(k)]);
    if (delta != null)
      v = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.increaseWithUnit)(v, delta);
    if (typeof v === "number")
      v = `${v}px`;
    return v;
  }
  const { window = defaultWindow, strategy = "min-width" } = options;
  function match(query) {
    if (!window)
      return false;
    return window.matchMedia(query).matches;
  }
  const greaterOrEqual = (k) => {
    return useMediaQuery(() => `(min-width: ${getValue(k)})`, options);
  };
  const smallerOrEqual = (k) => {
    return useMediaQuery(() => `(max-width: ${getValue(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => strategy === "min-width" ? greaterOrEqual(k) : smallerOrEqual(k),
      enumerable: true,
      configurable: true
    });
    return shortcuts;
  }, {});
  function current() {
    const points = Object.keys(breakpoints).map((i) => [i, greaterOrEqual(i)]);
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => points.filter(([, v]) => v.value).map(([k]) => k));
  }
  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater(k) {
      return useMediaQuery(() => `(min-width: ${getValue(k, 0.1)})`, options);
    },
    smaller(k) {
      return useMediaQuery(() => `(max-width: ${getValue(k, -0.1)})`, options);
    },
    between(a, b) {
      return useMediaQuery(() => `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`, options);
    },
    isGreater(k) {
      return match(`(min-width: ${getValue(k, 0.1)})`);
    },
    isGreaterOrEqual(k) {
      return match(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k) {
      return match(`(max-width: ${getValue(k, -0.1)})`);
    },
    isSmallerOrEqual(k) {
      return match(`(max-width: ${getValue(k)})`);
    },
    isInBetween(a, b) {
      return match(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
    },
    current,
    active() {
      const bps = current();
      return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => bps.value.length === 0 ? "" : bps.value.at(-1));
    }
  });
}

function useBroadcastChannel(options) {
  const {
    name,
    window = defaultWindow
  } = options;
  const isSupported = useSupported(() => window && "BroadcastChannel" in window);
  const isClosed = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const channel = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const data = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  const post = (data2) => {
    if (channel.value)
      channel.value.postMessage(data2);
  };
  const close = () => {
    if (channel.value)
      channel.value.close();
    isClosed.value = true;
  };
  if (isSupported.value) {
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
      error.value = null;
      channel.value = new BroadcastChannel(name);
      channel.value.addEventListener("message", (e) => {
        data.value = e.data;
      }, { passive: true });
      channel.value.addEventListener("messageerror", (e) => {
        error.value = e;
      }, { passive: true });
      channel.value.addEventListener("close", () => {
        isClosed.value = true;
      });
    });
  }
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    close();
  });
  return {
    isSupported,
    channel,
    data,
    post,
    close,
    error,
    isClosed
  };
}

const WRITABLE_PROPERTIES = [
  "hash",
  "host",
  "hostname",
  "href",
  "pathname",
  "port",
  "protocol",
  "search"
];
function useBrowserLocation(options = {}) {
  const { window = defaultWindow } = options;
  const refs = Object.fromEntries(
    WRITABLE_PROPERTIES.map((key) => [key, (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)()])
  );
  for (const [key, ref2] of (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.objectEntries)(refs)) {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(ref2, (value) => {
      if (!(window == null ? void 0 : window.location) || window.location[key] === value)
        return;
      window.location[key] = value;
    });
  }
  const buildState = (trigger) => {
    var _a;
    const { state: state2, length } = (window == null ? void 0 : window.history) || {};
    const { origin } = (window == null ? void 0 : window.location) || {};
    for (const key of WRITABLE_PROPERTIES)
      refs[key].value = (_a = window == null ? void 0 : window.location) == null ? void 0 : _a[key];
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({
      trigger,
      state: state2,
      length,
      origin,
      ...refs
    });
  };
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(buildState("load"));
  if (window) {
    useEventListener(window, "popstate", () => state.value = buildState("popstate"), { passive: true });
    useEventListener(window, "hashchange", () => state.value = buildState("hashchange"), { passive: true });
  }
  return state;
}

function useCached(refValue, comparator = (a, b) => a === b, watchOptions) {
  const cachedValue = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(refValue.value);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(() => refValue.value, (value) => {
    if (!comparator(value, cachedValue.value))
      cachedValue.value = value;
  }, watchOptions);
  return cachedValue;
}

function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator && "permissions" in navigator);
  let permissionStatus;
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const onChange = () => {
    if (permissionStatus)
      state.value = permissionStatus.state;
  };
  const query = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createSingletonPromise)(async () => {
    if (!isSupported.value)
      return;
    if (!permissionStatus) {
      try {
        permissionStatus = await navigator.permissions.query(desc);
        useEventListener(permissionStatus, "change", onChange);
        onChange();
      } catch (e) {
        state.value = "prompt";
      }
    }
    return permissionStatus;
  });
  query();
  if (controls) {
    return {
      state,
      isSupported,
      query
    };
  } else {
    return state;
  }
}

function useClipboard(options = {}) {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const isClipboardApiSupported = useSupported(() => navigator && "clipboard" in navigator);
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const isSupported = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => isClipboardApiSupported.value || legacy);
  const text = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("");
  const copied = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const timeout = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useTimeoutFn)(() => copied.value = false, copiedDuring);
  function updateText() {
    if (isClipboardApiSupported.value && isAllowed(permissionRead.value)) {
      navigator.clipboard.readText().then((value) => {
        text.value = value;
      });
    } else {
      text.value = legacyRead();
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateText);
  async function copy(value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source)) {
    if (isSupported.value && value != null) {
      if (isClipboardApiSupported.value && isAllowed(permissionWrite.value))
        await navigator.clipboard.writeText(value);
      else
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = document.createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a, _b, _c;
    return (_c = (_b = (_a = document == null ? void 0 : document.getSelection) == null ? void 0 : _a.call(document)) == null ? void 0 : _b.toString()) != null ? _c : "";
  }
  function isAllowed(status) {
    return status === "granted" || status === "prompt";
  }
  return {
    isSupported,
    text,
    copied,
    copy
  };
}

function useClipboardItems(options = {}) {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500
  } = options;
  const isSupported = useSupported(() => navigator && "clipboard" in navigator);
  const content = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const copied = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const timeout = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useTimeoutFn)(() => copied.value = false, copiedDuring);
  function updateContent() {
    if (isSupported.value) {
      navigator.clipboard.read().then((items) => {
        content.value = items;
      });
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateContent);
  async function copy(value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source)) {
    if (isSupported.value && value != null) {
      await navigator.clipboard.write(value);
      content.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  return {
    isSupported,
    content,
    copied,
    copy
  };
}

function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
function useCloned(source, options = {}) {
  const cloned = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)({});
  const {
    manual,
    clone = cloneFnJSON,
    // watch options
    deep = true,
    immediate = true
  } = options;
  function sync() {
    cloned.value = clone((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source));
  }
  if (!manual && ((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(source) || typeof source === "function")) {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(source, sync, {
      ...options,
      deep,
      immediate
    });
  } else {
    sync();
  }
  return { cloned, sync };
}

const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
const handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function setSSRHandler(key, fn) {
  handlers[key] = fn;
}

function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}

const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
const customStorageEventName = "vueuse-storage";
function useStorage(key, defaults, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    },
    initOnMounted
  } = options;
  const data = (shallow ? vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef : vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(typeof defaults === "function" ? defaults() : defaults);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(defaults);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.pausableWatch)(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  );
  if (window && listenToStorageChanges) {
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
      useEventListener(window, "storage", update);
      useEventListener(window, customStorageEventName, updateFromCustomEvent);
      if (initOnMounted)
        update();
    });
  }
  if (!initOnMounted)
    update();
  function dispatchWriteEvent(oldValue, newValue) {
    if (window) {
      window.dispatchEvent(new CustomEvent(customStorageEventName, {
        detail: {
          key,
          oldValue,
          newValue,
          storageArea: storage
        }
      }));
    }
  }
  function write(v) {
    try {
      const oldValue = storage.getItem(key);
      if (v == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event)
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.nextTick)(resumeWatch);
      else
        resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}

function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}

function useColorMode(options = {}) {
  const {
    selector = "html",
    attribute = "class",
    initialValue = "auto",
    window = defaultWindow,
    storage,
    storageKey = "vueuse-color-scheme",
    listenToStorageChanges = true,
    storageRef,
    emitAuto,
    disableTransition = true
  } = options;
  const modes = {
    auto: "",
    light: "light",
    dark: "dark",
    ...options.modes || {}
  };
  const preferredDark = usePreferredDark({ window });
  const system = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => preferredDark.value ? "dark" : "light");
  const store = storageRef || (storageKey == null ? (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(initialValue) : useStorage(storageKey, initialValue, storage, { window, listenToStorageChanges }));
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => store.value === "auto" ? system.value : store.value);
  const updateHTMLAttrs = getSSRHandler(
    "updateHTMLAttrs",
    (selector2, attribute2, value) => {
      const el = typeof selector2 === "string" ? window == null ? void 0 : window.document.querySelector(selector2) : unrefElement(selector2);
      if (!el)
        return;
      let style;
      if (disableTransition) {
        style = window.document.createElement("style");
        const styleString = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
        style.appendChild(document.createTextNode(styleString));
        window.document.head.appendChild(style);
      }
      if (attribute2 === "class") {
        const current = value.split(/\s/g);
        Object.values(modes).flatMap((i) => (i || "").split(/\s/g)).filter(Boolean).forEach((v) => {
          if (current.includes(v))
            el.classList.add(v);
          else
            el.classList.remove(v);
        });
      } else {
        el.setAttribute(attribute2, value);
      }
      if (disableTransition) {
        window.getComputedStyle(style).opacity;
        document.head.removeChild(style);
      }
    }
  );
  function defaultOnChanged(mode) {
    var _a;
    updateHTMLAttrs(selector, attribute, (_a = modes[mode]) != null ? _a : mode);
  }
  function onChanged(mode) {
    if (options.onChanged)
      options.onChanged(mode, defaultOnChanged);
    else
      defaultOnChanged(mode);
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(state, onChanged, { flush: "post", immediate: true });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => onChanged(state.value));
  const auto = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return emitAuto ? store.value : state.value;
    },
    set(v) {
      store.value = v;
    }
  });
  try {
    return Object.assign(auto, { store, system, state });
  } catch (e) {
    return auto;
  }
}

function useConfirmDialog(revealed = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false)) {
  const confirmHook = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const cancelHook = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const revealHook = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  let _resolve = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop;
  const reveal = (data) => {
    revealHook.trigger(data);
    revealed.value = true;
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  };
  const confirm = (data) => {
    revealed.value = false;
    confirmHook.trigger(data);
    _resolve({ data, isCanceled: false });
  };
  const cancel = (data) => {
    revealed.value = false;
    cancelHook.trigger(data);
    _resolve({ data, isCanceled: true });
  };
  return {
    isRevealed: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => revealed.value),
    reveal,
    confirm,
    cancel,
    onReveal: revealHook.on,
    onConfirm: confirmHook.on,
    onCancel: cancelHook.on
  };
}

function useCssVar(prop, target, options = {}) {
  const { window = defaultWindow, initialValue = "", observe = false } = options;
  const variable = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialValue);
  const elRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a;
    return unrefElement(target) || ((_a = window == null ? void 0 : window.document) == null ? void 0 : _a.documentElement);
  });
  function updateCssVar() {
    var _a;
    const key = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(prop);
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(elRef);
    if (el && window) {
      const value = (_a = window.getComputedStyle(el).getPropertyValue(key)) == null ? void 0 : _a.trim();
      variable.value = value || initialValue;
    }
  }
  if (observe) {
    useMutationObserver(elRef, updateCssVar, {
      attributeFilter: ["style", "class"],
      window
    });
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    [elRef, () => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(prop)],
    updateCssVar,
    { immediate: true }
  );
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    variable,
    (val) => {
      var _a;
      if ((_a = elRef.value) == null ? void 0 : _a.style)
        elRef.value.style.setProperty((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(prop), val);
    }
  );
  return variable;
}

function useCurrentElement(rootComponent) {
  const vm = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.getCurrentInstance)();
  const currentElement = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.computedWithControl)(
    () => null,
    () => rootComponent ? unrefElement(rootComponent) : vm.proxy.$el
  );
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.onUpdated)(currentElement.trigger);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.onMounted)(currentElement.trigger);
  return currentElement;
}

function useCycleList(list, options) {
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(getInitialValue());
  const listRef = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(list);
  const index = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      var _a;
      const targetList = listRef.value;
      let index2 = (options == null ? void 0 : options.getIndexOf) ? options.getIndexOf(state.value, targetList) : targetList.indexOf(state.value);
      if (index2 < 0)
        index2 = (_a = options == null ? void 0 : options.fallbackIndex) != null ? _a : 0;
      return index2;
    },
    set(v) {
      set(v);
    }
  });
  function set(i) {
    const targetList = listRef.value;
    const length = targetList.length;
    const index2 = (i % length + length) % length;
    const value = targetList[index2];
    state.value = value;
    return value;
  }
  function shift(delta = 1) {
    return set(index.value + delta);
  }
  function next(n = 1) {
    return shift(n);
  }
  function prev(n = 1) {
    return shift(-n);
  }
  function getInitialValue() {
    var _a, _b;
    return (_b = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)((_a = options == null ? void 0 : options.initialValue) != null ? _a : (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(list)[0])) != null ? _b : void 0;
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(listRef, () => set(index.value));
  return {
    state,
    index,
    next,
    prev,
    go: set
  };
}

function useDark(options = {}) {
  const {
    valueDark = "dark",
    valueLight = "",
    window = defaultWindow
  } = options;
  const mode = useColorMode({
    ...options,
    onChanged: (mode2, defaultHandler) => {
      var _a;
      if (options.onChanged)
        (_a = options.onChanged) == null ? void 0 : _a.call(options, mode2 === "dark", defaultHandler, mode2);
      else
        defaultHandler(mode2);
    },
    modes: {
      dark: valueDark,
      light: valueLight
    }
  });
  const system = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (mode.system) {
      return mode.system.value;
    } else {
      const preferredDark = usePreferredDark({ window });
      return preferredDark.value ? "dark" : "light";
    }
  });
  const isDark = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return mode.value === "dark";
    },
    set(v) {
      const modeVal = v ? "dark" : "light";
      if (system.value === modeVal)
        mode.value = "auto";
      else
        mode.value = modeVal;
    }
  });
  return isDark;
}

function fnBypass(v) {
  return v;
}
function fnSetSource(source, value) {
  return source.value = value;
}
function defaultDump(clone) {
  return clone ? typeof clone === "function" ? clone : cloneFnJSON : fnBypass;
}
function defaultParse(clone) {
  return clone ? typeof clone === "function" ? clone : cloneFnJSON : fnBypass;
}
function useManualRefHistory(source, options = {}) {
  const {
    clone = false,
    dump = defaultDump(clone),
    parse = defaultParse(clone),
    setSource = fnSetSource
  } = options;
  function _createHistoryRecord() {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.markRaw)({
      snapshot: dump(source.value),
      timestamp: (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.timestamp)()
    });
  }
  const last = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(_createHistoryRecord());
  const undoStack = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const redoStack = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const _setSource = (record) => {
    setSource(source, parse(record.snapshot));
    last.value = record;
  };
  const commit = () => {
    undoStack.value.unshift(last.value);
    last.value = _createHistoryRecord();
    if (options.capacity && undoStack.value.length > options.capacity)
      undoStack.value.splice(options.capacity, Number.POSITIVE_INFINITY);
    if (redoStack.value.length)
      redoStack.value.splice(0, redoStack.value.length);
  };
  const clear = () => {
    undoStack.value.splice(0, undoStack.value.length);
    redoStack.value.splice(0, redoStack.value.length);
  };
  const undo = () => {
    const state = undoStack.value.shift();
    if (state) {
      redoStack.value.unshift(last.value);
      _setSource(state);
    }
  };
  const redo = () => {
    const state = redoStack.value.shift();
    if (state) {
      undoStack.value.unshift(last.value);
      _setSource(state);
    }
  };
  const reset = () => {
    _setSource(last.value);
  };
  const history = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => [last.value, ...undoStack.value]);
  const canUndo = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => undoStack.value.length > 0);
  const canRedo = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => redoStack.value.length > 0);
  return {
    source,
    undoStack,
    redoStack,
    last,
    history,
    canUndo,
    canRedo,
    clear,
    commit,
    reset,
    undo,
    redo
  };
}

function useRefHistory(source, options = {}) {
  const {
    deep = false,
    flush = "pre",
    eventFilter
  } = options;
  const {
    eventFilter: composedFilter,
    pause,
    resume: resumeTracking,
    isActive: isTracking
  } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.pausableFilter)(eventFilter);
  const {
    ignoreUpdates,
    ignorePrevAsyncUpdates,
    stop
  } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchIgnorable)(
    source,
    commit,
    { deep, flush, eventFilter: composedFilter }
  );
  function setSource(source2, value) {
    ignorePrevAsyncUpdates();
    ignoreUpdates(() => {
      source2.value = value;
    });
  }
  const manualHistory = useManualRefHistory(source, { ...options, clone: options.clone || deep, setSource });
  const { clear, commit: manualCommit } = manualHistory;
  function commit() {
    ignorePrevAsyncUpdates();
    manualCommit();
  }
  function resume(commitNow) {
    resumeTracking();
    if (commitNow)
      commit();
  }
  function batch(fn) {
    let canceled = false;
    const cancel = () => canceled = true;
    ignoreUpdates(() => {
      fn(cancel);
    });
    if (!canceled)
      commit();
  }
  function dispose() {
    stop();
    clear();
  }
  return {
    ...manualHistory,
    isTracking,
    pause,
    resume,
    commit,
    batch,
    dispose
  };
}

function useDebouncedRefHistory(source, options = {}) {
  const filter = options.debounce ? (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.debounceFilter)(options.debounce) : void 0;
  const history = useRefHistory(source, { ...options, eventFilter: filter });
  return {
    ...history
  };
}

function useDeviceMotion(options = {}) {
  const {
    window = defaultWindow,
    eventFilter = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.bypassFilter
  } = options;
  const acceleration = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)({ x: null, y: null, z: null });
  const rotationRate = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)({ alpha: null, beta: null, gamma: null });
  const interval = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const accelerationIncludingGravity = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)({
    x: null,
    y: null,
    z: null
  });
  if (window) {
    const onDeviceMotion = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createFilterWrapper)(
      eventFilter,
      (event) => {
        acceleration.value = event.acceleration;
        accelerationIncludingGravity.value = event.accelerationIncludingGravity;
        rotationRate.value = event.rotationRate;
        interval.value = event.interval;
      }
    );
    useEventListener(window, "devicemotion", onDeviceMotion);
  }
  return {
    acceleration,
    accelerationIncludingGravity,
    rotationRate,
    interval
  };
}

function useDeviceOrientation(options = {}) {
  const { window = defaultWindow } = options;
  const isSupported = useSupported(() => window && "DeviceOrientationEvent" in window);
  const isAbsolute = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const alpha = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const beta = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const gamma = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  if (window && isSupported.value) {
    useEventListener(window, "deviceorientation", (event) => {
      isAbsolute.value = event.absolute;
      alpha.value = event.alpha;
      beta.value = event.beta;
      gamma.value = event.gamma;
    });
  }
  return {
    isSupported,
    isAbsolute,
    alpha,
    beta,
    gamma
  };
}

function useDevicePixelRatio(options = {}) {
  const {
    window = defaultWindow
  } = options;
  const pixelRatio = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(1);
  if (window) {
    let observe2 = function() {
      pixelRatio.value = window.devicePixelRatio;
      cleanup2();
      media = window.matchMedia(`(resolution: ${pixelRatio.value}dppx)`);
      media.addEventListener("change", observe2, { once: true });
    }, cleanup2 = function() {
      media == null ? void 0 : media.removeEventListener("change", observe2);
    };
    let media;
    observe2();
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(cleanup2);
  }
  return { pixelRatio };
}

function useDevicesList(options = {}) {
  const {
    navigator = defaultNavigator,
    requestPermissions = false,
    constraints = { audio: true, video: true },
    onUpdated
  } = options;
  const devices = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const videoInputs = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => devices.value.filter((i) => i.kind === "videoinput"));
  const audioInputs = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => devices.value.filter((i) => i.kind === "audioinput"));
  const audioOutputs = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => devices.value.filter((i) => i.kind === "audiooutput"));
  const isSupported = useSupported(() => navigator && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
  const permissionGranted = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  let stream;
  async function update() {
    if (!isSupported.value)
      return;
    devices.value = await navigator.mediaDevices.enumerateDevices();
    onUpdated == null ? void 0 : onUpdated(devices.value);
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
  }
  async function ensurePermissions() {
    if (!isSupported.value)
      return false;
    if (permissionGranted.value)
      return true;
    const { state, query } = usePermission("camera", { controls: true });
    await query();
    if (state.value !== "granted") {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      update();
      permissionGranted.value = true;
    } else {
      permissionGranted.value = true;
    }
    return permissionGranted.value;
  }
  if (isSupported.value) {
    if (requestPermissions)
      ensurePermissions();
    useEventListener(navigator.mediaDevices, "devicechange", update);
    update();
  }
  return {
    devices,
    ensurePermissions,
    permissionGranted,
    videoInputs,
    audioInputs,
    audioOutputs,
    isSupported
  };
}

function useDisplayMedia(options = {}) {
  var _a;
  const enabled = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)((_a = options.enabled) != null ? _a : false);
  const video = options.video;
  const audio = options.audio;
  const { navigator = defaultNavigator } = options;
  const isSupported = useSupported(() => {
    var _a2;
    return (_a2 = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : _a2.getDisplayMedia;
  });
  const constraint = { audio, video };
  const stream = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)();
  async function _start() {
    var _a2;
    if (!isSupported.value || stream.value)
      return;
    stream.value = await navigator.mediaDevices.getDisplayMedia(constraint);
    (_a2 = stream.value) == null ? void 0 : _a2.getTracks().forEach((t) => t.addEventListener("ended", stop));
    return stream.value;
  }
  async function _stop() {
    var _a2;
    (_a2 = stream.value) == null ? void 0 : _a2.getTracks().forEach((t) => t.stop());
    stream.value = void 0;
  }
  function stop() {
    _stop();
    enabled.value = false;
  }
  async function start() {
    await _start();
    if (stream.value)
      enabled.value = true;
    return stream.value;
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    enabled,
    (v) => {
      if (v)
        _start();
      else
        _stop();
    },
    { immediate: true }
  );
  return {
    isSupported,
    stream,
    start,
    stop,
    enabled
  };
}

function useDocumentVisibility(options = {}) {
  const { document = defaultDocument } = options;
  if (!document)
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("visible");
  const visibility = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(document.visibilityState);
  useEventListener(document, "visibilitychange", () => {
    visibility.value = document.visibilityState;
  });
  return visibility;
}

function useDraggable(target, options = {}) {
  var _a, _b;
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = "both",
    draggingElement = defaultWindow,
    containerElement,
    handle: draggingHandle = target
  } = options;
  const position = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(
    (_a = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(initialValue)) != null ? _a : { x: 0, y: 0 }
  );
  const pressedDelta = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const filterEvent = (e) => {
    if (pointerTypes)
      return pointerTypes.includes(e.pointerType);
    return true;
  };
  const handleEvent = (e) => {
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(preventDefault))
      e.preventDefault();
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(stopPropagation))
      e.stopPropagation();
  };
  const start = (e) => {
    var _a2;
    if (e.button !== 0)
      return;
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.disabled) || !filterEvent(e))
      return;
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(exact) && e.target !== (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target))
      return;
    const container = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(containerElement);
    const containerRect = (_a2 = container == null ? void 0 : container.getBoundingClientRect) == null ? void 0 : _a2.call(container);
    const targetRect = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target).getBoundingClientRect();
    const pos = {
      x: e.clientX - (container ? targetRect.left - containerRect.left + container.scrollLeft : targetRect.left),
      y: e.clientY - (container ? targetRect.top - containerRect.top + container.scrollTop : targetRect.top)
    };
    if ((onStart == null ? void 0 : onStart(pos, e)) === false)
      return;
    pressedDelta.value = pos;
    handleEvent(e);
  };
  const move = (e) => {
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.disabled) || !filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    const container = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(containerElement);
    const targetRect = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target).getBoundingClientRect();
    let { x, y } = position.value;
    if (axis === "x" || axis === "both") {
      x = e.clientX - pressedDelta.value.x;
      if (container)
        x = Math.min(Math.max(0, x), container.scrollWidth - targetRect.width);
    }
    if (axis === "y" || axis === "both") {
      y = e.clientY - pressedDelta.value.y;
      if (container)
        y = Math.min(Math.max(0, y), container.scrollHeight - targetRect.height);
    }
    position.value = {
      x,
      y
    };
    onMove == null ? void 0 : onMove(position.value, e);
    handleEvent(e);
  };
  const end = (e) => {
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.disabled) || !filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    pressedDelta.value = void 0;
    onEnd == null ? void 0 : onEnd(position.value, e);
    handleEvent(e);
  };
  if (_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient) {
    const config = { capture: (_b = options.capture) != null ? _b : true };
    useEventListener(draggingHandle, "pointerdown", start, config);
    useEventListener(draggingElement, "pointermove", move, config);
    useEventListener(draggingElement, "pointerup", end, config);
  }
  return {
    ...(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRefs)(position),
    position,
    isDragging: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => !!pressedDelta.value),
    style: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(
      () => `left:${position.value.x}px;top:${position.value.y}px;`
    )
  };
}

function useDropZone(target, options = {}) {
  const isOverDropZone = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const files = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  let counter = 0;
  let isDataTypeIncluded = true;
  if (_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient) {
    const _options = typeof options === "function" ? { onDrop: options } : options;
    const getFiles = (event) => {
      var _a, _b;
      const list = Array.from((_b = (_a = event.dataTransfer) == null ? void 0 : _a.files) != null ? _b : []);
      return files.value = list.length === 0 ? null : list;
    };
    useEventListener(target, "dragenter", (event) => {
      var _a, _b;
      const types = Array.from(((_a = event == null ? void 0 : event.dataTransfer) == null ? void 0 : _a.items) || []).map((i) => i.kind === "file" ? i.type : null).filter(_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.notNullish);
      if (_options.dataTypes && event.dataTransfer) {
        const dataTypes = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.unref)(_options.dataTypes);
        isDataTypeIncluded = typeof dataTypes === "function" ? dataTypes(types) : dataTypes ? dataTypes.some((item) => types.includes(item)) : true;
        if (!isDataTypeIncluded)
          return;
      }
      event.preventDefault();
      counter += 1;
      isOverDropZone.value = true;
      (_b = _options.onEnter) == null ? void 0 : _b.call(_options, getFiles(event), event);
    });
    useEventListener(target, "dragover", (event) => {
      var _a;
      if (!isDataTypeIncluded)
        return;
      event.preventDefault();
      (_a = _options.onOver) == null ? void 0 : _a.call(_options, getFiles(event), event);
    });
    useEventListener(target, "dragleave", (event) => {
      var _a;
      if (!isDataTypeIncluded)
        return;
      event.preventDefault();
      counter -= 1;
      if (counter === 0)
        isOverDropZone.value = false;
      (_a = _options.onLeave) == null ? void 0 : _a.call(_options, getFiles(event), event);
    });
    useEventListener(target, "drop", (event) => {
      var _a;
      event.preventDefault();
      counter = 0;
      isOverDropZone.value = false;
      (_a = _options.onDrop) == null ? void 0 : _a.call(_options, getFiles(event), event);
    });
  }
  return {
    files,
    isOverDropZone
  };
}

function useResizeObserver(target, callback, options = {}) {
  const { window = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported = useSupported(() => window && "ResizeObserver" in window);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]);
  const stopWatch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window) {
        observer = new ResizeObserver(callback);
        for (const _el of els)
          _el && observer.observe(_el, observerOptions);
      }
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    cleanup();
    stopWatch();
  };
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(stop);
  return {
    isSupported,
    stop
  };
}

function useElementBounding(target, options = {}) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true
  } = options;
  const height = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const bottom = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const left = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const right = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const top = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const width = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const x = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const y = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  function update() {
    const el = unrefElement(target);
    if (!el) {
      if (reset) {
        height.value = 0;
        bottom.value = 0;
        left.value = 0;
        right.value = 0;
        top.value = 0;
        width.value = 0;
        x.value = 0;
        y.value = 0;
      }
      return;
    }
    const rect = el.getBoundingClientRect();
    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }
  useResizeObserver(target, update);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(() => unrefElement(target), (ele) => !ele && update());
  useMutationObserver(target, update, {
    attributeFilter: ["style", "class"]
  });
  if (windowScroll)
    useEventListener("scroll", update, { capture: true, passive: true });
  if (windowResize)
    useEventListener("resize", update, { passive: true });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
    if (immediate)
      update();
  });
  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  };
}

function useElementByPoint(options) {
  const {
    x,
    y,
    document = defaultDocument,
    multiple,
    interval = "requestAnimationFrame",
    immediate = true
  } = options;
  const isSupported = useSupported(() => {
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(multiple))
      return document && "elementsFromPoint" in document;
    return document && "elementFromPoint" in document;
  });
  const element = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const cb = () => {
    var _a, _b;
    element.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(multiple) ? (_a = document == null ? void 0 : document.elementsFromPoint((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(x), (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(y))) != null ? _a : [] : (_b = document == null ? void 0 : document.elementFromPoint((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(x), (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(y))) != null ? _b : null;
  };
  const controls = interval === "requestAnimationFrame" ? useRafFn(cb, { immediate }) : (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useIntervalFn)(cb, interval, { immediate });
  return {
    isSupported,
    element,
    ...controls
  };
}

function useElementHover(el, options = {}) {
  const {
    delayEnter = 0,
    delayLeave = 0,
    window = defaultWindow
  } = options;
  const isHovered = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  let timer;
  const toggle = (entering) => {
    const delay = entering ? delayEnter : delayLeave;
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    if (delay)
      timer = setTimeout(() => isHovered.value = entering, delay);
    else
      isHovered.value = entering;
  };
  if (!window)
    return isHovered;
  useEventListener(el, "mouseenter", () => toggle(true), { passive: true });
  useEventListener(el, "mouseleave", () => toggle(false), { passive: true });
  return isHovered;
}

function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window = defaultWindow, box = "content-box" } = options;
  const isSVG = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a, _b;
    return (_b = (_a = unrefElement(target)) == null ? void 0 : _a.namespaceURI) == null ? void 0 : _b.includes("svg");
  });
  const width = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialSize.width);
  const height = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialSize.height);
  const { stop: stop1 } = useResizeObserver(
    target,
    ([entry]) => {
      const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
      if (window && isSVG.value) {
        const $elem = unrefElement(target);
        if ($elem) {
          const rect = $elem.getBoundingClientRect();
          width.value = rect.width;
          height.value = rect.height;
        }
      } else {
        if (boxSize) {
          const formatBoxSize = Array.isArray(boxSize) ? boxSize : [boxSize];
          width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
          height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
        } else {
          width.value = entry.contentRect.width;
          height.value = entry.contentRect.height;
        }
      }
    },
    options
  );
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
    const ele = unrefElement(target);
    if (ele) {
      width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
      height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
    }
  });
  const stop2 = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    () => unrefElement(target),
    (ele) => {
      width.value = ele ? initialSize.width : 0;
      height.value = ele ? initialSize.height : 0;
    }
  );
  function stop() {
    stop1();
    stop2();
  }
  return {
    width,
    height,
    stop
  };
}

function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0.1,
    window = defaultWindow,
    immediate = true
  } = options;
  const isSupported = useSupported(() => window && "IntersectionObserver" in window);
  const targets = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    const _target = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.notNullish);
  });
  let cleanup = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop;
  const isActive = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(immediate);
  const stopWatch = isSupported.value ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    () => [targets.value, unrefElement(root), isActive.value],
    ([targets2, root2]) => {
      cleanup();
      if (!isActive.value)
        return;
      if (!targets2.length)
        return;
      const observer = new IntersectionObserver(
        callback,
        {
          root: unrefElement(root2),
          rootMargin,
          threshold
        }
      );
      targets2.forEach((el) => el && observer.observe(el));
      cleanup = () => {
        observer.disconnect();
        cleanup = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop;
      };
    },
    { immediate, flush: "post" }
  ) : _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop;
  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(stop);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop
  };
}

function useElementVisibility(element, options = {}) {
  const { window = defaultWindow, scrollTarget, threshold = 0 } = options;
  const elementIsVisible = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  useIntersectionObserver(
    element,
    (intersectionObserverEntries) => {
      let isIntersecting = elementIsVisible.value;
      let latestTime = 0;
      for (const entry of intersectionObserverEntries) {
        if (entry.time >= latestTime) {
          latestTime = entry.time;
          isIntersecting = entry.isIntersecting;
        }
      }
      elementIsVisible.value = isIntersecting;
    },
    {
      root: scrollTarget,
      window,
      threshold
    }
  );
  return elementIsVisible;
}

const events = /* @__PURE__ */ new Map();

function useEventBus(key) {
  const scope = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.getCurrentScope)();
  function on(listener) {
    var _a;
    const listeners = events.get(key) || /* @__PURE__ */ new Set();
    listeners.add(listener);
    events.set(key, listeners);
    const _off = () => off(listener);
    (_a = scope == null ? void 0 : scope.cleanups) == null ? void 0 : _a.push(_off);
    return _off;
  }
  function once(listener) {
    function _listener(...args) {
      off(_listener);
      listener(...args);
    }
    return on(_listener);
  }
  function off(listener) {
    const listeners = events.get(key);
    if (!listeners)
      return;
    listeners.delete(listener);
    if (!listeners.size)
      reset();
  }
  function reset() {
    events.delete(key);
  }
  function emit(event, payload) {
    var _a;
    (_a = events.get(key)) == null ? void 0 : _a.forEach((v) => v(event, payload));
  }
  return { on, once, off, emit, reset };
}

function resolveNestedOptions$1(options) {
  if (options === true)
    return {};
  return options;
}
function useEventSource(url, events = [], options = {}) {
  const event = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const data = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const status = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("CONNECTING");
  const eventSource = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  const urlRef = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(url);
  const lastEventId = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  let explicitlyClosed = false;
  let retried = 0;
  const {
    withCredentials = false,
    immediate = true
  } = options;
  const close = () => {
    if (_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient && eventSource.value) {
      eventSource.value.close();
      eventSource.value = null;
      status.value = "CLOSED";
      explicitlyClosed = true;
    }
  };
  const _init = () => {
    if (explicitlyClosed || typeof urlRef.value === "undefined")
      return;
    const es = new EventSource(urlRef.value, { withCredentials });
    status.value = "CONNECTING";
    eventSource.value = es;
    es.onopen = () => {
      status.value = "OPEN";
      error.value = null;
    };
    es.onerror = (e) => {
      status.value = "CLOSED";
      error.value = e;
      if (es.readyState === 2 && !explicitlyClosed && options.autoReconnect) {
        es.close();
        const {
          retries = -1,
          delay = 1e3,
          onFailed
        } = resolveNestedOptions$1(options.autoReconnect);
        retried += 1;
        if (typeof retries === "number" && (retries < 0 || retried < retries))
          setTimeout(_init, delay);
        else if (typeof retries === "function" && retries())
          setTimeout(_init, delay);
        else
          onFailed == null ? void 0 : onFailed();
      }
    };
    es.onmessage = (e) => {
      event.value = null;
      data.value = e.data;
      lastEventId.value = e.lastEventId;
    };
    for (const event_name of events) {
      useEventListener(es, event_name, (e) => {
        event.value = event_name;
        data.value = e.data || null;
      });
    }
  };
  const open = () => {
    if (!_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient)
      return;
    close();
    explicitlyClosed = false;
    retried = 0;
    _init();
  };
  if (immediate)
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(urlRef, open, { immediate: true });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(close);
  return {
    eventSource,
    event,
    data,
    status,
    error,
    open,
    close,
    lastEventId
  };
}

function useEyeDropper(options = {}) {
  const { initialValue = "" } = options;
  const isSupported = useSupported(() => typeof window !== "undefined" && "EyeDropper" in window);
  const sRGBHex = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialValue);
  async function open(openOptions) {
    if (!isSupported.value)
      return;
    const eyeDropper = new window.EyeDropper();
    const result = await eyeDropper.open(openOptions);
    sRGBHex.value = result.sRGBHex;
    return result;
  }
  return { isSupported, sRGBHex, open };
}

function useFavicon(newIcon = null, options = {}) {
  const {
    baseUrl = "",
    rel = "icon",
    document = defaultDocument
  } = options;
  const favicon = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(newIcon);
  const applyIcon = (icon) => {
    const elements = document == null ? void 0 : document.head.querySelectorAll(`link[rel*="${rel}"]`);
    if (!elements || elements.length === 0) {
      const link = document == null ? void 0 : document.createElement("link");
      if (link) {
        link.rel = rel;
        link.href = `${baseUrl}${icon}`;
        link.type = `image/${icon.split(".").pop()}`;
        document == null ? void 0 : document.head.append(link);
      }
      return;
    }
    elements == null ? void 0 : elements.forEach((el) => el.href = `${baseUrl}${icon}`);
  };
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    favicon,
    (i, o) => {
      if (typeof i === "string" && i !== o)
        applyIcon(i);
    },
    { immediate: true }
  );
  return favicon;
}

const payloadMapping = {
  json: "application/json",
  text: "text/plain"
};
function isFetchOptions(obj) {
  return obj && (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.containsProp)(obj, "immediate", "refetch", "initialData", "timeout", "beforeFetch", "afterFetch", "onFetchError", "fetch", "updateDataOnError");
}
const reAbsolute = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;
function isAbsoluteURL(url) {
  return reAbsolute.test(url);
}
function headersToObject(headers) {
  if (typeof Headers !== "undefined" && headers instanceof Headers)
    return Object.fromEntries(headers.entries());
  return headers;
}
function combineCallbacks(combination, ...callbacks) {
  if (combination === "overwrite") {
    return async (ctx) => {
      const callback = callbacks[callbacks.length - 1];
      if (callback)
        return { ...ctx, ...await callback(ctx) };
      return ctx;
    };
  } else {
    return async (ctx) => {
      for (const callback of callbacks) {
        if (callback)
          ctx = { ...ctx, ...await callback(ctx) };
      }
      return ctx;
    };
  }
}
function createFetch(config = {}) {
  const _combination = config.combination || "chain";
  const _options = config.options || {};
  const _fetchOptions = config.fetchOptions || {};
  function useFactoryFetch(url, ...args) {
    const computedUrl = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
      const baseUrl = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(config.baseUrl);
      const targetUrl = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(url);
      return baseUrl && !isAbsoluteURL(targetUrl) ? joinPaths(baseUrl, targetUrl) : targetUrl;
    });
    let options = _options;
    let fetchOptions = _fetchOptions;
    if (args.length > 0) {
      if (isFetchOptions(args[0])) {
        options = {
          ...options,
          ...args[0],
          beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[0].beforeFetch),
          afterFetch: combineCallbacks(_combination, _options.afterFetch, args[0].afterFetch),
          onFetchError: combineCallbacks(_combination, _options.onFetchError, args[0].onFetchError)
        };
      } else {
        fetchOptions = {
          ...fetchOptions,
          ...args[0],
          headers: {
            ...headersToObject(fetchOptions.headers) || {},
            ...headersToObject(args[0].headers) || {}
          }
        };
      }
    }
    if (args.length > 1 && isFetchOptions(args[1])) {
      options = {
        ...options,
        ...args[1],
        beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[1].beforeFetch),
        afterFetch: combineCallbacks(_combination, _options.afterFetch, args[1].afterFetch),
        onFetchError: combineCallbacks(_combination, _options.onFetchError, args[1].onFetchError)
      };
    }
    return useFetch(computedUrl, fetchOptions, options);
  }
  return useFactoryFetch;
}
function useFetch(url, ...args) {
  var _a;
  const supportsAbort = typeof AbortController === "function";
  let fetchOptions = {};
  let options = {
    immediate: true,
    refetch: false,
    timeout: 0,
    updateDataOnError: false
  };
  const config = {
    method: "GET",
    type: "text",
    payload: void 0
  };
  if (args.length > 0) {
    if (isFetchOptions(args[0]))
      options = { ...options, ...args[0] };
    else
      fetchOptions = args[0];
  }
  if (args.length > 1) {
    if (isFetchOptions(args[1]))
      options = { ...options, ...args[1] };
  }
  const {
    fetch = (_a = defaultWindow) == null ? void 0 : _a.fetch,
    initialData,
    timeout
  } = options;
  const responseEvent = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const errorEvent = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const finallyEvent = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const isFinished = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const isFetching = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const aborted = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const statusCode = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const response = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  const data = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(initialData || null);
  const canAbort = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => supportsAbort && isFetching.value);
  let controller;
  let timer;
  const abort = () => {
    if (supportsAbort) {
      controller == null ? void 0 : controller.abort();
      controller = new AbortController();
      controller.signal.onabort = () => aborted.value = true;
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal
      };
    }
  };
  const loading = (isLoading) => {
    isFetching.value = isLoading;
    isFinished.value = !isLoading;
  };
  if (timeout)
    timer = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useTimeoutFn)(abort, timeout, { immediate: false });
  let executeCounter = 0;
  const execute = async (throwOnFailed = false) => {
    var _a2, _b;
    abort();
    loading(true);
    error.value = null;
    statusCode.value = null;
    aborted.value = false;
    executeCounter += 1;
    const currentExecuteCounter = executeCounter;
    const defaultFetchOptions = {
      method: config.method,
      headers: {}
    };
    if (config.payload) {
      const headers = headersToObject(defaultFetchOptions.headers);
      const payload = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(config.payload);
      if (!config.payloadType && payload && Object.getPrototypeOf(payload) === Object.prototype && !(payload instanceof FormData))
        config.payloadType = "json";
      if (config.payloadType)
        headers["Content-Type"] = (_a2 = payloadMapping[config.payloadType]) != null ? _a2 : config.payloadType;
      defaultFetchOptions.body = config.payloadType === "json" ? JSON.stringify(payload) : payload;
    }
    let isCanceled = false;
    const context = {
      url: (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(url),
      options: {
        ...defaultFetchOptions,
        ...fetchOptions
      },
      cancel: () => {
        isCanceled = true;
      }
    };
    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context));
    if (isCanceled || !fetch) {
      loading(false);
      return Promise.resolve(null);
    }
    let responseData = null;
    if (timer)
      timer.start();
    return fetch(
      context.url,
      {
        ...defaultFetchOptions,
        ...context.options,
        headers: {
          ...headersToObject(defaultFetchOptions.headers),
          ...headersToObject((_b = context.options) == null ? void 0 : _b.headers)
        }
      }
    ).then(async (fetchResponse) => {
      response.value = fetchResponse;
      statusCode.value = fetchResponse.status;
      responseData = await fetchResponse.clone()[config.type]();
      if (!fetchResponse.ok) {
        data.value = initialData || null;
        throw new Error(fetchResponse.statusText);
      }
      if (options.afterFetch) {
        ({ data: responseData } = await options.afterFetch({
          data: responseData,
          response: fetchResponse
        }));
      }
      data.value = responseData;
      responseEvent.trigger(fetchResponse);
      return fetchResponse;
    }).catch(async (fetchError) => {
      let errorData = fetchError.message || fetchError.name;
      if (options.onFetchError) {
        ({ error: errorData, data: responseData } = await options.onFetchError({
          data: responseData,
          error: fetchError,
          response: response.value
        }));
      }
      error.value = errorData;
      if (options.updateDataOnError)
        data.value = responseData;
      errorEvent.trigger(fetchError);
      if (throwOnFailed)
        throw fetchError;
      return null;
    }).finally(() => {
      if (currentExecuteCounter === executeCounter)
        loading(false);
      if (timer)
        timer.stop();
      finallyEvent.trigger(null);
    });
  };
  const refetch = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(options.refetch);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    [
      refetch,
      (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(url)
    ],
    ([refetch2]) => refetch2 && execute(),
    { deep: true }
  );
  const shell = {
    isFinished: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(isFinished),
    isFetching: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(isFetching),
    statusCode,
    response,
    error,
    data,
    canAbort,
    aborted,
    abort,
    execute,
    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    // method
    get: setMethod("GET"),
    put: setMethod("PUT"),
    post: setMethod("POST"),
    delete: setMethod("DELETE"),
    patch: setMethod("PATCH"),
    head: setMethod("HEAD"),
    options: setMethod("OPTIONS"),
    // type
    json: setType("json"),
    text: setType("text"),
    blob: setType("blob"),
    arrayBuffer: setType("arrayBuffer"),
    formData: setType("formData")
  };
  function setMethod(method) {
    return (payload, payloadType) => {
      if (!isFetching.value) {
        config.method = method;
        config.payload = payload;
        config.payloadType = payloadType;
        if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(config.payload)) {
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
            [
              refetch,
              (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(config.payload)
            ],
            ([refetch2]) => refetch2 && execute(),
            { deep: true }
          );
        }
        return {
          ...shell,
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        };
      }
      return void 0;
    };
  }
  function waitUntilFinished() {
    return new Promise((resolve, reject) => {
      (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.until)(isFinished).toBe(true).then(() => resolve(shell)).catch((error2) => reject(error2));
    });
  }
  function setType(type) {
    return () => {
      if (!isFetching.value) {
        config.type = type;
        return {
          ...shell,
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        };
      }
      return void 0;
    };
  }
  if (options.immediate)
    Promise.resolve().then(() => execute());
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    }
  };
}
function joinPaths(start, end) {
  if (!start.endsWith("/") && !end.startsWith("/"))
    return `${start}/${end}`;
  return `${start}${end}`;
}

const DEFAULT_OPTIONS = {
  multiple: true,
  accept: "*",
  reset: false,
  directory: false
};
function useFileDialog(options = {}) {
  const {
    document = defaultDocument
  } = options;
  const files = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const { on: onChange, trigger } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  let input;
  if (document) {
    input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      const result = event.target;
      files.value = result.files;
      trigger(files.value);
    };
  }
  const reset = () => {
    files.value = null;
    if (input && input.value) {
      input.value = "";
      trigger(null);
    }
  };
  const open = (localOptions) => {
    if (!input)
      return;
    const _options = {
      ...DEFAULT_OPTIONS,
      ...options,
      ...localOptions
    };
    input.multiple = _options.multiple;
    input.accept = _options.accept;
    input.webkitdirectory = _options.directory;
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(_options, "capture"))
      input.capture = _options.capture;
    if (_options.reset)
      reset();
    input.click();
  };
  return {
    files: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(files),
    open,
    reset,
    onChange
  };
}

function useFileSystemAccess(options = {}) {
  const {
    window: _window = defaultWindow,
    dataType = "Text"
  } = options;
  const window = _window;
  const isSupported = useSupported(() => window && "showSaveFilePicker" in window && "showOpenFilePicker" in window);
  const fileHandle = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const data = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const file = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const fileName = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? void 0 : _a.name) != null ? _b : "";
  });
  const fileMIME = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? void 0 : _a.type) != null ? _b : "";
  });
  const fileSize = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? void 0 : _a.size) != null ? _b : 0;
  });
  const fileLastModified = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a, _b;
    return (_b = (_a = file.value) == null ? void 0 : _a.lastModified) != null ? _b : 0;
  });
  async function open(_options = {}) {
    if (!isSupported.value)
      return;
    const [handle] = await window.showOpenFilePicker({ ...(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options), ..._options });
    fileHandle.value = handle;
    await updateData();
  }
  async function create(_options = {}) {
    if (!isSupported.value)
      return;
    fileHandle.value = await window.showSaveFilePicker({ ...options, ..._options });
    data.value = void 0;
    await updateData();
  }
  async function save(_options = {}) {
    if (!isSupported.value)
      return;
    if (!fileHandle.value)
      return saveAs(_options);
    if (data.value) {
      const writableStream = await fileHandle.value.createWritable();
      await writableStream.write(data.value);
      await writableStream.close();
    }
    await updateFile();
  }
  async function saveAs(_options = {}) {
    if (!isSupported.value)
      return;
    fileHandle.value = await window.showSaveFilePicker({ ...options, ..._options });
    if (data.value) {
      const writableStream = await fileHandle.value.createWritable();
      await writableStream.write(data.value);
      await writableStream.close();
    }
    await updateFile();
  }
  async function updateFile() {
    var _a;
    file.value = await ((_a = fileHandle.value) == null ? void 0 : _a.getFile());
  }
  async function updateData() {
    var _a, _b;
    await updateFile();
    const type = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(dataType);
    if (type === "Text")
      data.value = await ((_a = file.value) == null ? void 0 : _a.text());
    else if (type === "ArrayBuffer")
      data.value = await ((_b = file.value) == null ? void 0 : _b.arrayBuffer());
    else if (type === "Blob")
      data.value = file.value;
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(() => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(dataType), updateData);
  return {
    isSupported,
    data,
    file,
    fileName,
    fileMIME,
    fileSize,
    fileLastModified,
    open,
    create,
    save,
    saveAs,
    updateData
  };
}

function useFocus(target, options = {}) {
  const { initialValue = false, focusVisible = false, preventScroll = false } = options;
  const innerFocused = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const targetElement = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => unrefElement(target));
  useEventListener(targetElement, "focus", (event) => {
    var _a, _b;
    if (!focusVisible || ((_b = (_a = event.target).matches) == null ? void 0 : _b.call(_a, ":focus-visible")))
      innerFocused.value = true;
  });
  useEventListener(targetElement, "blur", () => innerFocused.value = false);
  const focused = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get: () => innerFocused.value,
    set(value) {
      var _a, _b;
      if (!value && innerFocused.value)
        (_a = targetElement.value) == null ? void 0 : _a.blur();
      else if (value && !innerFocused.value)
        (_b = targetElement.value) == null ? void 0 : _b.focus({ preventScroll });
    }
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    targetElement,
    () => {
      focused.value = initialValue;
    },
    { immediate: true, flush: "post" }
  );
  return { focused };
}

function useFocusWithin(target, options = {}) {
  const activeElement = useActiveElement(options);
  const targetElement = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => unrefElement(target));
  const focused = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => targetElement.value && activeElement.value ? targetElement.value.contains(activeElement.value) : false);
  return { focused };
}

function useFps(options) {
  var _a;
  const fps = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  if (typeof performance === "undefined")
    return fps;
  const every = (_a = options == null ? void 0 : options.every) != null ? _a : 10;
  let last = performance.now();
  let ticks = 0;
  useRafFn(() => {
    ticks += 1;
    if (ticks >= every) {
      const now = performance.now();
      const diff = now - last;
      fps.value = Math.round(1e3 / (diff / ticks));
      last = now;
      ticks = 0;
    }
  });
  return fps;
}

const eventHandlers = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "webkitendfullscreen",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
function useFullscreen(target, options = {}) {
  const {
    document = defaultDocument,
    autoExit = false
  } = options;
  const targetRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a;
    return (_a = unrefElement(target)) != null ? _a : document == null ? void 0 : document.querySelector("html");
  });
  const isFullscreen = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const requestMethod = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    return [
      "requestFullscreen",
      "webkitRequestFullscreen",
      "webkitEnterFullscreen",
      "webkitEnterFullScreen",
      "webkitRequestFullScreen",
      "mozRequestFullScreen",
      "msRequestFullscreen"
    ].find((m) => document && m in document || targetRef.value && m in targetRef.value);
  });
  const exitMethod = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    return [
      "exitFullscreen",
      "webkitExitFullscreen",
      "webkitExitFullScreen",
      "webkitCancelFullScreen",
      "mozCancelFullScreen",
      "msExitFullscreen"
    ].find((m) => document && m in document || targetRef.value && m in targetRef.value);
  });
  const fullscreenEnabled = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    return [
      "fullScreen",
      "webkitIsFullScreen",
      "webkitDisplayingFullscreen",
      "mozFullScreen",
      "msFullscreenElement"
    ].find((m) => document && m in document || targetRef.value && m in targetRef.value);
  });
  const fullscreenElementMethod = [
    "fullscreenElement",
    "webkitFullscreenElement",
    "mozFullScreenElement",
    "msFullscreenElement"
  ].find((m) => document && m in document);
  const isSupported = useSupported(() => targetRef.value && document && requestMethod.value !== void 0 && exitMethod.value !== void 0 && fullscreenEnabled.value !== void 0);
  const isCurrentElementFullScreen = () => {
    if (fullscreenElementMethod)
      return (document == null ? void 0 : document[fullscreenElementMethod]) === targetRef.value;
    return false;
  };
  const isElementFullScreen = () => {
    if (fullscreenEnabled.value) {
      if (document && document[fullscreenEnabled.value] != null) {
        return document[fullscreenEnabled.value];
      } else {
        const target2 = targetRef.value;
        if ((target2 == null ? void 0 : target2[fullscreenEnabled.value]) != null) {
          return Boolean(target2[fullscreenEnabled.value]);
        }
      }
    }
    return false;
  };
  async function exit() {
    if (!isSupported.value || !isFullscreen.value)
      return;
    if (exitMethod.value) {
      if ((document == null ? void 0 : document[exitMethod.value]) != null) {
        await document[exitMethod.value]();
      } else {
        const target2 = targetRef.value;
        if ((target2 == null ? void 0 : target2[exitMethod.value]) != null)
          await target2[exitMethod.value]();
      }
    }
    isFullscreen.value = false;
  }
  async function enter() {
    if (!isSupported.value || isFullscreen.value)
      return;
    if (isElementFullScreen())
      await exit();
    const target2 = targetRef.value;
    if (requestMethod.value && (target2 == null ? void 0 : target2[requestMethod.value]) != null) {
      await target2[requestMethod.value]();
      isFullscreen.value = true;
    }
  }
  async function toggle() {
    await (isFullscreen.value ? exit() : enter());
  }
  const handlerCallback = () => {
    const isElementFullScreenValue = isElementFullScreen();
    if (!isElementFullScreenValue || isElementFullScreenValue && isCurrentElementFullScreen())
      isFullscreen.value = isElementFullScreenValue;
  };
  useEventListener(document, eventHandlers, handlerCallback, false);
  useEventListener(() => unrefElement(targetRef), eventHandlers, handlerCallback, false);
  if (autoExit)
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(exit);
  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle
  };
}

function mapGamepadToXbox360Controller(gamepad) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (gamepad.value) {
      return {
        buttons: {
          a: gamepad.value.buttons[0],
          b: gamepad.value.buttons[1],
          x: gamepad.value.buttons[2],
          y: gamepad.value.buttons[3]
        },
        bumper: {
          left: gamepad.value.buttons[4],
          right: gamepad.value.buttons[5]
        },
        triggers: {
          left: gamepad.value.buttons[6],
          right: gamepad.value.buttons[7]
        },
        stick: {
          left: {
            horizontal: gamepad.value.axes[0],
            vertical: gamepad.value.axes[1],
            button: gamepad.value.buttons[10]
          },
          right: {
            horizontal: gamepad.value.axes[2],
            vertical: gamepad.value.axes[3],
            button: gamepad.value.buttons[11]
          }
        },
        dpad: {
          up: gamepad.value.buttons[12],
          down: gamepad.value.buttons[13],
          left: gamepad.value.buttons[14],
          right: gamepad.value.buttons[15]
        },
        back: gamepad.value.buttons[8],
        start: gamepad.value.buttons[9]
      };
    }
    return null;
  });
}
function useGamepad(options = {}) {
  const {
    navigator = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator && "getGamepads" in navigator);
  const gamepads = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const onConnectedHook = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const onDisconnectedHook = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const stateFromGamepad = (gamepad) => {
    const hapticActuators = [];
    const vibrationActuator = "vibrationActuator" in gamepad ? gamepad.vibrationActuator : null;
    if (vibrationActuator)
      hapticActuators.push(vibrationActuator);
    if (gamepad.hapticActuators)
      hapticActuators.push(...gamepad.hapticActuators);
    return {
      id: gamepad.id,
      index: gamepad.index,
      connected: gamepad.connected,
      mapping: gamepad.mapping,
      timestamp: gamepad.timestamp,
      vibrationActuator: gamepad.vibrationActuator,
      hapticActuators,
      axes: gamepad.axes.map((axes) => axes),
      buttons: gamepad.buttons.map((button) => ({ pressed: button.pressed, touched: button.touched, value: button.value }))
    };
  };
  const updateGamepadState = () => {
    const _gamepads = (navigator == null ? void 0 : navigator.getGamepads()) || [];
    for (const gamepad of _gamepads) {
      if (gamepad && gamepads.value[gamepad.index])
        gamepads.value[gamepad.index] = stateFromGamepad(gamepad);
    }
  };
  const { isActive, pause, resume } = useRafFn(updateGamepadState);
  const onGamepadConnected = (gamepad) => {
    if (!gamepads.value.some(({ index }) => index === gamepad.index)) {
      gamepads.value.push(stateFromGamepad(gamepad));
      onConnectedHook.trigger(gamepad.index);
    }
    resume();
  };
  const onGamepadDisconnected = (gamepad) => {
    gamepads.value = gamepads.value.filter((x) => x.index !== gamepad.index);
    onDisconnectedHook.trigger(gamepad.index);
  };
  useEventListener("gamepadconnected", (e) => onGamepadConnected(e.gamepad));
  useEventListener("gamepaddisconnected", (e) => onGamepadDisconnected(e.gamepad));
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
    const _gamepads = (navigator == null ? void 0 : navigator.getGamepads()) || [];
    for (const gamepad of _gamepads) {
      if (gamepad && gamepads.value[gamepad.index])
        onGamepadConnected(gamepad);
    }
  });
  pause();
  return {
    isSupported,
    onConnected: onConnectedHook.on,
    onDisconnected: onDisconnectedHook.on,
    gamepads,
    pause,
    resume,
    isActive
  };
}

function useGeolocation(options = {}) {
  const {
    enableHighAccuracy = true,
    maximumAge = 3e4,
    timeout = 27e3,
    navigator = defaultNavigator,
    immediate = true
  } = options;
  const isSupported = useSupported(() => navigator && "geolocation" in navigator);
  const locatedAt = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(null);
  const coords = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)({
    accuracy: 0,
    latitude: Number.POSITIVE_INFINITY,
    longitude: Number.POSITIVE_INFINITY,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  });
  function updatePosition(position) {
    locatedAt.value = position.timestamp;
    coords.value = position.coords;
    error.value = null;
  }
  let watcher;
  function resume() {
    if (isSupported.value) {
      watcher = navigator.geolocation.watchPosition(
        updatePosition,
        (err) => error.value = err,
        {
          enableHighAccuracy,
          maximumAge,
          timeout
        }
      );
    }
  }
  if (immediate)
    resume();
  function pause() {
    if (watcher && navigator)
      navigator.geolocation.clearWatch(watcher);
  }
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    pause();
  });
  return {
    isSupported,
    coords,
    locatedAt,
    error,
    resume,
    pause
  };
}

const defaultEvents$1 = ["mousemove", "mousedown", "resize", "keydown", "touchstart", "wheel"];
const oneMinute = 6e4;
function useIdle(timeout = oneMinute, options = {}) {
  const {
    initialState = false,
    listenForVisibilityChange = true,
    events = defaultEvents$1,
    window = defaultWindow,
    eventFilter = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.throttleFilter)(50)
  } = options;
  const idle = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialState);
  const lastActive = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.timestamp)());
  let timer;
  const reset = () => {
    idle.value = false;
    clearTimeout(timer);
    timer = setTimeout(() => idle.value = true, timeout);
  };
  const onEvent = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createFilterWrapper)(
    eventFilter,
    () => {
      lastActive.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.timestamp)();
      reset();
    }
  );
  if (window) {
    const document = window.document;
    for (const event of events)
      useEventListener(window, event, onEvent, { passive: true });
    if (listenForVisibilityChange) {
      useEventListener(document, "visibilitychange", () => {
        if (!document.hidden)
          onEvent();
      });
    }
    reset();
  }
  return {
    idle,
    lastActive,
    reset
  };
}

async function loadImage(options) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const { src, srcset, sizes, class: clazz, loading, crossorigin, referrerPolicy } = options;
    img.src = src;
    if (srcset)
      img.srcset = srcset;
    if (sizes)
      img.sizes = sizes;
    if (clazz)
      img.className = clazz;
    if (loading)
      img.loading = loading;
    if (crossorigin)
      img.crossOrigin = crossorigin;
    if (referrerPolicy)
      img.referrerPolicy = referrerPolicy;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
function useImage(options, asyncStateOptions = {}) {
  const state = useAsyncState(
    () => loadImage((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options)),
    void 0,
    {
      resetOnExecute: true,
      ...asyncStateOptions
    }
  );
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    () => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options),
    () => state.execute(asyncStateOptions.delay),
    { deep: true }
  );
  return state;
}

const ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(element, options = {}) {
  const {
    throttle = 0,
    idle = 200,
    onStop = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    onScroll = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions = {
      capture: false,
      passive: true
    },
    behavior = "auto",
    window = defaultWindow,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const internalX = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const internalY = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const x = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return internalX.value;
    },
    set(x2) {
      scrollTo(x2, void 0);
    }
  });
  const y = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return internalY.value;
    },
    set(y2) {
      scrollTo(void 0, y2);
    }
  });
  function scrollTo(_x, _y) {
    var _a, _b, _c, _d;
    if (!window)
      return;
    const _element = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(element);
    if (!_element)
      return;
    (_c = _element instanceof Document ? window.document.body : _element) == null ? void 0 : _c.scrollTo({
      top: (_a = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(_y)) != null ? _a : y.value,
      left: (_b = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(_x)) != null ? _b : x.value,
      behavior: (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(behavior)
    });
    const scrollContainer = ((_d = _element == null ? void 0 : _element.document) == null ? void 0 : _d.documentElement) || (_element == null ? void 0 : _element.documentElement) || _element;
    if (x != null)
      internalX.value = scrollContainer.scrollLeft;
    if (y != null)
      internalY.value = scrollContainer.scrollTop;
  }
  const isScrolling = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const arrivedState = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({
    left: true,
    right: false,
    top: true,
    bottom: false
  });
  const directions = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({
    left: false,
    right: false,
    top: false,
    bottom: false
  });
  const onScrollEnd = (e) => {
    if (!isScrolling.value)
      return;
    isScrolling.value = false;
    directions.left = false;
    directions.right = false;
    directions.top = false;
    directions.bottom = false;
    onStop(e);
  };
  const onScrollEndDebounced = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useDebounceFn)(onScrollEnd, throttle + idle);
  const setArrivedState = (target) => {
    var _a;
    if (!window)
      return;
    const el = ((_a = target == null ? void 0 : target.document) == null ? void 0 : _a.documentElement) || (target == null ? void 0 : target.documentElement) || unrefElement(target);
    const { display, flexDirection } = getComputedStyle(el);
    const scrollLeft = el.scrollLeft;
    directions.left = scrollLeft < internalX.value;
    directions.right = scrollLeft > internalX.value;
    const left = Math.abs(scrollLeft) <= (offset.left || 0);
    const right = Math.abs(scrollLeft) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "row-reverse") {
      arrivedState.left = right;
      arrivedState.right = left;
    } else {
      arrivedState.left = left;
      arrivedState.right = right;
    }
    internalX.value = scrollLeft;
    let scrollTop = el.scrollTop;
    if (target === window.document && !scrollTop)
      scrollTop = window.document.body.scrollTop;
    directions.top = scrollTop < internalY.value;
    directions.bottom = scrollTop > internalY.value;
    const top = Math.abs(scrollTop) <= (offset.top || 0);
    const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "column-reverse") {
      arrivedState.top = bottom;
      arrivedState.bottom = top;
    } else {
      arrivedState.top = top;
      arrivedState.bottom = bottom;
    }
    internalY.value = scrollTop;
  };
  const onScrollHandler = (e) => {
    var _a;
    if (!window)
      return;
    const eventTarget = (_a = e.target.documentElement) != null ? _a : e.target;
    setArrivedState(eventTarget);
    isScrolling.value = true;
    onScrollEndDebounced(e);
    onScroll(e);
  };
  useEventListener(
    element,
    "scroll",
    throttle ? (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useThrottleFn)(onScrollHandler, throttle, true, false) : onScrollHandler,
    eventListenerOptions
  );
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
    try {
      const _element = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(element);
      if (!_element)
        return;
      setArrivedState(_element);
    } catch (e) {
      onError(e);
    }
  });
  useEventListener(
    element,
    "scrollend",
    onScrollEnd,
    eventListenerOptions
  );
  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    measure() {
      const _element = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(element);
      if (window && _element)
        setArrivedState(_element);
    }
  };
}

function resolveElement(el) {
  if (typeof Window !== "undefined" && el instanceof Window)
    return el.document.documentElement;
  if (typeof Document !== "undefined" && el instanceof Document)
    return el.documentElement;
  return el;
}

function useInfiniteScroll(element, onLoadMore, options = {}) {
  var _a;
  const {
    direction = "bottom",
    interval = 100,
    canLoadMore = () => true
  } = options;
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(useScroll(
    element,
    {
      ...options,
      offset: {
        [direction]: (_a = options.distance) != null ? _a : 0,
        ...options.offset
      }
    }
  ));
  const promise = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const isLoading = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => !!promise.value);
  const observedElement = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    return resolveElement((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(element));
  });
  const isElementVisible = useElementVisibility(observedElement);
  function checkAndLoad() {
    state.measure();
    if (!observedElement.value || !isElementVisible.value || !canLoadMore(observedElement.value))
      return;
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } = observedElement.value;
    const isNarrower = direction === "bottom" || direction === "top" ? scrollHeight <= clientHeight : scrollWidth <= clientWidth;
    if (state.arrivedState[direction] || isNarrower) {
      if (!promise.value) {
        promise.value = Promise.all([
          onLoadMore(state),
          new Promise((resolve) => setTimeout(resolve, interval))
        ]).finally(() => {
          promise.value = null;
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => checkAndLoad());
        });
      }
    }
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    () => [state.arrivedState[direction], isElementVisible.value],
    checkAndLoad,
    { immediate: true }
  );
  return {
    isLoading
  };
}

const defaultEvents = ["mousedown", "mouseup", "keydown", "keyup"];
function useKeyModifier(modifier, options = {}) {
  const {
    events = defaultEvents,
    document = defaultDocument,
    initial = null
  } = options;
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initial);
  if (document) {
    events.forEach((listenerEvent) => {
      useEventListener(document, listenerEvent, (evt) => {
        if (typeof evt.getModifierState === "function")
          state.value = evt.getModifierState(modifier);
      });
    });
  }
  return state;
}

function useLocalStorage(key, initialValue, options = {}) {
  const { window = defaultWindow } = options;
  return useStorage(key, initialValue, window == null ? void 0 : window.localStorage, options);
}

const DefaultMagicKeysAliasMap = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};

function useMagicKeys(options = {}) {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop
  } = options;
  const current = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(/* @__PURE__ */ new Set());
  const obj = {
    toJSON() {
      return {};
    },
    current
  };
  const refs = useReactive ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(obj) : obj;
  const metaDeps = /* @__PURE__ */ new Set();
  const usedKeys = /* @__PURE__ */ new Set();
  function setRefs(key, value) {
    if (key in refs) {
      if (useReactive)
        refs[key] = value;
      else
        refs[key].value = value;
    }
  }
  function reset() {
    current.clear();
    for (const key of usedKeys)
      setRefs(key, false);
  }
  function updateRefs(e, value) {
    var _a, _b;
    const key = (_a = e.key) == null ? void 0 : _a.toLowerCase();
    const code = (_b = e.code) == null ? void 0 : _b.toLowerCase();
    const values = [code, key].filter(Boolean);
    if (key) {
      if (value)
        current.add(key);
      else
        current.delete(key);
    }
    for (const key2 of values) {
      usedKeys.add(key2);
      setRefs(key2, value);
    }
    if (key === "meta" && !value) {
      metaDeps.forEach((key2) => {
        current.delete(key2);
        setRefs(key2, false);
      });
      metaDeps.clear();
    } else if (typeof e.getModifierState === "function" && e.getModifierState("Meta") && value) {
      [...current, ...values].forEach((key2) => metaDeps.add(key2));
    }
  }
  useEventListener(target, "keydown", (e) => {
    updateRefs(e, true);
    return onEventFired(e);
  }, { passive });
  useEventListener(target, "keyup", (e) => {
    updateRefs(e, false);
    return onEventFired(e);
  }, { passive });
  useEventListener("blur", reset, { passive: true });
  useEventListener("focus", reset, { passive: true });
  const proxy = new Proxy(
    refs,
    {
      get(target2, prop, rec) {
        if (typeof prop !== "string")
          return Reflect.get(target2, prop, rec);
        prop = prop.toLowerCase();
        if (prop in aliasMap)
          prop = aliasMap[prop];
        if (!(prop in refs)) {
          if (/[+_-]/.test(prop)) {
            const keys = prop.split(/[+_-]/g).map((i) => i.trim());
            refs[prop] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => keys.every((key) => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(proxy[key])));
          } else {
            refs[prop] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
          }
        }
        const r = Reflect.get(target2, prop, rec);
        return useReactive ? (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(r) : r;
      }
    }
  );
  return proxy;
}

function usingElRef(source, cb) {
  if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source))
    cb((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source));
}
function timeRangeToArray(timeRanges) {
  let ranges = [];
  for (let i = 0; i < timeRanges.length; ++i)
    ranges = [...ranges, [timeRanges.start(i), timeRanges.end(i)]];
  return ranges;
}
function tracksToArray(tracks) {
  return Array.from(tracks).map(({ label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }, id) => ({ id, label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }));
}
const defaultOptions = {
  src: "",
  tracks: []
};
function useMediaControls(target, options = {}) {
  target = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(target);
  options = {
    ...defaultOptions,
    ...options
  };
  const {
    document = defaultDocument
  } = options;
  const currentTime = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const duration = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const seeking = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const volume = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(1);
  const waiting = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const ended = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const playing = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const rate = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(1);
  const stalled = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const buffered = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const tracks = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const selectedTrack = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(-1);
  const isPictureInPicture = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const muted = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const supportsPictureInPicture = document && "pictureInPictureEnabled" in document;
  const sourceErrorEvent = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const disableTrack = (track) => {
    usingElRef(target, (el) => {
      if (track) {
        const id = typeof track === "number" ? track : track.id;
        el.textTracks[id].mode = "disabled";
      } else {
        for (let i = 0; i < el.textTracks.length; ++i)
          el.textTracks[i].mode = "disabled";
      }
      selectedTrack.value = -1;
    });
  };
  const enableTrack = (track, disableTracks = true) => {
    usingElRef(target, (el) => {
      const id = typeof track === "number" ? track : track.id;
      if (disableTracks)
        disableTrack();
      el.textTracks[id].mode = "showing";
      selectedTrack.value = id;
    });
  };
  const togglePictureInPicture = () => {
    return new Promise((resolve, reject) => {
      usingElRef(target, async (el) => {
        if (supportsPictureInPicture) {
          if (!isPictureInPicture.value) {
            el.requestPictureInPicture().then(resolve).catch(reject);
          } else {
            document.exitPictureInPicture().then(resolve).catch(reject);
          }
        }
      });
    });
  };
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watchEffect)(() => {
    if (!document)
      return;
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    const src = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.src);
    let sources = [];
    if (!src)
      return;
    if (typeof src === "string")
      sources = [{ src }];
    else if (Array.isArray(src))
      sources = src;
    else if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(src))
      sources = [src];
    el.querySelectorAll("source").forEach((e) => {
      e.removeEventListener("error", sourceErrorEvent.trigger);
      e.remove();
    });
    sources.forEach(({ src: src2, type }) => {
      const source = document.createElement("source");
      source.setAttribute("src", src2);
      source.setAttribute("type", type || "");
      source.addEventListener("error", sourceErrorEvent.trigger);
      el.appendChild(source);
    });
    el.load();
  });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    el.querySelectorAll("source").forEach((e) => e.removeEventListener("error", sourceErrorEvent.trigger));
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)([target, volume], () => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    el.volume = volume.value;
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)([target, muted], () => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    el.muted = muted.value;
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)([target, rate], () => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    el.playbackRate = rate.value;
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watchEffect)(() => {
    if (!document)
      return;
    const textTracks = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.tracks);
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!textTracks || !textTracks.length || !el)
      return;
    el.querySelectorAll("track").forEach((e) => e.remove());
    textTracks.forEach(({ default: isDefault, kind, label, src, srcLang }, i) => {
      const track = document.createElement("track");
      track.default = isDefault || false;
      track.kind = kind;
      track.label = label;
      track.src = src;
      track.srclang = srcLang;
      if (track.default)
        selectedTrack.value = i;
      el.appendChild(track);
    });
  });
  const { ignoreUpdates: ignoreCurrentTimeUpdates } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchIgnorable)(currentTime, (time) => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    el.currentTime = time;
  });
  const { ignoreUpdates: ignorePlayingUpdates } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchIgnorable)(playing, (isPlaying) => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    isPlaying ? el.play() : el.pause();
  });
  useEventListener(target, "timeupdate", () => ignoreCurrentTimeUpdates(() => currentTime.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target).currentTime));
  useEventListener(target, "durationchange", () => duration.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target).duration);
  useEventListener(target, "progress", () => buffered.value = timeRangeToArray((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target).buffered));
  useEventListener(target, "seeking", () => seeking.value = true);
  useEventListener(target, "seeked", () => seeking.value = false);
  useEventListener(target, ["waiting", "loadstart"], () => {
    waiting.value = true;
    ignorePlayingUpdates(() => playing.value = false);
  });
  useEventListener(target, "loadeddata", () => waiting.value = false);
  useEventListener(target, "playing", () => {
    waiting.value = false;
    ended.value = false;
    ignorePlayingUpdates(() => playing.value = true);
  });
  useEventListener(target, "ratechange", () => rate.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target).playbackRate);
  useEventListener(target, "stalled", () => stalled.value = true);
  useEventListener(target, "ended", () => ended.value = true);
  useEventListener(target, "pause", () => ignorePlayingUpdates(() => playing.value = false));
  useEventListener(target, "play", () => ignorePlayingUpdates(() => playing.value = true));
  useEventListener(target, "enterpictureinpicture", () => isPictureInPicture.value = true);
  useEventListener(target, "leavepictureinpicture", () => isPictureInPicture.value = false);
  useEventListener(target, "volumechange", () => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    volume.value = el.volume;
    muted.value = el.muted;
  });
  const listeners = [];
  const stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)([target], () => {
    const el = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(target);
    if (!el)
      return;
    stop();
    listeners[0] = useEventListener(el.textTracks, "addtrack", () => tracks.value = tracksToArray(el.textTracks));
    listeners[1] = useEventListener(el.textTracks, "removetrack", () => tracks.value = tracksToArray(el.textTracks));
    listeners[2] = useEventListener(el.textTracks, "change", () => tracks.value = tracksToArray(el.textTracks));
  });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => listeners.forEach((listener) => listener()));
  return {
    currentTime,
    duration,
    waiting,
    seeking,
    ended,
    stalled,
    buffered,
    playing,
    rate,
    // Volume
    volume,
    muted,
    // Tracks
    tracks,
    selectedTrack,
    enableTrack,
    disableTrack,
    // Picture in Picture
    supportsPictureInPicture,
    togglePictureInPicture,
    isPictureInPicture,
    // Events
    onSourceError: sourceErrorEvent.on
  };
}

function getMapVue2Compat() {
  const data = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowReactive)({});
  return {
    get: (key) => data[key],
    set: (key, value) => (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.set)(data, key, value),
    has: (key) => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(data, key),
    delete: (key) => (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.del)(data, key),
    clear: () => {
      Object.keys(data).forEach((key) => {
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.del)(data, key);
      });
    }
  };
}
function useMemoize(resolver, options) {
  const initCache = () => {
    if (options == null ? void 0 : options.cache)
      return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowReactive)(options.cache);
    if (vue_demi__WEBPACK_IMPORTED_MODULE_1__.isVue2)
      return getMapVue2Compat();
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowReactive)(/* @__PURE__ */ new Map());
  };
  const cache = initCache();
  const generateKey = (...args) => (options == null ? void 0 : options.getKey) ? options.getKey(...args) : JSON.stringify(args);
  const _loadData = (key, ...args) => {
    cache.set(key, resolver(...args));
    return cache.get(key);
  };
  const loadData = (...args) => _loadData(generateKey(...args), ...args);
  const deleteData = (...args) => {
    cache.delete(generateKey(...args));
  };
  const clearData = () => {
    cache.clear();
  };
  const memoized = (...args) => {
    const key = generateKey(...args);
    if (cache.has(key))
      return cache.get(key);
    return _loadData(key, ...args);
  };
  memoized.load = loadData;
  memoized.delete = deleteData;
  memoized.clear = clearData;
  memoized.generateKey = generateKey;
  memoized.cache = cache;
  return memoized;
}

function useMemory(options = {}) {
  const memory = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const isSupported = useSupported(() => typeof performance !== "undefined" && "memory" in performance);
  if (isSupported.value) {
    const { interval = 1e3 } = options;
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useIntervalFn)(() => {
      memory.value = performance.memory;
    }, interval, { immediate: options.immediate, immediateCallback: options.immediateCallback });
  }
  return { isSupported, memory };
}

const UseMouseBuiltinExtractors = {
  page: (event) => [event.pageX, event.pageY],
  client: (event) => [event.clientX, event.clientY],
  screen: (event) => [event.screenX, event.screenY],
  movement: (event) => event instanceof Touch ? null : [event.movementX, event.movementY]
};
function useMouse(options = {}) {
  const {
    type = "page",
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window = defaultWindow,
    target = window,
    scroll = true,
    eventFilter
  } = options;
  let _prevMouseEvent = null;
  const x = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialValue.x);
  const y = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialValue.y);
  const sourceType = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const extractor = typeof type === "function" ? type : UseMouseBuiltinExtractors[type];
  const mouseHandler = (event) => {
    const result = extractor(event);
    _prevMouseEvent = event;
    if (result) {
      [x.value, y.value] = result;
      sourceType.value = "mouse";
    }
  };
  const touchHandler = (event) => {
    if (event.touches.length > 0) {
      const result = extractor(event.touches[0]);
      if (result) {
        [x.value, y.value] = result;
        sourceType.value = "touch";
      }
    }
  };
  const scrollHandler = () => {
    if (!_prevMouseEvent || !window)
      return;
    const pos = extractor(_prevMouseEvent);
    if (_prevMouseEvent instanceof MouseEvent && pos) {
      x.value = pos[0] + window.scrollX;
      y.value = pos[1] + window.scrollY;
    }
  };
  const reset = () => {
    x.value = initialValue.x;
    y.value = initialValue.y;
  };
  const mouseHandlerWrapper = eventFilter ? (event) => eventFilter(() => mouseHandler(event), {}) : (event) => mouseHandler(event);
  const touchHandlerWrapper = eventFilter ? (event) => eventFilter(() => touchHandler(event), {}) : (event) => touchHandler(event);
  const scrollHandlerWrapper = eventFilter ? () => eventFilter(() => scrollHandler(), {}) : () => scrollHandler();
  if (target) {
    const listenerOptions = { passive: true };
    useEventListener(target, ["mousemove", "dragover"], mouseHandlerWrapper, listenerOptions);
    if (touch && type !== "movement") {
      useEventListener(target, ["touchstart", "touchmove"], touchHandlerWrapper, listenerOptions);
      if (resetOnTouchEnds)
        useEventListener(target, "touchend", reset, listenerOptions);
    }
    if (scroll && type === "page")
      useEventListener(window, "scroll", scrollHandlerWrapper, { passive: true });
  }
  return {
    x,
    y,
    sourceType
  };
}

function useMouseInElement(target, options = {}) {
  const {
    handleOutside = true,
    window = defaultWindow
  } = options;
  const type = options.type || "page";
  const { x, y, sourceType } = useMouse(options);
  const targetRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(target != null ? target : window == null ? void 0 : window.document.body);
  const elementX = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const elementY = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const elementPositionX = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const elementPositionY = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const elementHeight = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const elementWidth = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0);
  const isOutside = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(true);
  let stop = () => {
  };
  if (window) {
    stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
      [targetRef, x, y],
      () => {
        const el = unrefElement(targetRef);
        if (!el)
          return;
        const {
          left,
          top,
          width,
          height
        } = el.getBoundingClientRect();
        elementPositionX.value = left + (type === "page" ? window.pageXOffset : 0);
        elementPositionY.value = top + (type === "page" ? window.pageYOffset : 0);
        elementHeight.value = height;
        elementWidth.value = width;
        const elX = x.value - elementPositionX.value;
        const elY = y.value - elementPositionY.value;
        isOutside.value = width === 0 || height === 0 || elX < 0 || elY < 0 || elX > width || elY > height;
        if (handleOutside || !isOutside.value) {
          elementX.value = elX;
          elementY.value = elY;
        }
      },
      { immediate: true }
    );
    useEventListener(document, "mouseleave", () => {
      isOutside.value = true;
    });
  }
  return {
    x,
    y,
    sourceType,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isOutside,
    stop
  };
}

function useMousePressed(options = {}) {
  const {
    touch = true,
    drag = true,
    capture = false,
    initialValue = false,
    window = defaultWindow
  } = options;
  const pressed = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialValue);
  const sourceType = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  if (!window) {
    return {
      pressed,
      sourceType
    };
  }
  const onPressed = (srcType) => () => {
    pressed.value = true;
    sourceType.value = srcType;
  };
  const onReleased = () => {
    pressed.value = false;
    sourceType.value = null;
  };
  const target = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => unrefElement(options.target) || window);
  useEventListener(target, "mousedown", onPressed("mouse"), { passive: true, capture });
  useEventListener(window, "mouseleave", onReleased, { passive: true, capture });
  useEventListener(window, "mouseup", onReleased, { passive: true, capture });
  if (drag) {
    useEventListener(target, "dragstart", onPressed("mouse"), { passive: true, capture });
    useEventListener(window, "drop", onReleased, { passive: true, capture });
    useEventListener(window, "dragend", onReleased, { passive: true, capture });
  }
  if (touch) {
    useEventListener(target, "touchstart", onPressed("touch"), { passive: true, capture });
    useEventListener(window, "touchend", onReleased, { passive: true, capture });
    useEventListener(window, "touchcancel", onReleased, { passive: true, capture });
  }
  return {
    pressed,
    sourceType
  };
}

function useNavigatorLanguage(options = {}) {
  const { window = defaultWindow } = options;
  const navigator = window == null ? void 0 : window.navigator;
  const isSupported = useSupported(() => navigator && "language" in navigator);
  const language = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(navigator == null ? void 0 : navigator.language);
  useEventListener(window, "languagechange", () => {
    if (navigator)
      language.value = navigator.language;
  });
  return {
    isSupported,
    language
  };
}

function useNetwork(options = {}) {
  const { window = defaultWindow } = options;
  const navigator = window == null ? void 0 : window.navigator;
  const isSupported = useSupported(() => navigator && "connection" in navigator);
  const isOnline = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(true);
  const saveData = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const offlineAt = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(void 0);
  const onlineAt = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(void 0);
  const downlink = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(void 0);
  const downlinkMax = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(void 0);
  const rtt = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(void 0);
  const effectiveType = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(void 0);
  const type = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("unknown");
  const connection = isSupported.value && navigator.connection;
  function updateNetworkInformation() {
    if (!navigator)
      return;
    isOnline.value = navigator.onLine;
    offlineAt.value = isOnline.value ? void 0 : Date.now();
    onlineAt.value = isOnline.value ? Date.now() : void 0;
    if (connection) {
      downlink.value = connection.downlink;
      downlinkMax.value = connection.downlinkMax;
      effectiveType.value = connection.effectiveType;
      rtt.value = connection.rtt;
      saveData.value = connection.saveData;
      type.value = connection.type;
    }
  }
  if (window) {
    useEventListener(window, "offline", () => {
      isOnline.value = false;
      offlineAt.value = Date.now();
    });
    useEventListener(window, "online", () => {
      isOnline.value = true;
      onlineAt.value = Date.now();
    });
  }
  if (connection)
    useEventListener(connection, "change", updateNetworkInformation, false);
  updateNetworkInformation();
  return {
    isSupported,
    isOnline,
    saveData,
    offlineAt,
    onlineAt,
    downlink,
    downlinkMax,
    effectiveType,
    rtt,
    type
  };
}

function useNow(options = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame"
  } = options;
  const now = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(/* @__PURE__ */ new Date());
  const update = () => now.value = /* @__PURE__ */ new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate: true }) : (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useIntervalFn)(update, interval, { immediate: true });
  if (exposeControls) {
    return {
      now,
      ...controls
    };
  } else {
    return now;
  }
}

function useObjectUrl(object) {
  const url = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const release = () => {
    if (url.value)
      URL.revokeObjectURL(url.value);
    url.value = void 0;
  };
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    () => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(object),
    (newObject) => {
      release();
      if (newObject)
        url.value = URL.createObjectURL(newObject);
    },
    { immediate: true }
  );
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(release);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(url);
}

function useClamp(value, min, max) {
  if (typeof value === "function" || (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isReadonly)(value))
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.clamp)((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(value), (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(min), (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(max)));
  const _value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(value);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return _value.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.clamp)(_value.value, (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(min), (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(max));
    },
    set(value2) {
      _value.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.clamp)(value2, (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(min), (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(max));
    }
  });
}

function useOffsetPagination(options) {
  const {
    total = Number.POSITIVE_INFINITY,
    pageSize = 10,
    page = 1,
    onPageChange = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    onPageSizeChange = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop,
    onPageCountChange = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop
  } = options;
  const currentPageSize = useClamp(pageSize, 1, Number.POSITIVE_INFINITY);
  const pageCount = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => Math.max(
    1,
    Math.ceil((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(total) / (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(currentPageSize))
  ));
  const currentPage = useClamp(page, 1, pageCount);
  const isFirstPage = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => currentPage.value === 1);
  const isLastPage = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => currentPage.value === pageCount.value);
  if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(page)) {
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.syncRef)(page, currentPage, {
      direction: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isReadonly)(page) ? "ltr" : "both"
    });
  }
  if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(pageSize)) {
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.syncRef)(pageSize, currentPageSize, {
      direction: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isReadonly)(pageSize) ? "ltr" : "both"
    });
  }
  function prev() {
    currentPage.value--;
  }
  function next() {
    currentPage.value++;
  }
  const returnValue = {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next
  };
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(currentPage, () => {
    onPageChange((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(returnValue));
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(currentPageSize, () => {
    onPageSizeChange((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(returnValue));
  });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(pageCount, () => {
    onPageCountChange((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(returnValue));
  });
  return returnValue;
}

function useOnline(options = {}) {
  const { isOnline } = useNetwork(options);
  return isOnline;
}

function usePageLeave(options = {}) {
  const { window = defaultWindow } = options;
  const isLeft = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const handler = (event) => {
    if (!window)
      return;
    event = event || window.event;
    const from = event.relatedTarget || event.toElement;
    isLeft.value = !from;
  };
  if (window) {
    useEventListener(window, "mouseout", handler, { passive: true });
    useEventListener(window.document, "mouseleave", handler, { passive: true });
    useEventListener(window.document, "mouseenter", handler, { passive: true });
  }
  return isLeft;
}

function useScreenOrientation(options = {}) {
  const {
    window = defaultWindow
  } = options;
  const isSupported = useSupported(() => window && "screen" in window && "orientation" in window.screen);
  const screenOrientation = isSupported.value ? window.screen.orientation : {};
  const orientation = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(screenOrientation.type);
  const angle = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(screenOrientation.angle || 0);
  if (isSupported.value) {
    useEventListener(window, "orientationchange", () => {
      orientation.value = screenOrientation.type;
      angle.value = screenOrientation.angle;
    });
  }
  const lockOrientation = (type) => {
    if (isSupported.value && typeof screenOrientation.lock === "function")
      return screenOrientation.lock(type);
    return Promise.reject(new Error("Not supported"));
  };
  const unlockOrientation = () => {
    if (isSupported.value && typeof screenOrientation.unlock === "function")
      screenOrientation.unlock();
  };
  return {
    isSupported,
    orientation,
    angle,
    lockOrientation,
    unlockOrientation
  };
}

function useParallax(target, options = {}) {
  const {
    deviceOrientationTiltAdjust = (i) => i,
    deviceOrientationRollAdjust = (i) => i,
    mouseTiltAdjust = (i) => i,
    mouseRollAdjust = (i) => i,
    window = defaultWindow
  } = options;
  const orientation = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(useDeviceOrientation({ window }));
  const screenOrientation = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(useScreenOrientation({ window }));
  const {
    elementX: x,
    elementY: y,
    elementWidth: width,
    elementHeight: height
  } = useMouseInElement(target, { handleOutside: false, window });
  const source = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (orientation.isSupported && (orientation.alpha != null && orientation.alpha !== 0 || orientation.gamma != null && orientation.gamma !== 0)) {
      return "deviceOrientation";
    }
    return "mouse";
  });
  const roll = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (source.value === "deviceOrientation") {
      let value;
      switch (screenOrientation.orientation) {
        case "landscape-primary":
          value = orientation.gamma / 90;
          break;
        case "landscape-secondary":
          value = -orientation.gamma / 90;
          break;
        case "portrait-primary":
          value = -orientation.beta / 90;
          break;
        case "portrait-secondary":
          value = orientation.beta / 90;
          break;
        default:
          value = -orientation.beta / 90;
      }
      return deviceOrientationRollAdjust(value);
    } else {
      const value = -(y.value - height.value / 2) / height.value;
      return mouseRollAdjust(value);
    }
  });
  const tilt = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (source.value === "deviceOrientation") {
      let value;
      switch (screenOrientation.orientation) {
        case "landscape-primary":
          value = orientation.beta / 90;
          break;
        case "landscape-secondary":
          value = -orientation.beta / 90;
          break;
        case "portrait-primary":
          value = orientation.gamma / 90;
          break;
        case "portrait-secondary":
          value = -orientation.gamma / 90;
          break;
        default:
          value = orientation.gamma / 90;
      }
      return deviceOrientationTiltAdjust(value);
    } else {
      const value = (x.value - width.value / 2) / width.value;
      return mouseTiltAdjust(value);
    }
  });
  return { roll, tilt, source };
}

function useParentElement(element = useCurrentElement()) {
  const parentElement = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)();
  const update = () => {
    const el = unrefElement(element);
    if (el)
      parentElement.value = el.parentElement;
  };
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(update);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(() => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(element), update);
  return parentElement;
}

function usePerformanceObserver(options, callback) {
  const {
    window = defaultWindow,
    immediate = true,
    ...performanceOptions
  } = options;
  const isSupported = useSupported(() => window && "PerformanceObserver" in window);
  let observer;
  const stop = () => {
    observer == null ? void 0 : observer.disconnect();
  };
  const start = () => {
    if (isSupported.value) {
      stop();
      observer = new PerformanceObserver(callback);
      observer.observe(performanceOptions);
    }
  };
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(stop);
  if (immediate)
    start();
  return {
    isSupported,
    start,
    stop
  };
}

const defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
const keys = /* @__PURE__ */ Object.keys(defaultState);
function usePointer(options = {}) {
  const {
    target = defaultWindow
  } = options;
  const isInside = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(options.initialValue || {});
  Object.assign(state.value, defaultState, state.value);
  const handler = (event) => {
    isInside.value = true;
    if (options.pointerTypes && !options.pointerTypes.includes(event.pointerType))
      return;
    state.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.objectPick)(event, keys, false);
  };
  if (target) {
    const listenerOptions = { passive: true };
    useEventListener(target, ["pointerdown", "pointermove", "pointerup"], handler, listenerOptions);
    useEventListener(target, "pointerleave", () => isInside.value = false, listenerOptions);
  }
  return {
    ...(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRefs)(state),
    isInside
  };
}

function usePointerLock(target, options = {}) {
  const { document = defaultDocument } = options;
  const isSupported = useSupported(() => document && "pointerLockElement" in document);
  const element = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const triggerElement = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  let targetElement;
  if (isSupported.value) {
    useEventListener(document, "pointerlockchange", () => {
      var _a;
      const currentElement = (_a = document.pointerLockElement) != null ? _a : element.value;
      if (targetElement && currentElement === targetElement) {
        element.value = document.pointerLockElement;
        if (!element.value)
          targetElement = triggerElement.value = null;
      }
    });
    useEventListener(document, "pointerlockerror", () => {
      var _a;
      const currentElement = (_a = document.pointerLockElement) != null ? _a : element.value;
      if (targetElement && currentElement === targetElement) {
        const action = document.pointerLockElement ? "release" : "acquire";
        throw new Error(`Failed to ${action} pointer lock.`);
      }
    });
  }
  async function lock(e) {
    var _a;
    if (!isSupported.value)
      throw new Error("Pointer Lock API is not supported by your browser.");
    triggerElement.value = e instanceof Event ? e.currentTarget : null;
    targetElement = e instanceof Event ? (_a = unrefElement(target)) != null ? _a : triggerElement.value : unrefElement(e);
    if (!targetElement)
      throw new Error("Target element undefined.");
    targetElement.requestPointerLock();
    return await (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.until)(element).toBe(targetElement);
  }
  async function unlock() {
    if (!element.value)
      return false;
    document.exitPointerLock();
    await (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.until)(element).toBeNull();
    return true;
  }
  return {
    isSupported,
    element,
    triggerElement,
    lock,
    unlock
  };
}

function usePointerSwipe(target, options = {}) {
  const targetRef = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(target);
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart,
    disableTextSelect = false
  } = options;
  const posStart = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({ x: 0, y: 0 });
  const updatePosStart = (x, y) => {
    posStart.x = x;
    posStart.y = y;
  };
  const posEnd = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({ x: 0, y: 0 });
  const updatePosEnd = (x, y) => {
    posEnd.x = x;
    posEnd.y = y;
  };
  const distanceX = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => posStart.x - posEnd.x);
  const distanceY = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => posStart.y - posEnd.y);
  const { max, abs } = Math;
  const isThresholdExceeded = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => max(abs(distanceX.value), abs(distanceY.value)) >= threshold);
  const isSwiping = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const isPointerDown = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const direction = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (!isThresholdExceeded.value)
      return "none";
    if (abs(distanceX.value) > abs(distanceY.value)) {
      return distanceX.value > 0 ? "left" : "right";
    } else {
      return distanceY.value > 0 ? "up" : "down";
    }
  });
  const eventIsAllowed = (e) => {
    var _a, _b, _c;
    const isReleasingButton = e.buttons === 0;
    const isPrimaryButton = e.buttons === 1;
    return (_c = (_b = (_a = options.pointerTypes) == null ? void 0 : _a.includes(e.pointerType)) != null ? _b : isReleasingButton || isPrimaryButton) != null ? _c : true;
  };
  const stops = [
    useEventListener(target, "pointerdown", (e) => {
      if (!eventIsAllowed(e))
        return;
      isPointerDown.value = true;
      const eventTarget = e.target;
      eventTarget == null ? void 0 : eventTarget.setPointerCapture(e.pointerId);
      const { clientX: x, clientY: y } = e;
      updatePosStart(x, y);
      updatePosEnd(x, y);
      onSwipeStart == null ? void 0 : onSwipeStart(e);
    }),
    useEventListener(target, "pointermove", (e) => {
      if (!eventIsAllowed(e))
        return;
      if (!isPointerDown.value)
        return;
      const { clientX: x, clientY: y } = e;
      updatePosEnd(x, y);
      if (!isSwiping.value && isThresholdExceeded.value)
        isSwiping.value = true;
      if (isSwiping.value)
        onSwipe == null ? void 0 : onSwipe(e);
    }),
    useEventListener(target, "pointerup", (e) => {
      if (!eventIsAllowed(e))
        return;
      if (isSwiping.value)
        onSwipeEnd == null ? void 0 : onSwipeEnd(e, direction.value);
      isPointerDown.value = false;
      isSwiping.value = false;
    })
  ];
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    (_b = (_a = targetRef.value) == null ? void 0 : _a.style) == null ? void 0 : _b.setProperty("touch-action", "none");
    if (disableTextSelect) {
      (_d = (_c = targetRef.value) == null ? void 0 : _c.style) == null ? void 0 : _d.setProperty("-webkit-user-select", "none");
      (_f = (_e = targetRef.value) == null ? void 0 : _e.style) == null ? void 0 : _f.setProperty("-ms-user-select", "none");
      (_h = (_g = targetRef.value) == null ? void 0 : _g.style) == null ? void 0 : _h.setProperty("user-select", "none");
    }
  });
  const stop = () => stops.forEach((s) => s());
  return {
    isSwiping: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(isSwiping),
    direction: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(direction),
    posStart: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(posStart),
    posEnd: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(posEnd),
    distanceX,
    distanceY,
    stop
  };
}

function usePreferredColorScheme(options) {
  const isLight = useMediaQuery("(prefers-color-scheme: light)", options);
  const isDark = useMediaQuery("(prefers-color-scheme: dark)", options);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (isDark.value)
      return "dark";
    if (isLight.value)
      return "light";
    return "no-preference";
  });
}

function usePreferredContrast(options) {
  const isMore = useMediaQuery("(prefers-contrast: more)", options);
  const isLess = useMediaQuery("(prefers-contrast: less)", options);
  const isCustom = useMediaQuery("(prefers-contrast: custom)", options);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (isMore.value)
      return "more";
    if (isLess.value)
      return "less";
    if (isCustom.value)
      return "custom";
    return "no-preference";
  });
}

function usePreferredLanguages(options = {}) {
  const { window = defaultWindow } = options;
  if (!window)
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(["en"]);
  const navigator = window.navigator;
  const value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(navigator.languages);
  useEventListener(window, "languagechange", () => {
    value.value = navigator.languages;
  });
  return value;
}

function usePreferredReducedMotion(options) {
  const isReduced = useMediaQuery("(prefers-reduced-motion: reduce)", options);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (isReduced.value)
      return "reduce";
    return "no-preference";
  });
}

function usePrevious(value, initialValue) {
  const previous = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(initialValue);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(value),
    (_, oldValue) => {
      previous.value = oldValue;
    },
    { flush: "sync" }
  );
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(previous);
}

const topVarName = "--vueuse-safe-area-top";
const rightVarName = "--vueuse-safe-area-right";
const bottomVarName = "--vueuse-safe-area-bottom";
const leftVarName = "--vueuse-safe-area-left";
function useScreenSafeArea() {
  const top = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("");
  const right = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("");
  const bottom = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("");
  const left = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("");
  if (_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient) {
    const topCssVar = useCssVar(topVarName);
    const rightCssVar = useCssVar(rightVarName);
    const bottomCssVar = useCssVar(bottomVarName);
    const leftCssVar = useCssVar(leftVarName);
    topCssVar.value = "env(safe-area-inset-top, 0px)";
    rightCssVar.value = "env(safe-area-inset-right, 0px)";
    bottomCssVar.value = "env(safe-area-inset-bottom, 0px)";
    leftCssVar.value = "env(safe-area-inset-left, 0px)";
    update();
    useEventListener("resize", (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useDebounceFn)(update));
  }
  function update() {
    top.value = getValue(topVarName);
    right.value = getValue(rightVarName);
    bottom.value = getValue(bottomVarName);
    left.value = getValue(leftVarName);
  }
  return {
    top,
    right,
    bottom,
    left,
    update
  };
}
function getValue(position) {
  return getComputedStyle(document.documentElement).getPropertyValue(position);
}

function useScriptTag(src, onLoaded = _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop, options = {}) {
  const {
    immediate = true,
    manual = false,
    type = "text/javascript",
    async = true,
    crossOrigin,
    referrerPolicy,
    noModule,
    defer,
    document = defaultDocument,
    attrs = {}
  } = options;
  const scriptTag = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve, reject) => {
    const resolveWithElement = (el2) => {
      scriptTag.value = el2;
      resolve(el2);
      return el2;
    };
    if (!document) {
      resolve(false);
      return;
    }
    let shouldAppend = false;
    let el = document.querySelector(`script[src="${(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(src)}"]`);
    if (!el) {
      el = document.createElement("script");
      el.type = type;
      el.async = async;
      el.src = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(src);
      if (defer)
        el.defer = defer;
      if (crossOrigin)
        el.crossOrigin = crossOrigin;
      if (noModule)
        el.noModule = noModule;
      if (referrerPolicy)
        el.referrerPolicy = referrerPolicy;
      Object.entries(attrs).forEach(([name, value]) => el == null ? void 0 : el.setAttribute(name, value));
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolveWithElement(el);
    }
    el.addEventListener("error", (event) => reject(event));
    el.addEventListener("abort", (event) => reject(event));
    el.addEventListener("load", () => {
      el.setAttribute("data-loaded", "true");
      onLoaded(el);
      resolveWithElement(el);
    });
    if (shouldAppend)
      el = document.head.appendChild(el);
    if (!waitForScriptLoad)
      resolveWithElement(el);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise)
      _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document)
      return;
    _promise = null;
    if (scriptTag.value)
      scriptTag.value = null;
    const el = document.querySelector(`script[src="${(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(src)}"]`);
    if (el)
      document.head.removeChild(el);
  };
  if (immediate && !manual)
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(load);
  if (!manual)
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnUnmounted)(unload);
  return { scriptTag, load, unload };
}

function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!parent || parent.tagName === "BODY")
      return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  const _target = e.target;
  if (checkOverflowScroll(_target))
    return false;
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
}
const elInitialOverflow = /* @__PURE__ */ new WeakMap();
function useScrollLock(element, initialState = false) {
  const isLocked = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow = "";
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(element), (el) => {
    const target = resolveElement((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(el));
    if (target) {
      const ele = target;
      if (!elInitialOverflow.get(ele))
        elInitialOverflow.set(ele, ele.style.overflow);
      if (ele.style.overflow !== "hidden")
        initialOverflow = ele.style.overflow;
      if (ele.style.overflow === "hidden")
        return isLocked.value = true;
      if (isLocked.value)
        return ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const el = resolveElement((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(element));
    if (!el || isLocked.value)
      return;
    if (_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isIOS) {
      stopTouchMoveListener = useEventListener(
        el,
        "touchmove",
        (e) => {
          preventDefault(e);
        },
        { passive: false }
      );
    }
    el.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    const el = resolveElement((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(element));
    if (!el || !isLocked.value)
      return;
    _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isIOS && (stopTouchMoveListener == null ? void 0 : stopTouchMoveListener());
    el.style.overflow = initialOverflow;
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(unlock);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else unlock();
    }
  });
}

function useSessionStorage(key, initialValue, options = {}) {
  const { window = defaultWindow } = options;
  return useStorage(key, initialValue, window == null ? void 0 : window.sessionStorage, options);
}

function useShare(shareOptions = {}, options = {}) {
  const { navigator = defaultNavigator } = options;
  const _navigator = navigator;
  const isSupported = useSupported(() => _navigator && "canShare" in _navigator);
  const share = async (overrideOptions = {}) => {
    if (isSupported.value) {
      const data = {
        ...(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(shareOptions),
        ...(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(overrideOptions)
      };
      let granted = true;
      if (data.files && _navigator.canShare)
        granted = _navigator.canShare({ files: data.files });
      if (granted)
        return _navigator.share(data);
    }
  };
  return {
    isSupported,
    share
  };
}

const defaultSortFn = (source, compareFn) => source.sort(compareFn);
const defaultCompare = (a, b) => a - b;
function useSorted(...args) {
  var _a, _b, _c, _d;
  const [source] = args;
  let compareFn = defaultCompare;
  let options = {};
  if (args.length === 2) {
    if (typeof args[1] === "object") {
      options = args[1];
      compareFn = (_a = options.compareFn) != null ? _a : defaultCompare;
    } else {
      compareFn = (_b = args[1]) != null ? _b : defaultCompare;
    }
  } else if (args.length > 2) {
    compareFn = (_c = args[1]) != null ? _c : defaultCompare;
    options = (_d = args[2]) != null ? _d : {};
  }
  const {
    dirty = false,
    sortFn = defaultSortFn
  } = options;
  if (!dirty)
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => sortFn([...(0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source)], compareFn));
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watchEffect)(() => {
    const result = sortFn((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source), compareFn);
    if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(source))
      source.value = result;
    else
      source.splice(0, source.length, ...result);
  });
  return source;
}

function useSpeechRecognition(options = {}) {
  const {
    interimResults = true,
    continuous = true,
    window = defaultWindow
  } = options;
  const lang = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(options.lang || "en-US");
  const isListening = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const isFinal = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const result = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("");
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(void 0);
  const toggle = (value = !isListening.value) => {
    isListening.value = value;
  };
  const start = () => {
    isListening.value = true;
  };
  const stop = () => {
    isListening.value = false;
  };
  const SpeechRecognition = window && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const isSupported = useSupported(() => SpeechRecognition);
  let recognition;
  if (isSupported.value) {
    recognition = new SpeechRecognition();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(lang);
    recognition.onstart = () => {
      isFinal.value = false;
    };
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(lang, (lang2) => {
      if (recognition && !isListening.value)
        recognition.lang = lang2;
    });
    recognition.onresult = (event) => {
      const currentResult = event.results[event.resultIndex];
      const { transcript } = currentResult[0];
      isFinal.value = currentResult.isFinal;
      result.value = transcript;
      error.value = void 0;
    };
    recognition.onerror = (event) => {
      error.value = event;
    };
    recognition.onend = () => {
      isListening.value = false;
      recognition.lang = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(lang);
    };
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(isListening, () => {
      if (isListening.value)
        recognition.start();
      else
        recognition.stop();
    });
  }
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    isListening.value = false;
  });
  return {
    isSupported,
    isListening,
    isFinal,
    recognition,
    result,
    error,
    toggle,
    start,
    stop
  };
}

function useSpeechSynthesis(text, options = {}) {
  const {
    pitch = 1,
    rate = 1,
    volume = 1,
    window = defaultWindow
  } = options;
  const synth = window && window.speechSynthesis;
  const isSupported = useSupported(() => synth);
  const isPlaying = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const status = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("init");
  const spokenText = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(text || "");
  const lang = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(options.lang || "en-US");
  const error = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(void 0);
  const toggle = (value = !isPlaying.value) => {
    isPlaying.value = value;
  };
  const bindEventsForUtterance = (utterance2) => {
    utterance2.lang = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(lang);
    utterance2.voice = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.voice) || null;
    utterance2.pitch = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(pitch);
    utterance2.rate = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(rate);
    utterance2.volume = volume;
    utterance2.onstart = () => {
      isPlaying.value = true;
      status.value = "play";
    };
    utterance2.onpause = () => {
      isPlaying.value = false;
      status.value = "pause";
    };
    utterance2.onresume = () => {
      isPlaying.value = true;
      status.value = "play";
    };
    utterance2.onend = () => {
      isPlaying.value = false;
      status.value = "end";
    };
    utterance2.onerror = (event) => {
      error.value = event;
    };
  };
  const utterance = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    isPlaying.value = false;
    status.value = "init";
    const newUtterance = new SpeechSynthesisUtterance(spokenText.value);
    bindEventsForUtterance(newUtterance);
    return newUtterance;
  });
  const speak = () => {
    synth.cancel();
    utterance && synth.speak(utterance.value);
  };
  const stop = () => {
    synth.cancel();
    isPlaying.value = false;
  };
  if (isSupported.value) {
    bindEventsForUtterance(utterance.value);
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(lang, (lang2) => {
      if (utterance.value && !isPlaying.value)
        utterance.value.lang = lang2;
    });
    if (options.voice) {
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(options.voice, () => {
        synth.cancel();
      });
    }
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(isPlaying, () => {
      if (isPlaying.value)
        synth.resume();
      else
        synth.pause();
    });
  }
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    isPlaying.value = false;
  });
  return {
    isSupported,
    isPlaying,
    status,
    utterance,
    error,
    stop,
    toggle,
    speak
  };
}

function useStepper(steps, initialStep) {
  const stepsRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(steps);
  const stepNames = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => Array.isArray(stepsRef.value) ? stepsRef.value : Object.keys(stepsRef.value));
  const index = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(stepNames.value.indexOf(initialStep != null ? initialStep : stepNames.value[0]));
  const current = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => at(index.value));
  const isFirst = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => index.value === 0);
  const isLast = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => index.value === stepNames.value.length - 1);
  const next = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => stepNames.value[index.value + 1]);
  const previous = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => stepNames.value[index.value - 1]);
  function at(index2) {
    if (Array.isArray(stepsRef.value))
      return stepsRef.value[index2];
    return stepsRef.value[stepNames.value[index2]];
  }
  function get(step) {
    if (!stepNames.value.includes(step))
      return;
    return at(stepNames.value.indexOf(step));
  }
  function goTo(step) {
    if (stepNames.value.includes(step))
      index.value = stepNames.value.indexOf(step);
  }
  function goToNext() {
    if (isLast.value)
      return;
    index.value++;
  }
  function goToPrevious() {
    if (isFirst.value)
      return;
    index.value--;
  }
  function goBackTo(step) {
    if (isAfter(step))
      goTo(step);
  }
  function isNext(step) {
    return stepNames.value.indexOf(step) === index.value + 1;
  }
  function isPrevious(step) {
    return stepNames.value.indexOf(step) === index.value - 1;
  }
  function isCurrent(step) {
    return stepNames.value.indexOf(step) === index.value;
  }
  function isBefore(step) {
    return index.value < stepNames.value.indexOf(step);
  }
  function isAfter(step) {
    return index.value > stepNames.value.indexOf(step);
  }
  return {
    steps: stepsRef,
    stepNames,
    index,
    current,
    next,
    previous,
    isFirst,
    isLast,
    at,
    get,
    goTo,
    goToNext,
    goToPrevious,
    goBackTo,
    isNext,
    isPrevious,
    isCurrent,
    isBefore,
    isAfter
  };
}

function useStorageAsync(key, initialValue, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(initialValue);
  const type = guessSerializerType(rawInit);
  const data = (shallow ? vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef : vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialValue);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorageAsync", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  async function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : await storage.getItem(key);
      if (rawValue == null) {
        data.value = rawInit;
        if (writeDefaults && rawInit !== null)
          await storage.setItem(key, await serializer.write(rawInit));
      } else if (mergeDefaults) {
        const value = await serializer.read(rawValue);
        if (typeof mergeDefaults === "function")
          data.value = mergeDefaults(value, rawInit);
        else if (type === "object" && !Array.isArray(value))
          data.value = { ...rawInit, ...value };
        else data.value = value;
      } else {
        data.value = await serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window && listenToStorageChanges)
    useEventListener(window, "storage", (e) => Promise.resolve().then(() => read(e)));
  if (storage) {
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.watchWithFilter)(
      data,
      async () => {
        try {
          if (data.value == null)
            await storage.removeItem(key);
          else
            await storage.setItem(key, await serializer.write(data.value));
        } catch (e) {
          onError(e);
        }
      },
      {
        flush,
        deep,
        eventFilter
      }
    );
  }
  return data;
}

let _id = 0;
function useStyleTag(css, options = {}) {
  const isLoaded = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const {
    document = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`
  } = options;
  const cssRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(css);
  let stop = () => {
  };
  const load = () => {
    if (!document)
      return;
    const el = document.getElementById(id) || document.createElement("style");
    if (!el.isConnected) {
      el.id = id;
      if (options.media)
        el.media = options.media;
      document.head.appendChild(el);
    }
    if (isLoaded.value)
      return;
    stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
      cssRef,
      (value) => {
        el.textContent = value;
      },
      { immediate: true }
    );
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document || !isLoaded.value)
      return;
    stop();
    document.head.removeChild(document.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual)
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(load);
  if (!manual)
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.readonly)(isLoaded)
  };
}

function useSwipe(target, options = {}) {
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart,
    passive = true,
    window = defaultWindow
  } = options;
  const coordsStart = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({ x: 0, y: 0 });
  const coordsEnd = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({ x: 0, y: 0 });
  const diffX = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => coordsStart.x - coordsEnd.x);
  const diffY = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => coordsStart.y - coordsEnd.y);
  const { max, abs } = Math;
  const isThresholdExceeded = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => max(abs(diffX.value), abs(diffY.value)) >= threshold);
  const isSwiping = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const direction = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (!isThresholdExceeded.value)
      return "none";
    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? "left" : "right";
    } else {
      return diffY.value > 0 ? "up" : "down";
    }
  });
  const getTouchEventCoords = (e) => [e.touches[0].clientX, e.touches[0].clientY];
  const updateCoordsStart = (x, y) => {
    coordsStart.x = x;
    coordsStart.y = y;
  };
  const updateCoordsEnd = (x, y) => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };
  let listenerOptions;
  const isPassiveEventSupported = checkPassiveEventSupport(window == null ? void 0 : window.document);
  if (!passive)
    listenerOptions = isPassiveEventSupported ? { passive: false, capture: true } : { capture: true };
  else
    listenerOptions = isPassiveEventSupported ? { passive: true } : { capture: false };
  const onTouchEnd = (e) => {
    if (isSwiping.value)
      onSwipeEnd == null ? void 0 : onSwipeEnd(e, direction.value);
    isSwiping.value = false;
  };
  const stops = [
    useEventListener(target, "touchstart", (e) => {
      if (e.touches.length !== 1)
        return;
      if (listenerOptions.capture && !listenerOptions.passive)
        e.preventDefault();
      const [x, y] = getTouchEventCoords(e);
      updateCoordsStart(x, y);
      updateCoordsEnd(x, y);
      onSwipeStart == null ? void 0 : onSwipeStart(e);
    }, listenerOptions),
    useEventListener(target, "touchmove", (e) => {
      if (e.touches.length !== 1)
        return;
      const [x, y] = getTouchEventCoords(e);
      updateCoordsEnd(x, y);
      if (!isSwiping.value && isThresholdExceeded.value)
        isSwiping.value = true;
      if (isSwiping.value)
        onSwipe == null ? void 0 : onSwipe(e);
    }, listenerOptions),
    useEventListener(target, ["touchend", "touchcancel"], onTouchEnd, listenerOptions)
  ];
  const stop = () => stops.forEach((s) => s());
  return {
    isPassiveEventSupported,
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop
  };
}
function checkPassiveEventSupport(document) {
  if (!document)
    return false;
  let supportsPassive = false;
  const optionsBlock = {
    get passive() {
      supportsPassive = true;
      return false;
    }
  };
  document.addEventListener("x", _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop, optionsBlock);
  document.removeEventListener("x", _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.noop);
  return supportsPassive;
}

function useTemplateRefsList() {
  const refs = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  refs.value.set = (el) => {
    if (el)
      refs.value.push(el);
  };
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.onBeforeUpdate)(() => {
    refs.value.length = 0;
  });
  return refs;
}

function useTextDirection(options = {}) {
  const {
    document = defaultDocument,
    selector = "html",
    observe = false,
    initialValue = "ltr"
  } = options;
  function getValue() {
    var _a, _b;
    return (_b = (_a = document == null ? void 0 : document.querySelector(selector)) == null ? void 0 : _a.getAttribute("dir")) != null ? _b : initialValue;
  }
  const dir = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(getValue());
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(() => dir.value = getValue());
  if (observe && document) {
    useMutationObserver(
      document.querySelector(selector),
      () => dir.value = getValue(),
      { attributes: true }
    );
  }
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return dir.value;
    },
    set(v) {
      var _a, _b;
      dir.value = v;
      if (!document)
        return;
      if (dir.value)
        (_a = document.querySelector(selector)) == null ? void 0 : _a.setAttribute("dir", dir.value);
      else
        (_b = document.querySelector(selector)) == null ? void 0 : _b.removeAttribute("dir");
    }
  });
}

function getRangesFromSelection(selection) {
  var _a;
  const rangeCount = (_a = selection.rangeCount) != null ? _a : 0;
  return Array.from({ length: rangeCount }, (_, i) => selection.getRangeAt(i));
}
function useTextSelection(options = {}) {
  const {
    window = defaultWindow
  } = options;
  const selection = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const text = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    var _a, _b;
    return (_b = (_a = selection.value) == null ? void 0 : _a.toString()) != null ? _b : "";
  });
  const ranges = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => selection.value ? getRangesFromSelection(selection.value) : []);
  const rects = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => ranges.value.map((range) => range.getBoundingClientRect()));
  function onSelectionChange() {
    selection.value = null;
    if (window)
      selection.value = window.getSelection();
  }
  if (window)
    useEventListener(window.document, "selectionchange", onSelectionChange);
  return {
    text,
    rects,
    ranges,
    selection
  };
}

function useTextareaAutosize(options) {
  var _a;
  const textarea = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(options == null ? void 0 : options.element);
  const input = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(options == null ? void 0 : options.input);
  const styleProp = (_a = options == null ? void 0 : options.styleProp) != null ? _a : "height";
  const textareaScrollHeight = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(1);
  function triggerResize() {
    var _a2;
    if (!textarea.value)
      return;
    let height = "";
    textarea.value.style[styleProp] = "1px";
    textareaScrollHeight.value = (_a2 = textarea.value) == null ? void 0 : _a2.scrollHeight;
    if (options == null ? void 0 : options.styleTarget)
      (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.styleTarget).style[styleProp] = `${textareaScrollHeight.value}px`;
    else
      height = `${textareaScrollHeight.value}px`;
    textarea.value.style[styleProp] = height;
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)([input, textarea], () => (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.nextTick)(triggerResize), { immediate: true });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(textareaScrollHeight, () => {
    var _a2;
    return (_a2 = options == null ? void 0 : options.onResize) == null ? void 0 : _a2.call(options);
  });
  useResizeObserver(textarea, () => triggerResize());
  if (options == null ? void 0 : options.watch)
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(options.watch, triggerResize, { immediate: true, deep: true });
  return {
    textarea,
    input,
    triggerResize
  };
}

function useThrottledRefHistory(source, options = {}) {
  const { throttle = 200, trailing = true } = options;
  const filter = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.throttleFilter)(throttle, trailing);
  const history = useRefHistory(source, { ...options, eventFilter: filter });
  return {
    ...history
  };
}

const DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
const DEFAULT_MESSAGES = {
  justNow: "just now",
  past: (n) => n.match(/\d/) ? `${n} ago` : n,
  future: (n) => n.match(/\d/) ? `in ${n}` : n,
  month: (n, past) => n === 1 ? past ? "last month" : "next month" : `${n} month${n > 1 ? "s" : ""}`,
  year: (n, past) => n === 1 ? past ? "last year" : "next year" : `${n} year${n > 1 ? "s" : ""}`,
  day: (n, past) => n === 1 ? past ? "yesterday" : "tomorrow" : `${n} day${n > 1 ? "s" : ""}`,
  week: (n, past) => n === 1 ? past ? "last week" : "next week" : `${n} week${n > 1 ? "s" : ""}`,
  hour: (n) => `${n} hour${n > 1 ? "s" : ""}`,
  minute: (n) => `${n} minute${n > 1 ? "s" : ""}`,
  second: (n) => `${n} second${n > 1 ? "s" : ""}`,
  invalid: ""
};
function DEFAULT_FORMATTER(date) {
  return date.toISOString().slice(0, 10);
}
function useTimeAgo(time, options = {}) {
  const {
    controls: exposeControls = false,
    updateInterval = 3e4
  } = options;
  const { now, ...controls } = useNow({ interval: updateInterval, controls: true });
  const timeAgo = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => formatTimeAgo(new Date((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(time)), options, (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(now)));
  if (exposeControls) {
    return {
      timeAgo,
      ...controls
    };
  } else {
    return timeAgo;
  }
}
function formatTimeAgo(from, options = {}, now = Date.now()) {
  var _a;
  const {
    max,
    messages = DEFAULT_MESSAGES,
    fullDateFormatter = DEFAULT_FORMATTER,
    units = DEFAULT_UNITS,
    showSecond = false,
    rounding = "round"
  } = options;
  const roundFn = typeof rounding === "number" ? (n) => +n.toFixed(rounding) : Math[rounding];
  const diff = +now - +from;
  const absDiff = Math.abs(diff);
  function getValue(diff2, unit) {
    return roundFn(Math.abs(diff2) / unit.value);
  }
  function format(diff2, unit) {
    const val = getValue(diff2, unit);
    const past = diff2 > 0;
    const str = applyFormat(unit.name, val, past);
    return applyFormat(past ? "past" : "future", str, past);
  }
  function applyFormat(name, val, isPast) {
    const formatter = messages[name];
    if (typeof formatter === "function")
      return formatter(val, isPast);
    return formatter.replace("{0}", val.toString());
  }
  if (absDiff < 6e4 && !showSecond)
    return messages.justNow;
  if (typeof max === "number" && absDiff > max)
    return fullDateFormatter(new Date(from));
  if (typeof max === "string") {
    const unitMax = (_a = units.find((i) => i.name === max)) == null ? void 0 : _a.max;
    if (unitMax && absDiff > unitMax)
      return fullDateFormatter(new Date(from));
  }
  for (const [idx, unit] of units.entries()) {
    const val = getValue(diff, unit);
    if (val <= 0 && units[idx - 1])
      return format(diff, units[idx - 1]);
    if (absDiff < unit.max)
      return format(diff, unit);
  }
  return messages.invalid;
}

function useTimeoutPoll(fn, interval, timeoutPollOptions) {
  const { start } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useTimeoutFn)(loop, interval, { immediate: false });
  const isActive = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  async function loop() {
    if (!isActive.value)
      return;
    await fn();
    start();
  }
  function resume() {
    if (!isActive.value) {
      isActive.value = true;
      loop();
    }
  }
  function pause() {
    isActive.value = false;
  }
  if (timeoutPollOptions == null ? void 0 : timeoutPollOptions.immediate)
    resume();
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(pause);
  return {
    isActive,
    pause,
    resume
  };
}

function useTimestamp(options = {}) {
  const {
    controls: exposeControls = false,
    offset = 0,
    immediate = true,
    interval = "requestAnimationFrame",
    callback
  } = options;
  const ts = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.timestamp)() + offset);
  const update = () => ts.value = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.timestamp)() + offset;
  const cb = callback ? () => {
    update();
    callback(ts.value);
  } : update;
  const controls = interval === "requestAnimationFrame" ? useRafFn(cb, { immediate }) : (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useIntervalFn)(cb, interval, { immediate });
  if (exposeControls) {
    return {
      timestamp: ts,
      ...controls
    };
  } else {
    return ts;
  }
}

function useTitle(newTitle = null, options = {}) {
  var _a, _b, _c;
  const {
    document = defaultDocument,
    restoreOnUnmount = (t) => t
  } = options;
  const originalTitle = (_a = document == null ? void 0 : document.title) != null ? _a : "";
  const title = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)((_b = newTitle != null ? newTitle : document == null ? void 0 : document.title) != null ? _b : null);
  const isReadonly = newTitle && typeof newTitle === "function";
  function format(t) {
    if (!("titleTemplate" in options))
      return t;
    const template = options.titleTemplate || "%s";
    return typeof template === "function" ? template(t) : (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(template).replace(/%s/g, t);
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    title,
    (t, o) => {
      if (t !== o && document)
        document.title = format(typeof t === "string" ? t : "");
    },
    { immediate: true }
  );
  if (options.observe && !options.titleTemplate && document && !isReadonly) {
    useMutationObserver(
      (_c = document.head) == null ? void 0 : _c.querySelector("title"),
      () => {
        if (document && document.title !== title.value)
          title.value = format(document.title);
      },
      { childList: true }
    );
  }
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnBeforeUnmount)(() => {
    if (restoreOnUnmount) {
      const restoredTitle = restoreOnUnmount(originalTitle, title.value || "");
      if (restoredTitle != null && document)
        document.title = restoredTitle;
    }
  });
  return title;
}

const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
const TransitionPresets = /* @__PURE__ */ Object.assign({}, { linear: _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.identity }, _TransitionPresets);
function createEasingFunction([p0, p1, p2, p3]) {
  const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
  const b = (a1, a2) => 3 * a2 - 6 * a1;
  const c = (a1) => 3 * a1;
  const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
  const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
  const getTforX = (x) => {
    let aGuessT = x;
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2);
      if (currentSlope === 0)
        return aGuessT;
      const currentX = calcBezier(aGuessT, p0, p2) - x;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  };
  return (x) => p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}
function lerp(a, b, alpha) {
  return a + alpha * (b - a);
}
function toVec(t) {
  return (typeof t === "number" ? [t] : t) || [];
}
function executeTransition(source, from, to, options = {}) {
  var _a, _b;
  const fromVal = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(from);
  const toVal = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(to);
  const v1 = toVec(fromVal);
  const v2 = toVec(toVal);
  const duration = (_a = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.duration)) != null ? _a : 1e3;
  const startedAt = Date.now();
  const endAt = Date.now() + duration;
  const trans = typeof options.transition === "function" ? options.transition : (_b = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.transition)) != null ? _b : _vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.identity;
  const ease = typeof trans === "function" ? trans : createEasingFunction(trans);
  return new Promise((resolve) => {
    source.value = fromVal;
    const tick = () => {
      var _a2;
      if ((_a2 = options.abort) == null ? void 0 : _a2.call(options)) {
        resolve();
        return;
      }
      const now = Date.now();
      const alpha = ease((now - startedAt) / duration);
      const arr = toVec(source.value).map((n, i) => lerp(v1[i], v2[i], alpha));
      if (Array.isArray(source.value))
        source.value = arr.map((n, i) => {
          var _a3, _b2;
          return lerp((_a3 = v1[i]) != null ? _a3 : 0, (_b2 = v2[i]) != null ? _b2 : 0, alpha);
        });
      else if (typeof source.value === "number")
        source.value = arr[0];
      if (now < endAt) {
        requestAnimationFrame(tick);
      } else {
        source.value = toVal;
        resolve();
      }
    };
    tick();
  });
}
function useTransition(source, options = {}) {
  let currentId = 0;
  const sourceVal = () => {
    const v = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(source);
    return typeof v === "number" ? v : v.map(_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue);
  };
  const outputRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(sourceVal());
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(sourceVal, async (to) => {
    var _a, _b;
    if ((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.disabled))
      return;
    const id = ++currentId;
    if (options.delay)
      await (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.promiseTimeout)((0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.delay));
    if (id !== currentId)
      return;
    const toVal = Array.isArray(to) ? to.map(_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue) : (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(to);
    (_a = options.onStarted) == null ? void 0 : _a.call(options);
    await executeTransition(outputRef, outputRef.value, toVal, {
      ...options,
      abort: () => {
        var _a2;
        return id !== currentId || ((_a2 = options.abort) == null ? void 0 : _a2.call(options));
      }
    });
    (_b = options.onFinished) == null ? void 0 : _b.call(options);
  }, { deep: true });
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(() => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.disabled), (disabled) => {
    if (disabled) {
      currentId++;
      outputRef.value = sourceVal();
    }
  });
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    currentId++;
  });
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toValue)(options.disabled) ? sourceVal() : outputRef.value);
}

function useUrlSearchParams(mode = "history", options = {}) {
  const {
    initialValue = {},
    removeNullishValues = true,
    removeFalsyValues = false,
    write: enableWrite = true,
    window = defaultWindow
  } = options;
  if (!window)
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)(initialValue);
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.reactive)({});
  function getRawParams() {
    if (mode === "history") {
      return window.location.search || "";
    } else if (mode === "hash") {
      const hash = window.location.hash || "";
      const index = hash.indexOf("?");
      return index > 0 ? hash.slice(index) : "";
    } else {
      return (window.location.hash || "").replace(/^#/, "");
    }
  }
  function constructQuery(params) {
    const stringified = params.toString();
    if (mode === "history")
      return `${stringified ? `?${stringified}` : ""}${window.location.hash || ""}`;
    if (mode === "hash-params")
      return `${window.location.search || ""}${stringified ? `#${stringified}` : ""}`;
    const hash = window.location.hash || "#";
    const index = hash.indexOf("?");
    if (index > 0)
      return `${hash.slice(0, index)}${stringified ? `?${stringified}` : ""}`;
    return `${hash}${stringified ? `?${stringified}` : ""}`;
  }
  function read() {
    return new URLSearchParams(getRawParams());
  }
  function updateState(params) {
    const unusedKeys = new Set(Object.keys(state));
    for (const key of params.keys()) {
      const paramsForKey = params.getAll(key);
      state[key] = paramsForKey.length > 1 ? paramsForKey : params.get(key) || "";
      unusedKeys.delete(key);
    }
    Array.from(unusedKeys).forEach((key) => delete state[key]);
  }
  const { pause, resume } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.pausableWatch)(
    state,
    () => {
      const params = new URLSearchParams("");
      Object.keys(state).forEach((key) => {
        const mapEntry = state[key];
        if (Array.isArray(mapEntry))
          mapEntry.forEach((value) => params.append(key, value));
        else if (removeNullishValues && mapEntry == null)
          params.delete(key);
        else if (removeFalsyValues && !mapEntry)
          params.delete(key);
        else
          params.set(key, mapEntry);
      });
      write(params);
    },
    { deep: true }
  );
  function write(params, shouldUpdate) {
    pause();
    if (shouldUpdate)
      updateState(params);
    window.history.replaceState(
      window.history.state,
      window.document.title,
      window.location.pathname + constructQuery(params)
    );
    resume();
  }
  function onChanged() {
    if (!enableWrite)
      return;
    write(read(), true);
  }
  useEventListener(window, "popstate", onChanged, false);
  if (mode !== "history")
    useEventListener(window, "hashchange", onChanged, false);
  const initial = read();
  if (initial.keys().next().value)
    updateState(initial);
  else
    Object.assign(state, initialValue);
  return state;
}

function useUserMedia(options = {}) {
  var _a, _b;
  const enabled = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)((_a = options.enabled) != null ? _a : false);
  const autoSwitch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)((_b = options.autoSwitch) != null ? _b : true);
  const constraints = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(options.constraints);
  const { navigator = defaultNavigator } = options;
  const isSupported = useSupported(() => {
    var _a2;
    return (_a2 = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : _a2.getUserMedia;
  });
  const stream = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)();
  function getDeviceOptions(type) {
    switch (type) {
      case "video": {
        if (constraints.value)
          return constraints.value.video || false;
        break;
      }
      case "audio": {
        if (constraints.value)
          return constraints.value.audio || false;
        break;
      }
    }
  }
  async function _start() {
    if (!isSupported.value || stream.value)
      return;
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: getDeviceOptions("video"),
      audio: getDeviceOptions("audio")
    });
    return stream.value;
  }
  function _stop() {
    var _a2;
    (_a2 = stream.value) == null ? void 0 : _a2.getTracks().forEach((t) => t.stop());
    stream.value = void 0;
  }
  function stop() {
    _stop();
    enabled.value = false;
  }
  async function start() {
    await _start();
    if (stream.value)
      enabled.value = true;
    return stream.value;
  }
  async function restart() {
    _stop();
    return await start();
  }
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    enabled,
    (v) => {
      if (v)
        _start();
      else _stop();
    },
    { immediate: true }
  );
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
    constraints,
    () => {
      if (autoSwitch.value && stream.value)
        restart();
    },
    { immediate: true }
  );
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
    stop();
  });
  return {
    isSupported,
    stream,
    start,
    stop,
    restart,
    constraints,
    enabled,
    autoSwitch
  };
}

function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c, _d, _e;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.getCurrentInstance)();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  if (!key) {
    if (vue_demi__WEBPACK_IMPORTED_MODULE_1__.isVue2) {
      const modelOptions = (_e = (_d = vm == null ? void 0 : vm.proxy) == null ? void 0 : _d.$options) == null ? void 0 : _e.model;
      key = (modelOptions == null ? void 0 : modelOptions.value) || "value";
      if (!eventName)
        event = (modelOptions == null ? void 0 : modelOptions.event) || "input";
    } else {
      key = "modelValue";
    }
  }
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue = () => (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isDef)(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue();
    const proxy = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialValue);
    let isUpdating = false;
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
      () => props[key],
      (v) => {
        if (!isUpdating) {
          isUpdating = true;
          proxy.value = cloneFn(v);
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => isUpdating = false);
        }
      }
    );
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key] || deep))
          triggerEmit(v);
      },
      { deep }
    );
    return proxy;
  } else {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
      get() {
        return getValue();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}

function useVModels(props, emit, options = {}) {
  const ret = {};
  for (const key in props) {
    ret[key] = useVModel(
      props,
      key,
      emit,
      options
    );
  }
  return ret;
}

function useVibrate(options) {
  const {
    pattern = [],
    interval = 0,
    navigator = defaultNavigator
  } = options || {};
  const isSupported = useSupported(() => typeof navigator !== "undefined" && "vibrate" in navigator);
  const patternRef = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(pattern);
  let intervalControls;
  const vibrate = (pattern2 = patternRef.value) => {
    if (isSupported.value)
      navigator.vibrate(pattern2);
  };
  const stop = () => {
    if (isSupported.value)
      navigator.vibrate(0);
    intervalControls == null ? void 0 : intervalControls.pause();
  };
  if (interval > 0) {
    intervalControls = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useIntervalFn)(
      vibrate,
      interval,
      {
        immediate: false,
        immediateCallback: false
      }
    );
  }
  return {
    isSupported,
    pattern,
    intervalControls,
    vibrate,
    stop
  };
}

function useVirtualList(list, options) {
  const { containerStyle, wrapperProps, scrollTo, calculateRange, currentList, containerRef } = "itemHeight" in options ? useVerticalVirtualList(options, list) : useHorizontalVirtualList(options, list);
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange();
      },
      style: containerStyle
    },
    wrapperProps
  };
}
function useVirtualListResources(list) {
  const containerRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const size = useElementSize(containerRef);
  const currentList = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)([]);
  const source = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)(list);
  const state = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)({ start: 0, end: 10 });
  return { state, source, currentList, size, containerRef };
}
function createGetViewCapacity(state, source, itemSize) {
  return (containerSize) => {
    if (typeof itemSize === "number")
      return Math.ceil(containerSize / itemSize);
    const { start = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < source.value.length; i++) {
      const size = itemSize(i);
      sum += size;
      capacity = i;
      if (sum > containerSize)
        break;
    }
    return capacity - start;
  };
}
function createGetOffset(source, itemSize) {
  return (scrollDirection) => {
    if (typeof itemSize === "number")
      return Math.floor(scrollDirection / itemSize) + 1;
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < source.value.length; i++) {
      const size = itemSize(i);
      sum += size;
      if (sum >= scrollDirection) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
}
function createCalculateRange(type, overscan, getOffset, getViewCapacity, { containerRef, state, currentList, source }) {
  return () => {
    const element = containerRef.value;
    if (element) {
      const offset = getOffset(type === "vertical" ? element.scrollTop : element.scrollLeft);
      const viewCapacity = getViewCapacity(type === "vertical" ? element.clientHeight : element.clientWidth);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to
      };
      currentList.value = source.value.slice(state.value.start, state.value.end).map((ele, index) => ({
        data: ele,
        index: index + state.value.start
      }));
    }
  };
}
function createGetDistance(itemSize, source) {
  return (index) => {
    if (typeof itemSize === "number") {
      const size2 = index * itemSize;
      return size2;
    }
    const size = source.value.slice(0, index).reduce((sum, _, i) => sum + itemSize(i), 0);
    return size;
  };
}
function useWatchForSizes(size, list, containerRef, calculateRange) {
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)([size.width, size.height, list, containerRef], () => {
    calculateRange();
  });
}
function createComputedTotalSize(itemSize, source) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    if (typeof itemSize === "number")
      return source.value.length * itemSize;
    return source.value.reduce((sum, _, index) => sum + itemSize(index), 0);
  });
}
const scrollToDictionaryForElementScrollKey = {
  horizontal: "scrollLeft",
  vertical: "scrollTop"
};
function createScrollTo(type, calculateRange, getDistance, containerRef) {
  return (index) => {
    if (containerRef.value) {
      containerRef.value[scrollToDictionaryForElementScrollKey[type]] = getDistance(index);
      calculateRange();
    }
  };
}
function useHorizontalVirtualList(options, list) {
  const resources = useVirtualListResources(list);
  const { state, source, currentList, size, containerRef } = resources;
  const containerStyle = { overflowX: "auto" };
  const { itemWidth, overscan = 5 } = options;
  const getViewCapacity = createGetViewCapacity(state, source, itemWidth);
  const getOffset = createGetOffset(source, itemWidth);
  const calculateRange = createCalculateRange("horizontal", overscan, getOffset, getViewCapacity, resources);
  const getDistanceLeft = createGetDistance(itemWidth, source);
  const offsetLeft = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => getDistanceLeft(state.value.start));
  const totalWidth = createComputedTotalSize(itemWidth, source);
  useWatchForSizes(size, list, containerRef, calculateRange);
  const scrollTo = createScrollTo("horizontal", calculateRange, getDistanceLeft, containerRef);
  const wrapperProps = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    return {
      style: {
        height: "100%",
        width: `${totalWidth.value - offsetLeft.value}px`,
        marginLeft: `${offsetLeft.value}px`,
        display: "flex"
      }
    };
  });
  return {
    scrollTo,
    calculateRange,
    wrapperProps,
    containerStyle,
    currentList,
    containerRef
  };
}
function useVerticalVirtualList(options, list) {
  const resources = useVirtualListResources(list);
  const { state, source, currentList, size, containerRef } = resources;
  const containerStyle = { overflowY: "auto" };
  const { itemHeight, overscan = 5 } = options;
  const getViewCapacity = createGetViewCapacity(state, source, itemHeight);
  const getOffset = createGetOffset(source, itemHeight);
  const calculateRange = createCalculateRange("vertical", overscan, getOffset, getViewCapacity, resources);
  const getDistanceTop = createGetDistance(itemHeight, source);
  const offsetTop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => getDistanceTop(state.value.start));
  const totalHeight = createComputedTotalSize(itemHeight, source);
  useWatchForSizes(size, list, containerRef, calculateRange);
  const scrollTo = createScrollTo("vertical", calculateRange, getDistanceTop, containerRef);
  const wrapperProps = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
    return {
      style: {
        width: "100%",
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`
      }
    };
  });
  return {
    calculateRange,
    scrollTo,
    containerStyle,
    wrapperProps,
    currentList,
    containerRef
  };
}

function useWakeLock(options = {}) {
  const {
    navigator = defaultNavigator,
    document = defaultDocument
  } = options;
  let wakeLock;
  const isSupported = useSupported(() => navigator && "wakeLock" in navigator);
  const isActive = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  async function onVisibilityChange() {
    if (!isSupported.value || !wakeLock)
      return;
    if (document && document.visibilityState === "visible")
      wakeLock = await navigator.wakeLock.request("screen");
    isActive.value = !wakeLock.released;
  }
  if (document)
    useEventListener(document, "visibilitychange", onVisibilityChange, { passive: true });
  async function request(type) {
    if (!isSupported.value)
      return;
    wakeLock = await navigator.wakeLock.request(type);
    isActive.value = !wakeLock.released;
  }
  async function release() {
    if (!isSupported.value || !wakeLock)
      return;
    await wakeLock.release();
    isActive.value = !wakeLock.released;
    wakeLock = null;
  }
  return {
    isSupported,
    isActive,
    request,
    release
  };
}

function useWebNotification(options = {}) {
  const {
    window = defaultWindow,
    requestPermissions: _requestForPermissions = true
  } = options;
  const defaultWebNotificationOptions = options;
  const isSupported = useSupported(() => {
    if (!window || !("Notification" in window))
      return false;
    try {
      new Notification("");
    } catch (e) {
      return false;
    }
    return true;
  });
  const permissionGranted = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(isSupported.value && "permission" in Notification && Notification.permission === "granted");
  const notification = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const ensurePermissions = async () => {
    if (!isSupported.value)
      return;
    if (!permissionGranted.value && Notification.permission !== "denied") {
      const result = await Notification.requestPermission();
      if (result === "granted")
        permissionGranted.value = true;
    }
    return permissionGranted.value;
  };
  const { on: onClick, trigger: clickTrigger } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const { on: onShow, trigger: showTrigger } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const { on: onError, trigger: errorTrigger } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const { on: onClose, trigger: closeTrigger } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.createEventHook)();
  const show = async (overrides) => {
    if (!isSupported.value || !permissionGranted.value)
      return;
    const options2 = Object.assign({}, defaultWebNotificationOptions, overrides);
    notification.value = new Notification(options2.title || "", options2);
    notification.value.onclick = clickTrigger;
    notification.value.onshow = showTrigger;
    notification.value.onerror = errorTrigger;
    notification.value.onclose = closeTrigger;
    return notification.value;
  };
  const close = () => {
    if (notification.value)
      notification.value.close();
    notification.value = null;
  };
  if (_requestForPermissions)
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(ensurePermissions);
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(close);
  if (isSupported.value && window) {
    const document = window.document;
    useEventListener(document, "visibilitychange", (e) => {
      e.preventDefault();
      if (document.visibilityState === "visible") {
        close();
      }
    });
  }
  return {
    isSupported,
    notification,
    ensurePermissions,
    permissionGranted,
    show,
    close,
    onClick,
    onShow,
    onError,
    onClose
  };
}

const DEFAULT_PING_MESSAGE = "ping";
function resolveNestedOptions(options) {
  if (options === true)
    return {};
  return options;
}
function useWebSocket(url, options = {}) {
  const {
    onConnected,
    onDisconnected,
    onError,
    onMessage,
    immediate = true,
    autoClose = true,
    protocols = []
  } = options;
  const data = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const status = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("CLOSED");
  const wsRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const urlRef = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.toRef)(url);
  let heartbeatPause;
  let heartbeatResume;
  let explicitlyClosed = false;
  let retried = 0;
  let bufferedData = [];
  let pongTimeoutWait;
  const _sendBuffer = () => {
    if (bufferedData.length && wsRef.value && status.value === "OPEN") {
      for (const buffer of bufferedData)
        wsRef.value.send(buffer);
      bufferedData = [];
    }
  };
  const resetHeartbeat = () => {
    clearTimeout(pongTimeoutWait);
    pongTimeoutWait = void 0;
  };
  const close = (code = 1e3, reason) => {
    if (!_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient || !wsRef.value)
      return;
    explicitlyClosed = true;
    resetHeartbeat();
    heartbeatPause == null ? void 0 : heartbeatPause();
    wsRef.value.close(code, reason);
    wsRef.value = void 0;
  };
  const send = (data2, useBuffer = true) => {
    if (!wsRef.value || status.value !== "OPEN") {
      if (useBuffer)
        bufferedData.push(data2);
      return false;
    }
    _sendBuffer();
    wsRef.value.send(data2);
    return true;
  };
  const _init = () => {
    if (explicitlyClosed || typeof urlRef.value === "undefined")
      return;
    const ws = new WebSocket(urlRef.value, protocols);
    wsRef.value = ws;
    status.value = "CONNECTING";
    ws.onopen = () => {
      status.value = "OPEN";
      onConnected == null ? void 0 : onConnected(ws);
      heartbeatResume == null ? void 0 : heartbeatResume();
      _sendBuffer();
    };
    ws.onclose = (ev) => {
      status.value = "CLOSED";
      onDisconnected == null ? void 0 : onDisconnected(ws, ev);
      if (!explicitlyClosed && options.autoReconnect) {
        const {
          retries = -1,
          delay = 1e3,
          onFailed
        } = resolveNestedOptions(options.autoReconnect);
        retried += 1;
        if (typeof retries === "number" && (retries < 0 || retried < retries))
          setTimeout(_init, delay);
        else if (typeof retries === "function" && retries())
          setTimeout(_init, delay);
        else
          onFailed == null ? void 0 : onFailed();
      }
    };
    ws.onerror = (e) => {
      onError == null ? void 0 : onError(ws, e);
    };
    ws.onmessage = (e) => {
      if (options.heartbeat) {
        resetHeartbeat();
        const {
          message = DEFAULT_PING_MESSAGE
        } = resolveNestedOptions(options.heartbeat);
        if (e.data === message)
          return;
      }
      data.value = e.data;
      onMessage == null ? void 0 : onMessage(ws, e);
    };
  };
  if (options.heartbeat) {
    const {
      message = DEFAULT_PING_MESSAGE,
      interval = 1e3,
      pongTimeout = 1e3
    } = resolveNestedOptions(options.heartbeat);
    const { pause, resume } = (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.useIntervalFn)(
      () => {
        send(message, false);
        if (pongTimeoutWait != null)
          return;
        pongTimeoutWait = setTimeout(() => {
          close();
          explicitlyClosed = false;
        }, pongTimeout);
      },
      interval,
      { immediate: false }
    );
    heartbeatPause = pause;
    heartbeatResume = resume;
  }
  if (autoClose) {
    if (_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient)
      useEventListener("beforeunload", () => close());
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(close);
  }
  const open = () => {
    if (!_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isClient && !_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.isWorker)
      return;
    close();
    explicitlyClosed = false;
    retried = 0;
    _init();
  };
  if (immediate)
    open();
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(urlRef, open);
  return {
    data,
    status,
    close,
    send,
    open,
    ws: wsRef
  };
}

function useWebWorker(arg0, workerOptions, options) {
  const {
    window = defaultWindow
  } = options != null ? options : {};
  const data = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(null);
  const worker = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.shallowRef)();
  const post = (...args) => {
    if (!worker.value)
      return;
    worker.value.postMessage(...args);
  };
  const terminate = function terminate2() {
    if (!worker.value)
      return;
    worker.value.terminate();
  };
  if (window) {
    if (typeof arg0 === "string")
      worker.value = new Worker(arg0, workerOptions);
    else if (typeof arg0 === "function")
      worker.value = arg0();
    else
      worker.value = arg0;
    worker.value.onmessage = (e) => {
      data.value = e.data;
    };
    (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(() => {
      if (worker.value)
        worker.value.terminate();
    });
  }
  return {
    data,
    post,
    terminate,
    worker
  };
}

function jobRunner(userFunc) {
  return (e) => {
    const userFuncArgs = e.data[0];
    return Promise.resolve(userFunc.apply(void 0, userFuncArgs)).then((result) => {
      postMessage(["SUCCESS", result]);
    }).catch((error) => {
      postMessage(["ERROR", error]);
    });
  };
}

function depsParser(deps, localDeps) {
  if (deps.length === 0 && localDeps.length === 0)
    return "";
  const depsString = deps.map((dep) => `'${dep}'`).toString();
  const depsFunctionString = localDeps.filter((dep) => typeof dep === "function").map((fn) => {
    const str = fn.toString();
    if (str.trim().startsWith("function")) {
      return str;
    } else {
      const name = fn.name;
      return `const ${name} = ${str}`;
    }
  }).join(";");
  const importString = `importScripts(${depsString});`;
  return `${depsString.trim() === "" ? "" : importString} ${depsFunctionString}`;
}

function createWorkerBlobUrl(fn, deps, localDeps) {
  const blobCode = `${depsParser(deps, localDeps)}; onmessage=(${jobRunner})(${fn})`;
  const blob = new Blob([blobCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  return url;
}

function useWebWorkerFn(fn, options = {}) {
  const {
    dependencies = [],
    localDependencies = [],
    timeout,
    window = defaultWindow
  } = options;
  const worker = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const workerStatus = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)("PENDING");
  const promise = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)({});
  const timeoutId = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)();
  const workerTerminate = (status = "PENDING") => {
    if (worker.value && worker.value._url && window) {
      worker.value.terminate();
      URL.revokeObjectURL(worker.value._url);
      promise.value = {};
      worker.value = void 0;
      window.clearTimeout(timeoutId.value);
      workerStatus.value = status;
    }
  };
  workerTerminate();
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnScopeDispose)(workerTerminate);
  const generateWorker = () => {
    const blobUrl = createWorkerBlobUrl(fn, dependencies, localDependencies);
    const newWorker = new Worker(blobUrl);
    newWorker._url = blobUrl;
    newWorker.onmessage = (e) => {
      const { resolve = () => {
      }, reject = () => {
      } } = promise.value;
      const [status, result] = e.data;
      switch (status) {
        case "SUCCESS":
          resolve(result);
          workerTerminate(status);
          break;
        default:
          reject(result);
          workerTerminate("ERROR");
          break;
      }
    };
    newWorker.onerror = (e) => {
      const { reject = () => {
      } } = promise.value;
      e.preventDefault();
      reject(e);
      workerTerminate("ERROR");
    };
    if (timeout) {
      timeoutId.value = setTimeout(
        () => workerTerminate("TIMEOUT_EXPIRED"),
        timeout
      );
    }
    return newWorker;
  };
  const callWorker = (...fnArgs) => new Promise((resolve, reject) => {
    promise.value = {
      resolve,
      reject
    };
    worker.value && worker.value.postMessage([[...fnArgs]]);
    workerStatus.value = "RUNNING";
  });
  const workerFn = (...fnArgs) => {
    if (workerStatus.value === "RUNNING") {
      console.error(
        "[useWebWorkerFn] You can only run one instance of the worker at a time."
      );
      return Promise.reject();
    }
    worker.value = generateWorker();
    return callWorker(...fnArgs);
  };
  return {
    workerFn,
    workerStatus,
    workerTerminate
  };
}

function useWindowFocus(options = {}) {
  const { window = defaultWindow } = options;
  if (!window)
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(false);
  const focused = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(window.document.hasFocus());
  useEventListener(window, "blur", () => {
    focused.value = false;
  });
  useEventListener(window, "focus", () => {
    focused.value = true;
  });
  return focused;
}

function useWindowScroll(options = {}) {
  const { window = defaultWindow, behavior = "auto" } = options;
  if (!window) {
    return {
      x: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0),
      y: (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(0)
    };
  }
  const internalX = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(window.scrollX);
  const internalY = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(window.scrollY);
  const x = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return internalX.value;
    },
    set(x2) {
      scrollTo({ left: x2, behavior });
    }
  });
  const y = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.computed)({
    get() {
      return internalY.value;
    },
    set(y2) {
      scrollTo({ top: y2, behavior });
    }
  });
  useEventListener(
    window,
    "scroll",
    () => {
      internalX.value = window.scrollX;
      internalY.value = window.scrollY;
    },
    {
      capture: false,
      passive: true
    }
  );
  return { x, y };
}

function useWindowSize(options = {}) {
  const {
    window = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true
  } = options;
  const width = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialWidth);
  const height = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.ref)(initialHeight);
  const update = () => {
    if (window) {
      if (includeScrollbar) {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
      } else {
        width.value = window.document.documentElement.clientWidth;
        height.value = window.document.documentElement.clientHeight;
      }
    }
  };
  update();
  (0,_vueuse_shared__WEBPACK_IMPORTED_MODULE_0__.tryOnMounted)(update);
  useEventListener("resize", update, { passive: true });
  if (listenOrientation) {
    const matches = useMediaQuery("(orientation: portrait)");
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.watch)(matches, () => update());
  }
  return { width, height };
}




/***/ }),

/***/ "./node_modules/@vueuse/integrations/node_modules/vue-demi/lib/index.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/@vueuse/integrations/node_modules/vue-demi/lib/index.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EffectScope: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.EffectScope),
/* harmony export */   Fragment: () => (/* binding */ Fragment),
/* harmony export */   KeepAlive: () => (/* binding */ KeepAlive),
/* harmony export */   Suspense: () => (/* binding */ Suspense),
/* harmony export */   Teleport: () => (/* binding */ Teleport),
/* harmony export */   Transition: () => (/* binding */ Transition),
/* harmony export */   TransitionGroup: () => (/* binding */ TransitionGroup),
/* harmony export */   Vue: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Vue2: () => (/* binding */ Vue2),
/* harmony export */   computed: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.computed),
/* harmony export */   createApp: () => (/* binding */ createApp),
/* harmony export */   customRef: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.customRef),
/* harmony export */   defineAsyncComponent: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent),
/* harmony export */   defineComponent: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent),
/* harmony export */   del: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.del),
/* harmony export */   effectScope: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.effectScope),
/* harmony export */   getCurrentInstance: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance),
/* harmony export */   getCurrentScope: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope),
/* harmony export */   h: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   hasInjectionContext: () => (/* binding */ hasInjectionContext),
/* harmony export */   inject: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.inject),
/* harmony export */   install: () => (/* binding */ install),
/* harmony export */   isProxy: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isProxy),
/* harmony export */   isReactive: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isReactive),
/* harmony export */   isReadonly: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isReadonly),
/* harmony export */   isRef: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isRef),
/* harmony export */   isShallow: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.isShallow),
/* harmony export */   isVue2: () => (/* binding */ isVue2),
/* harmony export */   isVue3: () => (/* binding */ isVue3),
/* harmony export */   markRaw: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.markRaw),
/* harmony export */   mergeDefaults: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.mergeDefaults),
/* harmony export */   nextTick: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.nextTick),
/* harmony export */   onActivated: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onActivated),
/* harmony export */   onBeforeMount: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount),
/* harmony export */   onBeforeUnmount: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount),
/* harmony export */   onBeforeUpdate: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate),
/* harmony export */   onDeactivated: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onDeactivated),
/* harmony export */   onErrorCaptured: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onErrorCaptured),
/* harmony export */   onMounted: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onMounted),
/* harmony export */   onRenderTracked: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onRenderTracked),
/* harmony export */   onRenderTriggered: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onRenderTriggered),
/* harmony export */   onScopeDispose: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose),
/* harmony export */   onServerPrefetch: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onServerPrefetch),
/* harmony export */   onUnmounted: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted),
/* harmony export */   onUpdated: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.onUpdated),
/* harmony export */   provide: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.provide),
/* harmony export */   proxyRefs: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.proxyRefs),
/* harmony export */   reactive: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.reactive),
/* harmony export */   readonly: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.readonly),
/* harmony export */   ref: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   set: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.set),
/* harmony export */   shallowReactive: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowReactive),
/* harmony export */   shallowReadonly: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly),
/* harmony export */   shallowRef: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.shallowRef),
/* harmony export */   toRaw: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRaw),
/* harmony export */   toRef: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRef),
/* harmony export */   toRefs: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.toRefs),
/* harmony export */   triggerRef: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.triggerRef),
/* harmony export */   unref: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.unref),
/* harmony export */   useAttrs: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useAttrs),
/* harmony export */   useCssModule: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useCssModule),
/* harmony export */   useCssVars: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useCssVars),
/* harmony export */   useListeners: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useListeners),
/* harmony export */   useSlots: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.useSlots),
/* harmony export */   version: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   warn: () => (/* binding */ warn),
/* harmony export */   watch: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watch),
/* harmony export */   watchEffect: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect),
/* harmony export */   watchPostEffect: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watchPostEffect),
/* harmony export */   watchSyncEffect: () => (/* reexport safe */ vue__WEBPACK_IMPORTED_MODULE_0__.watchSyncEffect)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");



var isVue2 = true
var isVue3 = false
var Vue2 = vue__WEBPACK_IMPORTED_MODULE_0__["default"]
var warn = vue__WEBPACK_IMPORTED_MODULE_0__["default"].util.warn

function install() {}

// createApp polyfill
function createApp(rootComponent, rootProps) {
  var vm
  var provide = {}
  var app = {
    config: vue__WEBPACK_IMPORTED_MODULE_0__["default"].config,
    use: vue__WEBPACK_IMPORTED_MODULE_0__["default"].use.bind(vue__WEBPACK_IMPORTED_MODULE_0__["default"]),
    mixin: vue__WEBPACK_IMPORTED_MODULE_0__["default"].mixin.bind(vue__WEBPACK_IMPORTED_MODULE_0__["default"]),
    component: vue__WEBPACK_IMPORTED_MODULE_0__["default"].component.bind(vue__WEBPACK_IMPORTED_MODULE_0__["default"]),
    provide: function (key, value) {
      provide[key] = value
      return this
    },
    directive: function (name, dir) {
      if (dir) {
        vue__WEBPACK_IMPORTED_MODULE_0__["default"].directive(name, dir)
        return app
      } else {
        return vue__WEBPACK_IMPORTED_MODULE_0__["default"].directive(name)
      }
    },
    mount: function (el, hydrating) {
      if (!vm) {
        vm = new vue__WEBPACK_IMPORTED_MODULE_0__["default"](Object.assign({ propsData: rootProps }, rootComponent, { provide: Object.assign(provide, rootComponent.provide) }))
        vm.$mount(el, hydrating)
        return vm
      } else {
        return vm
      }
    },
    unmount: function () {
      if (vm) {
        vm.$destroy()
        vm = undefined
      }
    },
  }
  return app
}



// Vue 3 components mock
function createMockComponent(name) {
  return {
    setup() {
      throw new Error('[vue-demi] ' + name + ' is not supported in Vue 2. It\'s provided to avoid compiler errors.')
    }
  }
}
var Fragment = /*#__PURE__*/ createMockComponent('Fragment')
var Transition = /*#__PURE__*/ createMockComponent('Transition')
var TransitionGroup = /*#__PURE__*/ createMockComponent('TransitionGroup')
var Teleport = /*#__PURE__*/ createMockComponent('Teleport')
var Suspense = /*#__PURE__*/ createMockComponent('Suspense')
var KeepAlive = /*#__PURE__*/ createMockComponent('KeepAlive')



// Not implemented https://github.com/vuejs/core/pull/8111, falls back to getCurrentInstance()
function hasInjectionContext() {
  return !!(0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)()
}


/***/ }),

/***/ "./node_modules/@vueuse/integrations/useSortable.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/@vueuse/integrations/useSortable.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   moveArrayElement: () => (/* binding */ moveArrayElement),
/* harmony export */   useSortable: () => (/* binding */ useSortable)
/* harmony export */ });
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@vueuse/integrations/node_modules/@vueuse/core/index.mjs");
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@vueuse/shared/index.mjs");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-demi */ "./node_modules/@vueuse/integrations/node_modules/vue-demi/lib/index.mjs");




function useSortable(el, list, options = {}) {
  let sortable;
  const { document = _vueuse_core__WEBPACK_IMPORTED_MODULE_2__.defaultDocument, ...resetOptions } = options;
  const defaultOptions = {
    onUpdate: (e) => {
      moveArrayElement(list, e.oldIndex, e.newIndex);
    }
  };
  const start = () => {
    const target = typeof el === "string" ? document == null ? void 0 : document.querySelector(el) : (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_2__.unrefElement)(el);
    if (!target || sortable !== void 0)
      return;
    sortable = new sortablejs__WEBPACK_IMPORTED_MODULE_0__["default"](target, { ...defaultOptions, ...resetOptions });
  };
  const stop = () => {
    sortable == null ? void 0 : sortable.destroy();
    sortable = void 0;
  };
  const option = (name, value) => {
    if (value !== void 0)
      sortable == null ? void 0 : sortable.option(name, value);
    else
      return sortable == null ? void 0 : sortable.option(name);
  };
  (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_3__.tryOnMounted)(start);
  (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_3__.tryOnScopeDispose)(stop);
  return {
    stop,
    start,
    option
  };
}
function moveArrayElement(list, from, to) {
  const _valueIsRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.isRef)(list);
  const array = _valueIsRef ? [...(0,_vueuse_core__WEBPACK_IMPORTED_MODULE_3__.toValue)(list)] : (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_3__.toValue)(list);
  if (to >= 0 && to < array.length) {
    const element = array.splice(from, 1)[0];
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
      array.splice(to, 0, element);
      if (_valueIsRef)
        list.value = array;
    });
  }
}




/***/ }),

/***/ "./node_modules/colord/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/colord/index.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Colord: () => (/* binding */ j),
/* harmony export */   colord: () => (/* binding */ w),
/* harmony export */   extend: () => (/* binding */ k),
/* harmony export */   getFormat: () => (/* binding */ I),
/* harmony export */   random: () => (/* binding */ E)
/* harmony export */ });
var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(r){return"string"==typeof r?r.length>0:"number"==typeof r},n=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u=function(r){return(r=isFinite(r)?r%360:0)>0?r:r+360},a=function(r){return{r:e(r.r,0,255),g:e(r.g,0,255),b:e(r.b,0,255),a:e(r.a)}},o=function(r){return{r:n(r.r),g:n(r.g),b:n(r.b),a:n(r.a,3)}},i=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return{h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return{r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g=function(r){return{h:u(r.h),s:e(r.s,0,100),l:e(r.l,0,100),a:e(r.a)}},d=function(r){return{h:n(r.h),s:n(r.s),l:n(r.l),a:n(r.a,3)}},f=function(r){return b((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));var t,n,e},c=function(r){return{h:(t=h(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};var t,n,e,u},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y={string:[[function(r){var t=i.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v.exec(r)||m.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p.exec(t);if(!n)return null;var e,u,a=g({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t(n)&&t(e)&&t(u)?a({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t(n)||!t(e)||!t(u))return null;var i=g({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t(n)||!t(a)||!t(o))return null;var h=function(r){return{h:u(r.h),s:e(r.s,0,100),v:e(r.v,0,100),a:e(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b(h)},"hsv"]]},N=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return[e,t[n][1]]}return[null,void 0]},x=function(r){return"string"==typeof r?N(r.trim(),y.string):"object"==typeof r&&null!==r?N(r,y.object):[null,void 0]},I=function(r){return x(r)[1]},M=function(r,t){var n=c(r);return{h:n.h,s:e(n.s+100*t,0,100),l:n.l,a:n.a}},H=function(r){return(299*r.r+587*r.g+114*r.b)/1e3/255},$=function(r,t){var n=c(r);return{h:n.h,s:n.s,l:e(n.l+100*t,0,100),a:n.a}},j=function(){function r(r){this.parsed=x(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n(H(this.rgba),2)},r.prototype.isDark=function(){return H(this.rgba)<.5},r.prototype.isLight=function(){return H(this.rgba)>=.5},r.prototype.toHex=function(){return r=o(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n(255*a)):"","#"+s(t)+s(e)+s(u)+i;var r,t,e,u,a,i},r.prototype.toRgb=function(){return o(this.rgba)},r.prototype.toRgbString=function(){return r=o(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";var r,t,n,e,u},r.prototype.toHsl=function(){return d(c(this.rgba))},r.prototype.toHslString=function(){return r=d(c(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";var r,t,n,e,u},r.prototype.toHsv=function(){return r=h(this.rgba),{h:n(r.h),s:n(r.s),v:n(r.v),a:n(r.a,3)};var r},r.prototype.invert=function(){return w({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r},r.prototype.saturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,-r))},r.prototype.grayscale=function(){return w(M(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w($(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w($(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return"number"==typeof r?w({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n(this.rgba.a,3);var t},r.prototype.hue=function(r){var t=c(this.rgba);return"number"==typeof r?w({h:r,s:t.s,l:t.l,a:t.a}):n(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w(r).toHex()},r}(),w=function(r){return r instanceof j?r:new j(r)},S=[],k=function(r){r.forEach(function(r){S.indexOf(r)<0&&(r(j,y),S.push(r))})},E=function(){return new j({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "-" + chunkId + ".js?v=" + {"node_modules_nextcloud_dialogs_dist_chunks_index-D5FJasts_mjs":"08b958f56528298001fd","data_image_svg_xml_3c_21--_20-_20SPDX-FileCopyrightText_202020_20Google_20Inc_20-_20SPDX-Lice-84639e":"2dcb905bc800668fb1ac"}[chunkId] + "";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "nextcloud:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"theming-personal-theming": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunknextcloud"] = self["webpackChunknextcloud"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["core-common"], () => (__webpack_require__("./apps/theming/src/personal-settings.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=theming-personal-theming.js.map?v=603cd71ecb5e8ccbe6ef