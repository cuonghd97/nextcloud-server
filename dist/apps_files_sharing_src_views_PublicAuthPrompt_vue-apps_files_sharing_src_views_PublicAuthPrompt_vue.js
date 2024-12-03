"use strict";
(self["webpackChunknextcloud"] = self["webpackChunknextcloud"] || []).push([["apps_files_sharing_src_views_PublicAuthPrompt_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=script&lang=ts":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=script&lang=ts ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcButton.js */ "./node_modules/@nextcloud/vue/dist/Components/NcButton.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcDialog_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcDialog.js */ "./node_modules/@nextcloud/vue/dist/Components/NcDialog.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcNoteCard_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcNoteCard.js */ "./node_modules/@nextcloud/vue/dist/Components/NcNoteCard.mjs");
/* harmony import */ var _nextcloud_vue_dist_Components_NcTextField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/vue/dist/Components/NcTextField.js */ "./node_modules/@nextcloud/vue/dist/Components/NcTextField.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_6__.defineComponent)({
  name: 'PublicAuthPrompt',
  components: {
    NcButton: _nextcloud_vue_dist_Components_NcButton_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    NcDialog: _nextcloud_vue_dist_Components_NcDialog_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    NcNoteCard: _nextcloud_vue_dist_Components_NcNoteCard_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    NcTextField: _nextcloud_vue_dist_Components_NcTextField_js__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  setup() {
    return {
      t: _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__.t,
      owner: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_5__.loadState)('files_sharing', 'owner', ''),
      ownerDisplayName: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_5__.loadState)('files_sharing', 'ownerDisplayName', ''),
      label: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_5__.loadState)('files_sharing', 'label', ''),
      note: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_5__.loadState)('files_sharing', 'note', ''),
      filename: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_5__.loadState)('files_sharing', 'filename', '')
    };
  },
  data() {
    return {
      name: ''
    };
  },
  computed: {
    dialogName() {
      return this.t('files_sharing', 'Upload files to {folder}', {
        folder: this.label || this.filename
      });
    }
  },
  beforeMount() {
    // Pre-load the name from local storage if already set by another app
    // like Talk, Colabora or Text...
    const talkNick = localStorage.getItem('nick');
    if (talkNick) {
      this.name = talkNick;
    }
  },
  methods: {
    onSubmit() {
      const form = this.$refs.form;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (this.name.trim() === '') {
        return;
      }
      localStorage.setItem('nick', this.name);
      this.$emit('close');
    }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=template&id=4bbba25b":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=template&id=4bbba25b ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("NcDialog", {
    staticClass: "public-auth-prompt",
    attrs: {
      "data-cy-public-auth-prompt-dialog": "",
      "dialog-classes": "public-auth-prompt__dialog",
      "can-close": false,
      name: _vm.dialogName
    },
    scopedSlots: _vm._u([{
      key: "actions",
      fn: function () {
        return [_c("NcButton", {
          ref: "submit",
          attrs: {
            "data-cy-public-auth-prompt-dialog-submit": "",
            disabled: _vm.name.trim() === ""
          },
          on: {
            click: _vm.onSubmit
          }
        }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("files_sharing", "Submit name")) + "\n\t\t")])];
      },
      proxy: true
    }])
  }, [_vm.owner ? _c("h3", {
    staticClass: "public-auth-prompt__subtitle"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("files_sharing", "{ownerDisplayName} shared a folder with you.", {
    ownerDisplayName: _vm.ownerDisplayName
  })) + "\n\t")]) : _vm._e(), _vm._v(" "), _c("NcNoteCard", {
    staticClass: "public-auth-prompt__header",
    attrs: {
      type: "info"
    }
  }, [_c("p", {
    staticClass: "public-auth-prompt__description",
    attrs: {
      id: "public-auth-prompt-dialog-description"
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("files_sharing", "To upload files, you need to provide your name first.")) + "\n\t\t")])]), _vm._v(" "), _c("form", {
    ref: "form",
    staticClass: "public-auth-prompt__form",
    attrs: {
      "aria-describedby": "public-auth-prompt-dialog-description"
    },
    on: {
      submit: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    }
  }, [_c("NcTextField", {
    ref: "input",
    staticClass: "public-auth-prompt__input",
    attrs: {
      "data-cy-public-auth-prompt-dialog-name": "",
      label: _vm.t("files_sharing", "Enter your name"),
      minlength: 2,
      required: true,
      value: _vm.name,
      name: "name"
    },
    on: {
      "update:value": function ($event) {
        _vm.name = $event;
      }
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, `.public-auth-prompt__subtitle {
  font-size: 16px;
  margin-block: 12px;
}
.public-auth-prompt__header {
  margin-block: 12px;
}
.public-auth-prompt__form {
  margin-block: 24px;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_style_index_0_id_4bbba25b_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_style_index_0_id_4bbba25b_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_style_index_0_id_4bbba25b_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_style_index_0_id_4bbba25b_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_style_index_0_id_4bbba25b_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./apps/files_sharing/src/views/PublicAuthPrompt.vue":
/*!***********************************************************!*\
  !*** ./apps/files_sharing/src/views/PublicAuthPrompt.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PublicAuthPrompt_vue_vue_type_template_id_4bbba25b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PublicAuthPrompt.vue?vue&type=template&id=4bbba25b */ "./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=template&id=4bbba25b");
/* harmony import */ var _PublicAuthPrompt_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PublicAuthPrompt.vue?vue&type=script&lang=ts */ "./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=script&lang=ts");
/* harmony import */ var _PublicAuthPrompt_vue_vue_type_style_index_0_id_4bbba25b_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss */ "./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PublicAuthPrompt_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PublicAuthPrompt_vue_vue_type_template_id_4bbba25b__WEBPACK_IMPORTED_MODULE_0__.render,
  _PublicAuthPrompt_vue_vue_type_template_id_4bbba25b__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "apps/files_sharing/src/views/PublicAuthPrompt.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=script&lang=ts":
/*!***********************************************************************************!*\
  !*** ./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=script&lang=ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PublicAuthPrompt.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=script&lang=ts");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_4_use_1_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=template&id=4bbba25b":
/*!*****************************************************************************************!*\
  !*** ./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=template&id=4bbba25b ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_template_id_4bbba25b__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_template_id_4bbba25b__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_template_id_4bbba25b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PublicAuthPrompt.vue?vue&type=template&id=4bbba25b */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=template&id=4bbba25b");


/***/ }),

/***/ "./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss":
/*!********************************************************************************************************!*\
  !*** ./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicAuthPrompt_vue_vue_type_style_index_0_id_4bbba25b_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./apps/files_sharing/src/views/PublicAuthPrompt.vue?vue&type=style&index=0&id=4bbba25b&lang=scss");


/***/ })

}]);
//# sourceMappingURL=apps_files_sharing_src_views_PublicAuthPrompt_vue-apps_files_sharing_src_views_PublicAuthPrompt_vue.js.map?v=802f22aa6fe82f5780a3