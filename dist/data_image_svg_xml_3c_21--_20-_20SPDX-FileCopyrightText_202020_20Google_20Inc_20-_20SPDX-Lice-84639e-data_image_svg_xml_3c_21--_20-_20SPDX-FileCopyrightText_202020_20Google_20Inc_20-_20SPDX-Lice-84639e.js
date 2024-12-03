"use strict";
(self["webpackChunknextcloud"] = self["webpackChunknextcloud"] || []).push([["data_image_svg_xml_3c_21--_20-_20SPDX-FileCopyrightText_202020_20Google_20Inc_20-_20SPDX-Lice-84639e"],{

/***/ "./node_modules/@nextcloud/dialogs/node_modules/eventemitter3/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/eventemitter3/index.js ***!
  \*****************************************************************************/
/***/ ((module) => {



var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M15.4%2016.6L10.8%2012l4.6-4.6L14%206l-6%206%206%206%201.4-1.4z%27/%3e%3c/svg%3e":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M15.4%2016.6L10.8%2012l4.6-4.6L14%206l-6%206%206%206%201.4-1.4z%27/%3e%3c/svg%3e ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M15.4%2016.6L10.8%2012l4.6-4.6L14%206l-6%206%206%206%201.4-1.4z%27/%3e%3c/svg%3e";

/***/ }),

/***/ "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M18.4%207.4L17%206l-6%206%206%206%201.4-1.4-4.6-4.6%204.6-4.6m-6%200L11%206l-6%206%206%206%201.4-1.4L7.8%2012l4.6-4.6z%27/%3e%3c/svg%3e":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M18.4%207.4L17%206l-6%206%206%206%201.4-1.4-4.6-4.6%204.6-4.6m-6%200L11%206l-6%206%206%206%201.4-1.4L7.8%2012l4.6-4.6z%27/%3e%3c/svg%3e ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M18.4%207.4L17%206l-6%206%206%206%201.4-1.4-4.6-4.6%204.6-4.6m-6%200L11%206l-6%206%206%206%201.4-1.4L7.8%2012l4.6-4.6z%27/%3e%3c/svg%3e";

/***/ }),

/***/ "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M5.6%207.4L7%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6m6%200L13%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6z%27/%3e%3c/svg%3e":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M5.6%207.4L7%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6m6%200L13%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6z%27/%3e%3c/svg%3e ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M5.6%207.4L7%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6m6%200L13%206l6%206-6%206-1.4-1.4%204.6-4.6-4.6-4.6z%27/%3e%3c/svg%3e";

/***/ }),

/***/ "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M8.6%2016.6l4.6-4.6-4.6-4.6L10%206l6%206-6%206-1.4-1.4z%27/%3e%3c/svg%3e":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M8.6%2016.6l4.6-4.6-4.6-4.6L10%206l6%206-6%206-1.4-1.4z%27/%3e%3c/svg%3e ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3c%21--%20-%20SPDX-FileCopyrightText:%202020%20Google%20Inc.%20-%20SPDX-License-Identifier:%20Apache-2.0%20--%3e%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20fill=%27%23222%27%3e%3cpath%20d=%27M8.6%2016.6l4.6-4.6-4.6-4.6L10%206l6%206-6%206-1.4-1.4z%27/%3e%3c/svg%3e";

/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/dist/chunks/FilePicker-CvXU3iSt.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/dist/chunks/FilePicker-CvXU3iSt.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilePicker)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_plugin-vue2_normalizer-BNL0n0sv.mjs */ "./node_modules/@nextcloud/dialogs/dist/chunks/_plugin-vue2_normalizer-BNL0n0sv.mjs");
/* harmony import */ var _nextcloud_files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/files */ "./node_modules/@nextcloud/files/dist/index.mjs");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var _nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/sharing/public */ "./node_modules/@nextcloud/sharing/dist/public.mjs");
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@nextcloud/dialogs/node_modules/@vueuse/shared/index.mjs");
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.mjs");
/* harmony import */ var p_queue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! p-queue */ "./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/index.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.mjs");
/* harmony import */ var vue_frag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-frag */ "./node_modules/vue-frag/dist/frag.esm.js");
/* harmony import */ var _mdi_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mdi/js */ "./node_modules/@mdi/js/mdi.js");
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.mjs");
/* harmony import */ var cancelable_promise__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cancelable-promise */ "./node_modules/cancelable-promise/umd/CancelablePromise.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! path */ "./node_modules/path/path.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
















const _sfc_main$e = {
  name: "FileIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$e = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon file-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$e = [];
var __component__$e = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$e,
  _sfc_render$e,
  _sfc_staticRenderFns$e,
  false,
  null,
  null
);
const IconFile = __component__$e.exports;
const useFilesSettings = () => {
  var _a, _b, _c;
  const filesUserState = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__.loadState)("files", "config", null);
  const showHiddenFiles = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)((_a = filesUserState == null ? void 0 : filesUserState.show_hidden) != null ? _a : true);
  const sortFavoritesFirst = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)((_b = filesUserState == null ? void 0 : filesUserState.sort_favorites_first) != null ? _b : true);
  const cropImagePreviews = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)((_c = filesUserState == null ? void 0 : filesUserState.crop_image_previews) != null ? _c : true);
  (0,vue__WEBPACK_IMPORTED_MODULE_12__.onMounted)(async () => {
    var _a2, _b2, _c2, _d, _e, _f;
    if (!(0,_nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_5__.isPublicShare)()) {
      try {
        const { data } = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_6__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_4__.generateUrl)("/apps/files/api/v1/configs"));
        showHiddenFiles.value = (_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.show_hidden) != null ? _b2 : false;
        sortFavoritesFirst.value = (_d = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.sort_favorites_first) != null ? _d : true;
        cropImagePreviews.value = (_f = (_e = data == null ? void 0 : data.data) == null ? void 0 : _e.crop_image_previews) != null ? _f : true;
      } catch (error) {
        console.error("Could not load files settings", error);
        (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.l)((0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Could not load files settings"));
      }
    } else {
      console.debug("Skip loading files settings - currently on public share");
    }
  });
  return {
    showHiddenFiles,
    sortFavoritesFirst,
    cropImagePreviews
  };
};
const useFilesViews = (currentView) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const convertOrder = (order2) => order2 === "asc" ? "ascending" : order2 === "desc" ? "descending" : "none";
  const filesViewsState = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_3__.loadState)("files", "viewConfigs", null);
  const filesViewConfig = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)({
    sortBy: (_b = (_a = filesViewsState == null ? void 0 : filesViewsState.files) == null ? void 0 : _a.sorting_mode) != null ? _b : "basename",
    order: convertOrder((_d = (_c = filesViewsState == null ? void 0 : filesViewsState.files) == null ? void 0 : _c.sorting_direction) != null ? _d : "asc")
  });
  const recentViewConfig = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)({
    sortBy: (_f = (_e = filesViewsState == null ? void 0 : filesViewsState.recent) == null ? void 0 : _e.sorting_mode) != null ? _f : "basename",
    order: convertOrder((_h = (_g = filesViewsState == null ? void 0 : filesViewsState.recent) == null ? void 0 : _g.sorting_direction) != null ? _h : "asc")
  });
  const favoritesViewConfig = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)({
    sortBy: (_j = (_i = filesViewsState == null ? void 0 : filesViewsState.favorites) == null ? void 0 : _i.sorting_mode) != null ? _j : "basename",
    order: convertOrder((_l = (_k = filesViewsState == null ? void 0 : filesViewsState.favorites) == null ? void 0 : _k.sorting_direction) != null ? _l : "asc")
  });
  (0,vue__WEBPACK_IMPORTED_MODULE_12__.onMounted)(async () => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m, _n, _o;
    if (!(0,_nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_5__.isPublicShare)()) {
      try {
        const { data } = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_6__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_4__.generateUrl)("/apps/files/api/v1/views"));
        filesViewConfig.value = {
          sortBy: (_c2 = (_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.files) == null ? void 0 : _b2.sorting_mode) != null ? _c2 : "basename",
          order: convertOrder((_e2 = (_d2 = data == null ? void 0 : data.data) == null ? void 0 : _d2.files) == null ? void 0 : _e2.sorting_direction)
        };
        favoritesViewConfig.value = {
          sortBy: (_h2 = (_g2 = (_f2 = data == null ? void 0 : data.data) == null ? void 0 : _f2.favorites) == null ? void 0 : _g2.sorting_mode) != null ? _h2 : "basename",
          order: convertOrder((_j2 = (_i2 = data == null ? void 0 : data.data) == null ? void 0 : _i2.favorites) == null ? void 0 : _j2.sorting_direction)
        };
        recentViewConfig.value = {
          sortBy: (_m = (_l2 = (_k2 = data == null ? void 0 : data.data) == null ? void 0 : _k2.recent) == null ? void 0 : _l2.sorting_mode) != null ? _m : "basename",
          order: convertOrder((_o = (_n = data == null ? void 0 : data.data) == null ? void 0 : _n.recent) == null ? void 0 : _o.sorting_direction)
        };
      } catch (error) {
        console.error("Could not load files views", error);
        (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.l)((0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Could not load files views"));
      }
    } else {
      console.debug("Skip loading files views - currently on public share");
    }
  });
  const currentConfig = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.toValue)(currentView || "files") === "files" ? filesViewConfig.value : (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.toValue)(currentView) === "recent" ? recentViewConfig.value : favoritesViewConfig.value);
  const sortBy = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => currentConfig.value.sortBy);
  const order = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => currentConfig.value.order);
  return {
    filesViewConfig,
    favoritesViewConfig,
    recentViewConfig,
    currentConfig,
    sortBy,
    order
  };
};
const _sfc_main$d = {
  name: "MenuUpIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$d = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon menu-up-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M7,15L12,10L17,15H7Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$d = [];
var __component__$d = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$d,
  _sfc_render$d,
  _sfc_staticRenderFns$d,
  false,
  null,
  null
);
const IconSortAscending = __component__$d.exports;
const _sfc_main$c = {
  name: "MenuDownIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$c = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon menu-down-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M7,10L12,15L17,10H7Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$c = [];
var __component__$c = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$c,
  _sfc_render$c,
  _sfc_staticRenderFns$c,
  false,
  null,
  null
);
const IconSortDescending = __component__$c.exports;
const fileListIconStylesModule = {
  "file-picker__file-icon": "_file-picker__file-icon_19mjt_9"
};
const _sfc_main$b = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_12__.defineComponent)({
  __name: "LoadingTableRow",
  props: {
    showCheckbox: { type: Boolean }
  },
  setup(__props) {
    return { __sfc: true, fileListIconStyles: fileListIconStylesModule };
  }
});
var _sfc_render$b = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("tr", { staticClass: "file-picker__row loading-row", attrs: { "aria-hidden": "true" } }, [_vm.showCheckbox ? _c("td", { staticClass: "row-checkbox" }, [_c("span")]) : _vm._e(), _c("td", { staticClass: "row-name" }, [_c("div", { staticClass: "row-wrapper" }, [_c("span", { class: _setup.fileListIconStyles["file-picker__file-icon"] }), _c("span")])]), _vm._m(0), _vm._m(1)]);
};
var _sfc_staticRenderFns$b = [function() {
  var _vm = this, _c = _vm._self._c;
  _vm._self._setupProxy;
  return _c("td", { staticClass: "row-size" }, [_c("span")]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  _vm._self._setupProxy;
  return _c("td", { staticClass: "row-modified" }, [_c("span")]);
}];
var __component__$b = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$b,
  _sfc_render$b,
  _sfc_staticRenderFns$b,
  false,
  null,
  "15187afc"
);
const LoadingTableRow = __component__$b.exports;
const queue = new p_queue__WEBPACK_IMPORTED_MODULE_14__["default"]({ concurrency: 5 });
function preloadImage(url) {
  const { resolve, promise } = Promise.withResolvers();
  queue.add(() => {
    const image = new Image();
    image.onerror = () => resolve(false);
    image.onload = () => resolve(true);
    image.src = url;
    return promise;
  });
  return promise;
}
function getPreviewURL(node, options = {}) {
  var _a;
  options = { size: 32, cropPreview: false, mimeFallback: true, ...options };
  try {
    const previewUrl = ((_a = node.attributes) == null ? void 0 : _a.previewUrl) || (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_4__.generateUrl)("/core/preview?fileId={fileid}", {
      fileid: node.fileid
    });
    let url;
    try {
      url = new URL(previewUrl);
    } catch (e) {
      url = new URL(previewUrl, window.location.origin);
    }
    url.searchParams.set("x", "".concat(options.size));
    url.searchParams.set("y", "".concat(options.size));
    url.searchParams.set("mimeFallback", "".concat(options.mimeFallback));
    url.searchParams.set("a", options.cropPreview === true ? "0" : "1");
    url.searchParams.set("c", "".concat(node.attributes.etag));
    return url;
  } catch (e) {
    return null;
  }
}
const usePreviewURL = (node, options) => {
  const previewURL = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(null);
  const previewLoaded = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(false);
  (0,vue__WEBPACK_IMPORTED_MODULE_12__.watchEffect)(() => {
    previewLoaded.value = false;
    previewURL.value = getPreviewURL((0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.toValue)(node), (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.toValue)(options || {}));
    if (previewURL.value) {
      preloadImage(previewURL.value.href).then((success) => {
        previewLoaded.value = success;
      });
    }
  });
  return {
    previewURL,
    previewLoaded
  };
};
const _sfc_main$a = {
  name: "FolderIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$a = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon folder-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$a = [];
var __component__$a = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$a,
  _sfc_render$a,
  _sfc_staticRenderFns$a,
  false,
  null,
  null
);
const IconFolder = __component__$a.exports;
const __default__$1 = {
  name: "FilePreview"
};
const _sfc_main$9 = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_12__.defineComponent)({
  ...__default__$1,
  props: {
    node: null,
    cropImagePreviews: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const fileListIconStyles = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(fileListIconStylesModule);
    const {
      previewURL,
      previewLoaded
    } = usePreviewURL((0,vue__WEBPACK_IMPORTED_MODULE_12__.toRef)(props, "node"), (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => ({ cropPreview: props.cropImagePreviews })));
    const isFile = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => props.node.type === _nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.FileType.File);
    return { __sfc: true, fileListIconStyles, props, previewURL, previewLoaded, isFile, IconFile, IconFolder };
  }
});
var _sfc_render$9 = function render6() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { class: _setup.fileListIconStyles["file-picker__file-icon"], style: _setup.previewLoaded ? { backgroundImage: "url(".concat(_setup.previewURL, ")") } : void 0 }, [!_setup.previewLoaded ? [_setup.isFile ? _c(_setup.IconFile, { attrs: { "size": 20 } }) : _c(_setup.IconFolder, { attrs: { "size": 20 } })] : _vm._e()], 2);
};
var _sfc_staticRenderFns$9 = [];
var __component__$9 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$9,
  _sfc_render$9,
  _sfc_staticRenderFns$9,
  false,
  null,
  null
);
const FilePreview = __component__$9.exports;
const _sfc_main$8 = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_12__.defineComponent)({
  __name: "FileListRow",
  props: {
    allowPickDirectory: { type: Boolean },
    selected: { type: Boolean },
    showCheckbox: { type: Boolean },
    canPick: { type: Boolean },
    node: null,
    cropImagePreviews: { type: Boolean }
  },
  emits: ["update:selected", "enter-directory"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const displayName = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
      var _a;
      return ((_a = props.node.attributes) == null ? void 0 : _a.displayName) || props.node.basename.slice(0, props.node.extension ? -props.node.extension.length : void 0);
    });
    const fileExtension = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => props.node.extension);
    const isDirectory = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => props.node.type === _nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.FileType.Folder);
    const isPickable = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => props.canPick && (props.allowPickDirectory || !isDirectory.value));
    function toggleSelected() {
      emit2("update:selected", !props.selected);
    }
    function handleClick() {
      if (isDirectory.value) {
        emit2("enter-directory", props.node);
      } else {
        toggleSelected();
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        handleClick();
      }
    }
    return { __sfc: true, props, emit: emit2, displayName, fileExtension, isDirectory, isPickable, toggleSelected, handleClick, handleKeyDown, formatFileSize: _nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.formatFileSize, NcCheckboxRadioSwitch: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcCheckboxRadioSwitch, NcDateTime: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcDateTime, t: _plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t, FilePreview };
  }
});
var _sfc_render$8 = function render7() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("tr", _vm._g({ class: ["file-picker__row", {
    "file-picker__row--selected": _vm.selected && !_vm.showCheckbox
  }], attrs: { "tabindex": _vm.showCheckbox && !_setup.isDirectory ? void 0 : 0, "aria-selected": !_setup.isPickable ? void 0 : _vm.selected, "data-filename": _vm.node.basename, "data-testid": "file-list-row" } }, {
    click: _setup.handleClick,
    /* same as tabindex -> if we hide the checkbox or this is a directory we need keyboard access to enter the directory or select the node */
    ...!_vm.showCheckbox || _setup.isDirectory ? { keydown: _setup.handleKeyDown } : {}
  }), [_vm.showCheckbox ? _c("td", { staticClass: "row-checkbox", on: { "click": function($event) {
    $event.stopPropagation();
    return (() => {
    }).apply(null, arguments);
  } } }, [_c(_setup.NcCheckboxRadioSwitch, { attrs: { "aria-label": _setup.t("Select the row for {nodename}", { nodename: _setup.displayName }), "checked": _vm.selected, "disabled": !_setup.isPickable, "data-testid": "row-checkbox" }, on: { "update:checked": _setup.toggleSelected } })], 1) : _vm._e(), _c("td", { staticClass: "row-name" }, [_c("div", { staticClass: "file-picker__name-container", attrs: { "data-testid": "row-name" } }, [_c(_setup.FilePreview, { attrs: { "node": _vm.node, "crop-image-previews": _vm.cropImagePreviews } }), _c("div", { staticClass: "file-picker__file-name", attrs: { "title": _setup.displayName }, domProps: { "textContent": _vm._s(_setup.displayName) } }), _c("div", { staticClass: "file-picker__file-extension", domProps: { "textContent": _vm._s(_setup.fileExtension) } })], 1)]), _c("td", { staticClass: "row-size" }, [_vm._v(" " + _vm._s(_setup.formatFileSize(_vm.node.size || 0)) + " ")]), _c("td", { staticClass: "row-modified" }, [_c(_setup.NcDateTime, { attrs: { "timestamp": _vm.node.mtime, "ignore-seconds": true } })], 1)]);
};
var _sfc_staticRenderFns$8 = [];
var __component__$8 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false,
  null,
  "cb12dccb"
);
const FileListRow = __component__$8.exports;
const _sfc_main$7 = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_12__.defineComponent)({
  __name: "FileList",
  props: {
    currentView: null,
    multiselect: { type: Boolean },
    allowPickDirectory: { type: Boolean },
    loading: { type: Boolean },
    files: null,
    selectedFiles: null,
    path: null
  },
  emits: ["update:path", "update:selectedFiles"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const customSortingConfig = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)();
    const { currentConfig: filesAppSorting } = useFilesViews(props.currentView);
    const sortingConfig = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
      var _a;
      return (_a = customSortingConfig.value) != null ? _a : filesAppSorting.value;
    });
    const sortByName = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => sortingConfig.value.sortBy === "basename" ? sortingConfig.value.order === "none" ? void 0 : sortingConfig.value.order : void 0);
    const sortBySize = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => sortingConfig.value.sortBy === "size" ? sortingConfig.value.order === "none" ? void 0 : sortingConfig.value.order : void 0);
    const sortByModified = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => sortingConfig.value.sortBy === "mtime" ? sortingConfig.value.order === "none" ? void 0 : sortingConfig.value.order : void 0);
    const toggleSorting = (sortBy) => {
      if (sortingConfig.value.sortBy === sortBy) {
        if (sortingConfig.value.order === "ascending") {
          customSortingConfig.value = { sortBy: sortingConfig.value.sortBy, order: "descending" };
        } else {
          customSortingConfig.value = { sortBy: sortingConfig.value.sortBy, order: "ascending" };
        }
      } else {
        customSortingConfig.value = { sortBy, order: "ascending" };
      }
    };
    const { sortFavoritesFirst, cropImagePreviews } = useFilesSettings();
    const sortedFiles = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
      return (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.sortNodes)(props.files, {
        sortFoldersFirst: true,
        sortFavoritesFirst: sortFavoritesFirst.value,
        sortingOrder: sortingConfig.value.order === "descending" ? "desc" : "asc",
        sortingMode: sortingConfig.value.sortBy
      });
    });
    const selectableFiles = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => props.files.filter((file) => props.allowPickDirectory || file.type !== _nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.FileType.Folder));
    const allSelected = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => !props.loading && props.selectedFiles.length > 0 && props.selectedFiles.length >= selectableFiles.value.length);
    function onSelectAll() {
      if (props.selectedFiles.length < selectableFiles.value.length) {
        emit2("update:selectedFiles", selectableFiles.value);
      } else {
        emit2("update:selectedFiles", []);
      }
    }
    function onNodeSelected(file) {
      if (props.selectedFiles.includes(file)) {
        emit2("update:selectedFiles", props.selectedFiles.filter((f) => f.path !== file.path));
      } else {
        if (props.multiselect) {
          emit2("update:selectedFiles", [...props.selectedFiles, file]);
        } else {
          emit2("update:selectedFiles", [file]);
        }
      }
    }
    function onChangeDirectory(dir) {
      emit2("update:path", dir.path);
    }
    const skeletonNumber = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(4);
    const fileContainer = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)();
    {
      const resize = () => (0,vue__WEBPACK_IMPORTED_MODULE_12__.nextTick)(() => {
        var _a, _b, _c, _d, _e;
        const nodes = ((_b = (_a = fileContainer.value) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.children) || [];
        let height = ((_d = (_c = fileContainer.value) == null ? void 0 : _c.parentElement) == null ? void 0 : _d.clientHeight) || 450;
        for (let index = 0; index < nodes.length; index++) {
          if (!((_e = fileContainer.value) == null ? void 0 : _e.isSameNode(nodes[index]))) {
            height -= nodes[index].clientHeight;
          }
        }
        skeletonNumber.value = Math.max(1, Math.floor((height - 50) / 50));
      });
      (0,vue__WEBPACK_IMPORTED_MODULE_12__.onMounted)(() => {
        window.addEventListener("resize", resize);
        resize();
      });
      (0,vue__WEBPACK_IMPORTED_MODULE_12__.onUnmounted)(() => {
        window.removeEventListener("resize", resize);
      });
    }
    return { __sfc: true, props, emit: emit2, customSortingConfig, filesAppSorting, sortingConfig, sortByName, sortBySize, sortByModified, toggleSorting, sortFavoritesFirst, cropImagePreviews, sortedFiles, selectableFiles, allSelected, onSelectAll, onNodeSelected, onChangeDirectory, skeletonNumber, fileContainer, NcButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcButton, NcCheckboxRadioSwitch: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcCheckboxRadioSwitch, t: _plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t, IconSortAscending, IconSortDescending, LoadingTableRow, FileListRow };
  }
});
var _sfc_render$7 = function render8() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { ref: "fileContainer", staticClass: "file-picker__files" }, [_c("table", [_c("thead", [_c("tr", [_vm.multiselect ? _c("th", { staticClass: "row-checkbox" }, [_c("span", { staticClass: "hidden-visually" }, [_vm._v(" " + _vm._s(_setup.t("Select entry")) + " ")]), _vm.multiselect ? _c(_setup.NcCheckboxRadioSwitch, { attrs: { "aria-label": _setup.t("Select all entries"), "checked": _setup.allSelected, "data-testid": "select-all-checkbox" }, on: { "update:checked": _setup.onSelectAll } }) : _vm._e()], 1) : _vm._e(), _c("th", { staticClass: "row-name", attrs: { "aria-sort": _setup.sortByName } }, [_c("div", { staticClass: "header-wrapper" }, [_c("span", { staticClass: "file-picker__header-preview" }), _c(_setup.NcButton, { attrs: { "wide": true, "type": "tertiary", "data-test": "file-picker_sort-name" }, on: { "click": function($event) {
    return _setup.toggleSorting("basename");
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_setup.sortByName === "ascending" ? _c(_setup.IconSortAscending, { attrs: { "size": 20 } }) : _setup.sortByName === "descending" ? _c(_setup.IconSortDescending, { attrs: { "size": 20 } }) : _c("span", { staticStyle: { "width": "44px" } })];
  }, proxy: true }]) }, [_vm._v(" " + _vm._s(_setup.t("Name")) + " ")])], 1)]), _c("th", { staticClass: "row-size", attrs: { "aria-sort": _setup.sortBySize } }, [_c(_setup.NcButton, { attrs: { "wide": true, "type": "tertiary" }, on: { "click": function($event) {
    return _setup.toggleSorting("size");
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_setup.sortBySize === "ascending" ? _c(_setup.IconSortAscending, { attrs: { "size": 20 } }) : _setup.sortBySize === "descending" ? _c(_setup.IconSortDescending, { attrs: { "size": 20 } }) : _c("span", { staticStyle: { "width": "44px" } })];
  }, proxy: true }]) }, [_vm._v(" " + _vm._s(_setup.t("Size")) + " ")])], 1), _c("th", { staticClass: "row-modified", attrs: { "aria-sort": _setup.sortByModified } }, [_c(_setup.NcButton, { attrs: { "wide": true, "type": "tertiary" }, on: { "click": function($event) {
    return _setup.toggleSorting("mtime");
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_setup.sortByModified === "ascending" ? _c(_setup.IconSortAscending, { attrs: { "size": 20 } }) : _setup.sortByModified === "descending" ? _c(_setup.IconSortDescending, { attrs: { "size": 20 } }) : _c("span", { staticStyle: { "width": "44px" } })];
  }, proxy: true }]) }, [_vm._v(" " + _vm._s(_setup.t("Modified")) + " ")])], 1)])]), _c("tbody", [_vm.loading ? _vm._l(_setup.skeletonNumber, function(index) {
    return _c(_setup.LoadingTableRow, { key: index, attrs: { "show-checkbox": _vm.multiselect } });
  }) : _vm._l(_setup.sortedFiles, function(file) {
    return _c(_setup.FileListRow, { key: file.fileid || file.path, attrs: { "allow-pick-directory": _vm.allowPickDirectory, "show-checkbox": _vm.multiselect, "can-pick": _vm.multiselect || _vm.selectedFiles.length === 0 || _vm.selectedFiles.includes(file), "selected": _vm.selectedFiles.includes(file), "node": file, "crop-image-previews": _setup.cropImagePreviews }, on: { "update:selected": function($event) {
      return _setup.onNodeSelected(file);
    }, "enter-directory": _setup.onChangeDirectory } });
  })], 2)])]);
};
var _sfc_staticRenderFns$7 = [];
var __component__$7 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false,
  null,
  "006fdbd0"
);
const FileList = __component__$7.exports;
const _sfc_main$6 = {
  name: "HomeIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$6 = function render9() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon home-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$6 = [];
var __component__$6 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  null
);
const IconHome = __component__$6.exports;
const _sfc_main$5 = {
  name: "PlusIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$5 = function render10() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon plus-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  null
);
const IconPlus = __component__$5.exports;
const _sfc_main$4 = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_12__.defineComponent)({
  __name: "FilePickerBreadcrumbs",
  props: {
    path: null,
    showMenu: { type: Boolean }
  },
  emits: ["update:path", "create-node"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const actionsOpen = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(false);
    const newNodeName = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)("");
    const nameInput = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)();
    function validateInput() {
      var _a, _b, _c, _d;
      const name = newNodeName.value.trim();
      const input = (_b = (_a = nameInput.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.querySelector("input");
      let validity = "";
      if (name.length === 0) {
        validity = (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Folder name cannot be empty.");
      } else if (name.includes("/")) {
        validity = (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)('"/" is not allowed inside a folder name.');
      } else if (["..", "."].includes(name)) {
        validity = (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)('"{name}" is an invalid folder name.', { name });
      } else if (((_c = window.OC.config) == null ? void 0 : _c.blacklist_files_regex) && name.match((_d = window.OC.config) == null ? void 0 : _d.blacklist_files_regex)) {
        validity = (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)('"{name}" is not an allowed folder name', { name });
      }
      if (input) {
        input.setCustomValidity(validity);
      }
      return validity === "";
    }
    const onSubmit = function() {
      const name = newNodeName.value.trim();
      if (validateInput()) {
        actionsOpen.value = false;
        emit2("create-node", name);
        newNodeName.value = "";
      }
    };
    const pathElements = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(
      () => props.path.split("/").filter((v) => v !== "").map((v, i, elements) => ({
        name: v,
        path: "/" + elements.slice(0, i + 1).join("/")
      }))
    );
    return { __sfc: true, props, emit: emit2, actionsOpen, newNodeName, nameInput, validateInput, onSubmit, pathElements, IconFolder, IconHome, IconPlus, NcActions: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcActions, NcActionInput: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcActionInput, NcBreadcrumbs: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcBreadcrumbs, NcBreadcrumb: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcBreadcrumb, t: _plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t };
  }
});
var _sfc_render$4 = function render11() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c(_setup.NcBreadcrumbs, { staticClass: "file-picker__breadcrumbs", scopedSlots: _vm._u([{ key: "default", fn: function() {
    return [_c(_setup.NcBreadcrumb, { attrs: { "name": _setup.t("All files"), "title": _setup.t("Home") }, on: { "click": function($event) {
      return _setup.emit("update:path", "/");
    } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
      return [_c(_setup.IconHome, { attrs: { "size": 20 } })];
    }, proxy: true }]) }), _vm._l(_setup.pathElements, function(dir) {
      return _c(_setup.NcBreadcrumb, { key: dir.path, attrs: { "name": dir.name, "title": dir.path }, on: { "click": function($event) {
        return _setup.emit("update:path", dir.path);
      } } });
    })];
  }, proxy: true }, _vm.showMenu ? { key: "actions", fn: function() {
    return [_c(_setup.NcActions, { attrs: { "aria-label": _setup.t("Create directory"), "force-menu": true, "force-name": true, "menu-name": _setup.t("New"), "open": _setup.actionsOpen, "type": "secondary" }, on: { "update:open": function($event) {
      _setup.actionsOpen = $event;
    }, "close": function($event) {
      _setup.newNodeName = "";
    } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
      return [_c(_setup.IconPlus, { attrs: { "size": 20 } })];
    }, proxy: true }], null, false, 2971667417) }, [_c(_setup.NcActionInput, { ref: "nameInput", attrs: { "value": _setup.newNodeName, "label": _setup.t("New folder"), "placeholder": _setup.t("New folder name") }, on: { "update:value": function($event) {
      _setup.newNodeName = $event;
    }, "submit": _setup.onSubmit, "input": _setup.validateInput }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
      return [_c(_setup.IconFolder, { attrs: { "size": 20 } })];
    }, proxy: true }], null, false, 1614167509) })], 1)];
  }, proxy: true } : null], null, true) });
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  "b357227a"
);
const FilePickerBreadcrumbs = __component__$4.exports;
const _sfc_main$3 = {
  name: "CloseIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$3 = function render12() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon close-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null
);
const IconClose = __component__$3.exports;
const _sfc_main$2 = {
  name: "MagnifyIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
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
};
var _sfc_render$2 = function render13() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon magnify-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null
);
const IconMagnify = __component__$2.exports;
const useViews = (isAnonymous) => {
  const allViews = [
    {
      id: "files",
      label: (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("All files"),
      icon: _mdi_js__WEBPACK_IMPORTED_MODULE_15__.mdiFolder
    },
    {
      id: "recent",
      label: (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Recent"),
      icon: _mdi_js__WEBPACK_IMPORTED_MODULE_15__.mdiClock
    },
    {
      id: "favorites",
      label: (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Favorites"),
      icon: _mdi_js__WEBPACK_IMPORTED_MODULE_15__.mdiStar
    }
  ];
  const availableViews = isAnonymous.value ? allViews.filter(({ id }) => id === "files") : allViews;
  return {
    allViews,
    availableViews
  };
};
const _sfc_main$1 = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_12__.defineComponent)({
  __name: "FilePickerNavigation",
  props: {
    currentView: null,
    filterString: null,
    isCollapsed: { type: Boolean },
    disabledNavigation: { type: Boolean }
  },
  emits: ["update:currentView", "update:filterString"],
  setup(__props, { emit: emit2 }) {
    const props = __props;
    const { availableViews } = useViews((0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)((0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_7__.getCurrentUser)() === null));
    const currentViewObject = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
      var _a;
      return (_a = availableViews.filter((v) => v.id === props.currentView)[0]) != null ? _a : availableViews[0];
    });
    const updateFilterValue = (value) => emit2("update:filterString", value);
    return { __sfc: true, props, emit: emit2, availableViews, currentViewObject, updateFilterValue, IconClose, IconMagnify, NcButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcButton, NcIconSvgWrapper: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcIconSvgWrapper, NcSelect: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcSelect, NcTextField: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcTextField, Fragment: vue_frag__WEBPACK_IMPORTED_MODULE_8__.Fragment, t: _plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t };
  }
});
var _sfc_render$1 = function render14() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c(_setup.Fragment, [_c(_setup.NcTextField, { staticClass: "file-picker__filter-input", attrs: { "value": _vm.filterString, "label": _setup.t("Filter file list"), "show-trailing-button": !!_vm.filterString }, on: { "update:value": _setup.updateFilterValue, "trailing-button-click": function($event) {
    return _setup.updateFilterValue("");
  } }, scopedSlots: _vm._u([{ key: "trailing-button-icon", fn: function() {
    return [_c(_setup.IconClose, { attrs: { "size": 16 } })];
  }, proxy: true }]) }, [_c(_setup.IconMagnify, { attrs: { "size": 16 } })], 1), _setup.availableViews.length > 1 && !_vm.disabledNavigation ? [!_vm.isCollapsed ? _c("ul", { staticClass: "file-picker__side" }, _vm._l(_setup.availableViews, function(view) {
    return _c("li", { key: view.id }, [_c(_setup.NcButton, { attrs: { "type": _vm.currentView === view.id ? "primary" : "tertiary", "wide": true }, on: { "click": function($event) {
      return _vm.$emit("update:currentView", view.id);
    } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
      return [_c(_setup.NcIconSvgWrapper, { attrs: { "path": view.icon, "size": 20 } })];
    }, proxy: true }], null, true) }, [_vm._v(" " + _vm._s(view.label) + " ")])], 1);
  }), 0) : _c(_setup.NcSelect, { attrs: { "aria-label": _setup.t("Current view selector"), "clearable": false, "searchable": false, "options": _setup.availableViews, "value": _setup.currentViewObject }, on: { "input": (v) => _setup.emit("update:currentView", v.id) } })] : _vm._e()], 2);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "b42054b8"
);
const FilePickerNavigation = __component__$1.exports;
function getRecentNodes(client) {
  const controller = new AbortController();
  const lastTwoWeek = Math.round(Date.now() / 1e3) - 60 * 60 * 24 * 14;
  return new cancelable_promise__WEBPACK_IMPORTED_MODULE_10__.CancelablePromise(async (resolve, reject, onCancel) => {
    onCancel(() => controller.abort());
    try {
      const { data } = await client.search("/", {
        signal: controller.signal,
        details: true,
        data: (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davGetRecentSearch)(lastTwoWeek)
      });
      const nodes = data.results.map((result) => (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davResultToNode)(result));
      resolve(nodes);
    } catch (error) {
      reject(error);
    }
  });
}
function getNodes(client, directoryPath) {
  const controller = new AbortController();
  return new cancelable_promise__WEBPACK_IMPORTED_MODULE_10__.CancelablePromise(async (resolve, reject, onCancel) => {
    onCancel(() => controller.abort());
    try {
      const results = await client.getDirectoryContents((0,path__WEBPACK_IMPORTED_MODULE_11__.join)(_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davRootPath, directoryPath), {
        signal: controller.signal,
        details: true,
        includeSelf: true,
        data: (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davGetDefaultPropfind)()
      });
      const nodes = results.data.map((result) => (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davResultToNode)(result));
      resolve({
        contents: nodes.filter(({ path }) => path !== directoryPath),
        folder: nodes.find(({ path }) => path === directoryPath)
      });
    } catch (error) {
      reject(error);
    }
  });
}
async function getFile(client, path) {
  const { data } = await client.stat((0,path__WEBPACK_IMPORTED_MODULE_11__.join)(_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davRootPath, path), {
    details: true,
    data: (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davGetDefaultPropfind)()
  });
  return (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davResultToNode)(data);
}
const useDAVFiles = function(currentView, currentPath) {
  const client = (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davGetClient)();
  const files = (0,vue__WEBPACK_IMPORTED_MODULE_12__.shallowRef)([]);
  const folder = (0,vue__WEBPACK_IMPORTED_MODULE_12__.shallowRef)(null);
  const isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(true);
  const promise = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(null);
  async function createDirectory(name) {
    const path = (0,path__WEBPACK_IMPORTED_MODULE_11__.join)(currentPath.value, name);
    await client.createDirectory((0,path__WEBPACK_IMPORTED_MODULE_11__.join)(_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.davRootPath, path));
    const directory = await getFile(client, path);
    files.value = [...files.value, directory];
    return directory;
  }
  async function loadDAVFiles() {
    if (promise.value) {
      promise.value.cancel();
    }
    isLoading.value = true;
    if (currentView.value === "favorites") {
      promise.value = (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_1__.getFavoriteNodes)(client, currentPath.value);
    } else if (currentView.value === "recent") {
      promise.value = getRecentNodes(client);
    } else {
      promise.value = getNodes(client, currentPath.value);
    }
    const content = await promise.value;
    if ("folder" in content) {
      folder.value = content.folder;
      files.value = content.contents;
    } else {
      folder.value = null;
      files.value = content;
    }
    promise.value = null;
    isLoading.value = false;
  }
  (0,vue__WEBPACK_IMPORTED_MODULE_12__.watch)([currentView, currentPath], () => loadDAVFiles());
  (0,vue__WEBPACK_IMPORTED_MODULE_12__.onMounted)(() => loadDAVFiles());
  return {
    isLoading,
    files,
    folder,
    loadFiles: loadDAVFiles,
    createDirectory
  };
};
const useMimeFilter = function(allowedMIMETypes) {
  const splittedTypes = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => allowedMIMETypes.value.map((filter) => filter.split("/")));
  const isSupportedMimeType = (mime) => {
    const mimeTypeArray = mime.split("/");
    return splittedTypes.value.some(
      ([type, subtype]) => (
        // check mime type matches or is wildcard
        (mimeTypeArray[0] === type || type === "*") && (mimeTypeArray[1] === subtype || subtype === "*")
      )
    );
  };
  return {
    isSupportedMimeType
  };
};
const __default__ = {
  name: "FilePicker"
};
const _sfc_main = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_12__.defineComponent)({
  ...__default__,
  props: {
    buttons: null,
    name: null,
    allowPickDirectory: { type: Boolean, default: false },
    disabledNavigation: { type: Boolean, default: false },
    container: { default: "body" },
    filterFn: { default: void 0 },
    mimetypeFilter: { default: () => [] },
    multiselect: { type: Boolean, default: true },
    path: { default: void 0 }
  },
  emits: ["close"],
  setup(__props, { emit: emit$1 }) {
    const props = __props;
    const isOpen = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)(true);
    const dialogButtons = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
      const nodes = selectedFiles.value.length === 0 && props.allowPickDirectory && currentFolder.value ? [currentFolder.value] : selectedFiles.value;
      const buttons = typeof props.buttons === "function" ? props.buttons(nodes, currentPath.value, currentView.value) : props.buttons;
      return buttons.map((button) => ({
        ...button,
        disabled: button.disabled || isLoading.value,
        callback: () => {
          isHandlingCallback = true;
          handleButtonClick(button.callback, nodes);
        }
      }));
    });
    let isHandlingCallback = false;
    const handleButtonClick = async (callback, nodes) => {
      callback(nodes);
      emit$1("close", nodes);
      isHandlingCallback = false;
    };
    const currentView = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)("files");
    const viewHeadline = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => currentView.value === "favorites" ? (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Favorites") : currentView.value === "recent" ? (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Recent") : "");
    const selectedFiles = (0,vue__WEBPACK_IMPORTED_MODULE_12__.shallowRef)([]);
    const savedPath = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)((window == null ? void 0 : window.sessionStorage.getItem("NC.FilePicker.LastPath")) || "/");
    const navigatedPath = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)("");
    (0,vue__WEBPACK_IMPORTED_MODULE_12__.watch)([navigatedPath], () => {
      if (props.path === void 0 && navigatedPath.value) {
        window.sessionStorage.setItem("NC.FilePicker.LastPath", navigatedPath.value);
      }
      selectedFiles.value = [];
    });
    const currentPath = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)({
      get: () => {
        return currentView.value === "files" ? navigatedPath.value || props.path || savedPath.value : "/";
      },
      set: (path) => {
        navigatedPath.value = path;
      }
    });
    const filterString = (0,vue__WEBPACK_IMPORTED_MODULE_12__.ref)("");
    const { isSupportedMimeType } = useMimeFilter((0,vue__WEBPACK_IMPORTED_MODULE_12__.toRef)(props, "mimetypeFilter"));
    const {
      files,
      folder: currentFolder,
      isLoading,
      loadFiles,
      createDirectory
    } = useDAVFiles(currentView, currentPath);
    (0,vue__WEBPACK_IMPORTED_MODULE_12__.onMounted)(() => loadFiles());
    const { showHiddenFiles } = useFilesSettings();
    const filteredFiles = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
      let filtered = files.value;
      if (!showHiddenFiles.value) {
        filtered = filtered.filter((file) => !file.basename.startsWith("."));
      }
      if (props.mimetypeFilter.length > 0) {
        filtered = filtered.filter((file) => file.type === "folder" || file.mime && isSupportedMimeType(file.mime));
      }
      if (filterString.value) {
        filtered = filtered.filter((file) => file.basename.toLowerCase().includes(filterString.value.toLowerCase()));
      }
      if (props.filterFn) {
        filtered = filtered.filter((f) => props.filterFn(f));
      }
      return filtered;
    });
    const noFilesDescription = (0,vue__WEBPACK_IMPORTED_MODULE_12__.computed)(() => {
      if (currentView.value === "files") {
        return (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Upload some content or sync with your devices!");
      } else if (currentView.value === "recent") {
        return (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Files and folders you recently modified will show up here.");
      } else {
        return (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Files and folders you mark as favorite will show up here.");
      }
    });
    const onCreateFolder = async (name) => {
      try {
        const folder = await createDirectory(name);
        navigatedPath.value = folder.path;
        (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_9__.emit)("files:node:created", files.value.filter((file) => file.basename === name)[0]);
      } catch (error) {
        console.warn("Could not create new folder", { name, error });
        (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.l)((0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t)("Could not create the new folder"));
      }
    };
    const handleClose = (open) => {
      if (!open && !isHandlingCallback) {
        emit$1("close");
      }
    };
    return { __sfc: true, props, emit: emit$1, isOpen, dialogButtons, isHandlingCallback, handleButtonClick, currentView, viewHeadline, selectedFiles, savedPath, navigatedPath, currentPath, filterString, isSupportedMimeType, files, currentFolder, isLoading, loadFiles, createDirectory, showHiddenFiles, filteredFiles, noFilesDescription, onCreateFolder, handleClose, IconFile, FileList, FilePickerBreadcrumbs, FilePickerNavigation, NcDialog: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcDialog, NcEmptyContent: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcEmptyContent, t: _plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.t };
  }
});
var _sfc_render = function render15() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c(_setup.NcDialog, { attrs: { "container": _vm.container, "buttons": _setup.dialogButtons, "name": _vm.name, "size": "large", "content-classes": "file-picker__content", "dialog-classes": "file-picker", "navigation-classes": "file-picker__navigation", "open": _setup.isOpen }, on: { "update:open": [function($event) {
    _setup.isOpen = $event;
  }, _setup.handleClose] }, scopedSlots: _vm._u([{ key: "navigation", fn: function({ isCollapsed }) {
    return [_c(_setup.FilePickerNavigation, { attrs: { "is-collapsed": isCollapsed, "current-view": _setup.currentView, "filter-string": _setup.filterString, "disabled-navigation": _vm.disabledNavigation }, on: { "update:currentView": function($event) {
      _setup.currentView = $event;
    }, "update:current-view": function($event) {
      _setup.currentView = $event;
    }, "update:filterString": function($event) {
      _setup.filterString = $event;
    }, "update:filter-string": function($event) {
      _setup.filterString = $event;
    } } })];
  } }]) }, [_c("div", { staticClass: "file-picker__main" }, [_setup.currentView === "files" ? _c(_setup.FilePickerBreadcrumbs, { attrs: { "path": _setup.currentPath, "show-menu": _vm.allowPickDirectory }, on: { "update:path": function($event) {
    _setup.currentPath = $event;
  }, "create-node": _setup.onCreateFolder } }) : _c("div", { staticClass: "file-picker__view" }, [_c("h3", [_vm._v(_vm._s(_setup.viewHeadline))])]), _setup.isLoading || _setup.filteredFiles.length > 0 ? _c(_setup.FileList, { attrs: { "allow-pick-directory": _vm.allowPickDirectory, "current-view": _setup.currentView, "files": _setup.filteredFiles, "multiselect": _vm.multiselect, "loading": _setup.isLoading, "path": _setup.currentPath, "selected-files": _setup.selectedFiles, "name": _setup.viewHeadline }, on: { "update:path": [function($event) {
    _setup.currentPath = $event;
  }, function($event) {
    _setup.currentView = "files";
  }], "update:selectedFiles": function($event) {
    _setup.selectedFiles = $event;
  }, "update:selected-files": function($event) {
    _setup.selectedFiles = $event;
  } } }) : _setup.filterString ? _c(_setup.NcEmptyContent, { attrs: { "name": _setup.t("No matching files"), "description": _setup.t("No files matching your filter were found.") }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c(_setup.IconFile)];
  }, proxy: true }]) }) : _c(_setup.NcEmptyContent, { attrs: { "name": _setup.t("No files in here"), "description": _setup.noFilesDescription }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c(_setup.IconFile)];
  }, proxy: true }]) })], 1)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ (0,_plugin_vue2_normalizer_BNL0n0sv_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "20b719ba"
);
const FilePicker = __component__.exports;



/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/node_modules/@vueuse/shared/index.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/@vueuse/shared/index.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ assert),
/* harmony export */   autoResetRef: () => (/* binding */ refAutoReset),
/* harmony export */   bypassFilter: () => (/* binding */ bypassFilter),
/* harmony export */   camelize: () => (/* binding */ camelize),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   computedEager: () => (/* binding */ computedEager),
/* harmony export */   computedWithControl: () => (/* binding */ computedWithControl),
/* harmony export */   containsProp: () => (/* binding */ containsProp),
/* harmony export */   controlledComputed: () => (/* binding */ computedWithControl),
/* harmony export */   controlledRef: () => (/* binding */ controlledRef),
/* harmony export */   createEventHook: () => (/* binding */ createEventHook),
/* harmony export */   createFilterWrapper: () => (/* binding */ createFilterWrapper),
/* harmony export */   createGlobalState: () => (/* binding */ createGlobalState),
/* harmony export */   createInjectionState: () => (/* binding */ createInjectionState),
/* harmony export */   createReactiveFn: () => (/* binding */ reactify),
/* harmony export */   createSharedComposable: () => (/* binding */ createSharedComposable),
/* harmony export */   createSingletonPromise: () => (/* binding */ createSingletonPromise),
/* harmony export */   debounceFilter: () => (/* binding */ debounceFilter),
/* harmony export */   debouncedRef: () => (/* binding */ refDebounced),
/* harmony export */   debouncedWatch: () => (/* binding */ watchDebounced),
/* harmony export */   directiveHooks: () => (/* binding */ directiveHooks),
/* harmony export */   eagerComputed: () => (/* binding */ computedEager),
/* harmony export */   extendRef: () => (/* binding */ extendRef),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   getLifeCycleTarget: () => (/* binding */ getLifeCycleTarget),
/* harmony export */   hasOwn: () => (/* binding */ hasOwn),
/* harmony export */   hyphenate: () => (/* binding */ hyphenate),
/* harmony export */   identity: () => (/* binding */ identity),
/* harmony export */   ignorableWatch: () => (/* binding */ watchIgnorable),
/* harmony export */   increaseWithUnit: () => (/* binding */ increaseWithUnit),
/* harmony export */   injectLocal: () => (/* binding */ injectLocal),
/* harmony export */   invoke: () => (/* binding */ invoke),
/* harmony export */   isClient: () => (/* binding */ isClient),
/* harmony export */   isDef: () => (/* binding */ isDef),
/* harmony export */   isDefined: () => (/* binding */ isDefined),
/* harmony export */   isIOS: () => (/* binding */ isIOS),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isWorker: () => (/* binding */ isWorker),
/* harmony export */   makeDestructurable: () => (/* binding */ makeDestructurable),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   normalizeDate: () => (/* binding */ normalizeDate),
/* harmony export */   notNullish: () => (/* binding */ notNullish),
/* harmony export */   now: () => (/* binding */ now),
/* harmony export */   objectEntries: () => (/* binding */ objectEntries),
/* harmony export */   objectOmit: () => (/* binding */ objectOmit),
/* harmony export */   objectPick: () => (/* binding */ objectPick),
/* harmony export */   pausableFilter: () => (/* binding */ pausableFilter),
/* harmony export */   pausableWatch: () => (/* binding */ watchPausable),
/* harmony export */   promiseTimeout: () => (/* binding */ promiseTimeout),
/* harmony export */   provideLocal: () => (/* binding */ provideLocal),
/* harmony export */   rand: () => (/* binding */ rand),
/* harmony export */   reactify: () => (/* binding */ reactify),
/* harmony export */   reactifyObject: () => (/* binding */ reactifyObject),
/* harmony export */   reactiveComputed: () => (/* binding */ reactiveComputed),
/* harmony export */   reactiveOmit: () => (/* binding */ reactiveOmit),
/* harmony export */   reactivePick: () => (/* binding */ reactivePick),
/* harmony export */   refAutoReset: () => (/* binding */ refAutoReset),
/* harmony export */   refDebounced: () => (/* binding */ refDebounced),
/* harmony export */   refDefault: () => (/* binding */ refDefault),
/* harmony export */   refThrottled: () => (/* binding */ refThrottled),
/* harmony export */   refWithControl: () => (/* binding */ refWithControl),
/* harmony export */   resolveRef: () => (/* binding */ resolveRef),
/* harmony export */   resolveUnref: () => (/* binding */ resolveUnref),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   syncRef: () => (/* binding */ syncRef),
/* harmony export */   syncRefs: () => (/* binding */ syncRefs),
/* harmony export */   throttleFilter: () => (/* binding */ throttleFilter),
/* harmony export */   throttledRef: () => (/* binding */ refThrottled),
/* harmony export */   throttledWatch: () => (/* binding */ watchThrottled),
/* harmony export */   timestamp: () => (/* binding */ timestamp),
/* harmony export */   toReactive: () => (/* binding */ toReactive),
/* harmony export */   toRef: () => (/* binding */ toRef),
/* harmony export */   toRefs: () => (/* binding */ toRefs),
/* harmony export */   toValue: () => (/* binding */ toValue),
/* harmony export */   tryOnBeforeMount: () => (/* binding */ tryOnBeforeMount),
/* harmony export */   tryOnBeforeUnmount: () => (/* binding */ tryOnBeforeUnmount),
/* harmony export */   tryOnMounted: () => (/* binding */ tryOnMounted),
/* harmony export */   tryOnScopeDispose: () => (/* binding */ tryOnScopeDispose),
/* harmony export */   tryOnUnmounted: () => (/* binding */ tryOnUnmounted),
/* harmony export */   until: () => (/* binding */ until),
/* harmony export */   useArrayDifference: () => (/* binding */ useArrayDifference),
/* harmony export */   useArrayEvery: () => (/* binding */ useArrayEvery),
/* harmony export */   useArrayFilter: () => (/* binding */ useArrayFilter),
/* harmony export */   useArrayFind: () => (/* binding */ useArrayFind),
/* harmony export */   useArrayFindIndex: () => (/* binding */ useArrayFindIndex),
/* harmony export */   useArrayFindLast: () => (/* binding */ useArrayFindLast),
/* harmony export */   useArrayIncludes: () => (/* binding */ useArrayIncludes),
/* harmony export */   useArrayJoin: () => (/* binding */ useArrayJoin),
/* harmony export */   useArrayMap: () => (/* binding */ useArrayMap),
/* harmony export */   useArrayReduce: () => (/* binding */ useArrayReduce),
/* harmony export */   useArraySome: () => (/* binding */ useArraySome),
/* harmony export */   useArrayUnique: () => (/* binding */ useArrayUnique),
/* harmony export */   useCounter: () => (/* binding */ useCounter),
/* harmony export */   useDateFormat: () => (/* binding */ useDateFormat),
/* harmony export */   useDebounce: () => (/* binding */ refDebounced),
/* harmony export */   useDebounceFn: () => (/* binding */ useDebounceFn),
/* harmony export */   useInterval: () => (/* binding */ useInterval),
/* harmony export */   useIntervalFn: () => (/* binding */ useIntervalFn),
/* harmony export */   useLastChanged: () => (/* binding */ useLastChanged),
/* harmony export */   useThrottle: () => (/* binding */ refThrottled),
/* harmony export */   useThrottleFn: () => (/* binding */ useThrottleFn),
/* harmony export */   useTimeout: () => (/* binding */ useTimeout),
/* harmony export */   useTimeoutFn: () => (/* binding */ useTimeoutFn),
/* harmony export */   useToNumber: () => (/* binding */ useToNumber),
/* harmony export */   useToString: () => (/* binding */ useToString),
/* harmony export */   useToggle: () => (/* binding */ useToggle),
/* harmony export */   watchArray: () => (/* binding */ watchArray),
/* harmony export */   watchAtMost: () => (/* binding */ watchAtMost),
/* harmony export */   watchDebounced: () => (/* binding */ watchDebounced),
/* harmony export */   watchDeep: () => (/* binding */ watchDeep),
/* harmony export */   watchIgnorable: () => (/* binding */ watchIgnorable),
/* harmony export */   watchImmediate: () => (/* binding */ watchImmediate),
/* harmony export */   watchOnce: () => (/* binding */ watchOnce),
/* harmony export */   watchPausable: () => (/* binding */ watchPausable),
/* harmony export */   watchThrottled: () => (/* binding */ watchThrottled),
/* harmony export */   watchTriggerable: () => (/* binding */ watchTriggerable),
/* harmony export */   watchWithFilter: () => (/* binding */ watchWithFilter),
/* harmony export */   whenever: () => (/* binding */ whenever)
/* harmony export */ });
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/@nextcloud/dialogs/node_modules/@vueuse/shared/node_modules/vue-demi/lib/index.mjs");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");


function computedEager(fn, options) {
  var _a;
  const result = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.shallowRef)();
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watchEffect)(() => {
    result.value = fn();
  }, {
    ...options,
    flush: (_a = options == null ? void 0 : options.flush) != null ? _a : "sync"
  });
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.readonly)(result);
}

function computedWithControl(source, fn) {
  let v = void 0;
  let track;
  let trigger;
  const dirty = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
  const update = () => {
    dirty.value = true;
    trigger();
  };
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(source, update, { flush: "sync" });
  const get = typeof fn === "function" ? fn : fn.get;
  const set = typeof fn === "function" ? void 0 : fn.set;
  const result = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.customRef)((_track, _trigger) => {
    track = _track;
    trigger = _trigger;
    return {
      get() {
        if (dirty.value) {
          v = get(v);
          dirty.value = false;
        }
        track();
        return v;
      },
      set(v2) {
        set == null ? void 0 : set(v2);
      }
    };
  });
  if (Object.isExtensible(result))
    result.trigger = update;
  return result;
}

function tryOnScopeDispose(fn) {
  if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)()) {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose)(fn);
    return true;
  }
  return false;
}

function createEventHook() {
  const fns = /* @__PURE__ */ new Set();
  const off = (fn) => {
    fns.delete(fn);
  };
  const on = (fn) => {
    fns.add(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return {
      off: offFn
    };
  };
  const trigger = (...args) => {
    return Promise.all(Array.from(fns).map((fn) => fn(...args)));
  };
  return {
    on,
    off,
    trigger
  };
}

function createGlobalState(stateFactory) {
  let initialized = false;
  let state;
  const scope = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.effectScope)(true);
  return (...args) => {
    if (!initialized) {
      state = scope.run(() => stateFactory(...args));
      initialized = true;
    }
    return state;
  };
}

const localProvidedStateMap = /* @__PURE__ */ new WeakMap();

const injectLocal = (...args) => {
  var _a;
  const key = args[0];
  const instance = (_a = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)()) == null ? void 0 : _a.proxy;
  if (instance == null)
    throw new Error("injectLocal must be called in setup");
  if (localProvidedStateMap.has(instance) && key in localProvidedStateMap.get(instance))
    return localProvidedStateMap.get(instance)[key];
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.inject)(...args);
};

const provideLocal = (key, value) => {
  var _a;
  const instance = (_a = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)()) == null ? void 0 : _a.proxy;
  if (instance == null)
    throw new Error("provideLocal must be called in setup");
  if (!localProvidedStateMap.has(instance))
    localProvidedStateMap.set(instance, /* @__PURE__ */ Object.create(null));
  const localProvidedState = localProvidedStateMap.get(instance);
  localProvidedState[key] = value;
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.provide)(key, value);
};

function createInjectionState(composable, options) {
  const key = (options == null ? void 0 : options.injectionKey) || Symbol(composable.name || "InjectionState");
  const defaultValue = options == null ? void 0 : options.defaultValue;
  const useProvidingState = (...args) => {
    const state = composable(...args);
    provideLocal(key, state);
    return state;
  };
  const useInjectedState = () => injectLocal(key, defaultValue);
  return [useProvidingState, useInjectedState];
}

function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!scope) {
      scope = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.effectScope)(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}

function extendRef(ref, extend, { enumerable = false, unwrap = true } = {}) {
  if (!vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue3 && !vue_demi__WEBPACK_IMPORTED_MODULE_0__.version.startsWith("2.7.")) {
    if (true)
      throw new Error("[VueUse] extendRef only works in Vue 2.7 or above.");
    return;
  }
  for (const [key, value] of Object.entries(extend)) {
    if (key === "value")
      continue;
    if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(value) && unwrap) {
      Object.defineProperty(ref, key, {
        get() {
          return value.value;
        },
        set(v) {
          value.value = v;
        },
        enumerable
      });
    } else {
      Object.defineProperty(ref, key, { value, enumerable });
    }
  }
  return ref;
}

function get(obj, key) {
  if (key == null)
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(obj);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(obj)[key];
}

function isDefined(v) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(v) != null;
}

function makeDestructurable(obj, arr) {
  if (typeof Symbol !== "undefined") {
    const clone = { ...obj };
    Object.defineProperty(clone, Symbol.iterator, {
      enumerable: false,
      value() {
        let index = 0;
        return {
          next: () => ({
            value: arr[index++],
            done: index > arr.length
          })
        };
      }
    });
    return clone;
  } else {
    return Object.assign([...arr], obj);
  }
}

function toValue(r) {
  return typeof r === "function" ? r() : (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(r);
}
const resolveUnref = toValue;

function reactify(fn, options) {
  const unrefFn = (options == null ? void 0 : options.computedGetter) === false ? vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref : toValue;
  return function(...args) {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => fn.apply(this, args.map((i) => unrefFn(i))));
  };
}

function reactifyObject(obj, optionsOrKeys = {}) {
  let keys = [];
  let options;
  if (Array.isArray(optionsOrKeys)) {
    keys = optionsOrKeys;
  } else {
    options = optionsOrKeys;
    const { includeOwnProperties = true } = optionsOrKeys;
    keys.push(...Object.keys(obj));
    if (includeOwnProperties)
      keys.push(...Object.getOwnPropertyNames(obj));
  }
  return Object.fromEntries(
    keys.map((key) => {
      const value = obj[key];
      return [
        key,
        typeof value === "function" ? reactify(value.bind(obj), options) : value
      ];
    })
  );
}

function toReactive(objectRef) {
  if (!(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(objectRef))
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.reactive)(objectRef);
  const proxy = new Proxy({}, {
    get(_, p, receiver) {
      return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(Reflect.get(objectRef.value, p, receiver));
    },
    set(_, p, value) {
      if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(objectRef.value[p]) && !(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(value))
        objectRef.value[p].value = value;
      else
        objectRef.value[p] = value;
      return true;
    },
    deleteProperty(_, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(_, p) {
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.reactive)(proxy);
}

function reactiveComputed(fn) {
  return toReactive((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(fn));
}

function reactiveOmit(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRefs)(obj)).filter(([k, v]) => !predicate(toValue(v), k))) : Object.fromEntries(Object.entries((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRefs)(obj)).filter((e) => !flatKeys.includes(e[0]))));
}

const directiveHooks = {
  mounted: vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue3 ? "mounted" : "inserted",
  updated: vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue3 ? "updated" : "componentUpdated",
  unmounted: vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue3 ? "unmounted" : "unbind"
};

const isClient = typeof window !== "undefined" && typeof document !== "undefined";
const isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const isDef = (val) => typeof val !== "undefined";
const notNullish = (val) => val != null;
const assert = (condition, ...infos) => {
  if (!condition)
    console.warn(...infos);
};
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const now = () => Date.now();
const timestamp = () => +Date.now();
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const noop = () => {
};
const rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);
const isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}

function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(...args) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  let ms;
  let trailing;
  let leading;
  let rejectOnCancel;
  if (!(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(args[0]) && typeof args[0] === "object")
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
  else
    [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.readonly)(isActive), pause, resume, eventFilter };
}

function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});

function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve, ms);
  });
}
function identity(arg) {
  return arg;
}
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = void 0;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function invoke(fn) {
  return fn();
}
function containsProp(obj, ...props) {
  return props.some((k) => k in obj);
}
function increaseWithUnit(target, delta) {
  var _a;
  if (typeof target === "number")
    return target + delta;
  const value = ((_a = target.match(/^-?\d+\.?\d*/)) == null ? void 0 : _a[0]) || "";
  const unit = target.slice(value.length);
  const result = Number.parseFloat(value) + delta;
  if (Number.isNaN(result))
    return target;
  return result + unit;
}
function objectPick(obj, keys, omitUndefined = false) {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== void 0)
        n[k] = obj[k];
    }
    return n;
  }, {});
}
function objectOmit(obj, keys, omitUndefined = false) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => {
    return (!omitUndefined || value !== void 0) && !keys.includes(key);
  }));
}
function objectEntries(obj) {
  return Object.entries(obj);
}
function getLifeCycleTarget(target) {
  return target || (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
}

function toRef(...args) {
  if (args.length !== 1)
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRef)(...args);
  const r = args[0];
  return typeof r === "function" ? (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.readonly)((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.customRef)(() => ({ get: r, set: noop }))) : (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(r);
}
const resolveRef = toRef;

function reactivePick(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRefs)(obj)).filter(([k, v]) => predicate(toValue(v), k))) : Object.fromEntries(flatKeys.map((k) => [k, toRef(obj, k)])));
}

function refAutoReset(defaultValue, afterMs = 1e4) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.customRef)((track, trigger) => {
    let value = toValue(defaultValue);
    let timer;
    const resetAfter = () => setTimeout(() => {
      value = toValue(defaultValue);
      trigger();
    }, toValue(afterMs));
    tryOnScopeDispose(() => {
      clearTimeout(timer);
    });
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger();
        clearTimeout(timer);
        timer = resetAfter();
      }
    };
  });
}

function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}

function refDebounced(value, ms = 200, options = {}) {
  const debounced = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(value.value);
  const updater = useDebounceFn(() => {
    debounced.value = value.value;
  }, ms, options);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(value, () => updater());
  return debounced;
}

function refDefault(source, defaultValue) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)({
    get() {
      var _a;
      return (_a = source.value) != null ? _a : defaultValue;
    },
    set(value) {
      source.value = value;
    }
  });
}

function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn
  );
}

function refThrottled(value, delay = 200, trailing = true, leading = true) {
  if (delay <= 0)
    return value;
  const throttled = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(value.value);
  const updater = useThrottleFn(() => {
    throttled.value = value.value;
  }, delay, trailing, leading);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(value, () => updater());
  return throttled;
}

function refWithControl(initial, options = {}) {
  let source = initial;
  let track;
  let trigger;
  const ref = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.customRef)((_track, _trigger) => {
    track = _track;
    trigger = _trigger;
    return {
      get() {
        return get();
      },
      set(v) {
        set(v);
      }
    };
  });
  function get(tracking = true) {
    if (tracking)
      track();
    return source;
  }
  function set(value, triggering = true) {
    var _a, _b;
    if (value === source)
      return;
    const old = source;
    if (((_a = options.onBeforeChange) == null ? void 0 : _a.call(options, value, old)) === false)
      return;
    source = value;
    (_b = options.onChanged) == null ? void 0 : _b.call(options, value, old);
    if (triggering)
      trigger();
  }
  const untrackedGet = () => get(false);
  const silentSet = (v) => set(v, false);
  const peek = () => get(false);
  const lay = (v) => set(v, false);
  return extendRef(
    ref,
    {
      get,
      set,
      untrackedGet,
      silentSet,
      peek,
      lay
    },
    { enumerable: true }
  );
}
const controlledRef = refWithControl;

function set(...args) {
  if (args.length === 2) {
    const [ref, value] = args;
    ref.value = value;
  }
  if (args.length === 3) {
    if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(...args);
    } else {
      const [target, key, value] = args;
      target[key] = value;
    }
  }
}

function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}

function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter,
    ...watchOptions
  } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter
    }
  );
  return { stop, pause, resume, isActive };
}

function syncRef(left, right, ...[options]) {
  const {
    flush = "sync",
    deep = false,
    immediate = true,
    direction = "both",
    transform = {}
  } = options || {};
  const watchers = [];
  const transformLTR = "ltr" in transform && transform.ltr || ((v) => v);
  const transformRTL = "rtl" in transform && transform.rtl || ((v) => v);
  if (direction === "both" || direction === "ltr") {
    watchers.push(watchPausable(
      left,
      (newValue) => {
        watchers.forEach((w) => w.pause());
        right.value = transformLTR(newValue);
        watchers.forEach((w) => w.resume());
      },
      { flush, deep, immediate }
    ));
  }
  if (direction === "both" || direction === "rtl") {
    watchers.push(watchPausable(
      right,
      (newValue) => {
        watchers.forEach((w) => w.pause());
        left.value = transformRTL(newValue);
        watchers.forEach((w) => w.resume());
      },
      { flush, deep, immediate }
    ));
  }
  const stop = () => {
    watchers.forEach((w) => w.stop());
  };
  return stop;
}

function syncRefs(source, targets, options = {}) {
  const {
    flush = "sync",
    deep = false,
    immediate = true
  } = options;
  if (!Array.isArray(targets))
    targets = [targets];
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
    source,
    (newValue) => targets.forEach((target) => target.value = newValue),
    { flush, deep, immediate }
  );
}

function toRefs(objectRef, options = {}) {
  if (!(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(objectRef))
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRefs)(objectRef);
  const result = Array.isArray(objectRef.value) ? Array.from({ length: objectRef.value.length }) : {};
  for (const key in objectRef.value) {
    result[key] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.customRef)(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        var _a;
        const replaceRef = (_a = toValue(options.replaceRef)) != null ? _a : true;
        if (replaceRef) {
          if (Array.isArray(objectRef.value)) {
            const copy = [...objectRef.value];
            copy[key] = v;
            objectRef.value = copy;
          } else {
            const newObject = { ...objectRef.value, [key]: v };
            Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value));
            objectRef.value = newObject;
          }
        } else {
          objectRef.value[key] = v;
        }
      }
    }));
  }
  return result;
}

function tryOnBeforeMount(fn, sync = true, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount)(fn, target);
  else if (sync)
    fn();
  else
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)(fn);
}

function tryOnBeforeUnmount(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(fn, target);
}

function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onMounted)(fn, target);
  else if (sync)
    fn();
  else
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)(fn);
}

function tryOnUnmounted(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(fn, target);
}

function createUntil(r, isNot = false) {
  function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
    let stop = null;
    const watcher = new Promise((resolve) => {
      stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
        r,
        (v) => {
          if (condition(v) !== isNot) {
            if (stop)
              stop();
            else
              (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => stop == null ? void 0 : stop());
            resolve(v);
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      );
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => stop == null ? void 0 : stop())
      );
    }
    return Promise.race(promises);
  }
  function toBe(value, options) {
    if (!(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(value))
      return toMatch((v) => v === value, options);
    const { flush = "sync", deep = false, timeout, throwOnTimeout } = options != null ? options : {};
    let stop = null;
    const watcher = new Promise((resolve) => {
      stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
        [r, value],
        ([v1, v2]) => {
          if (isNot !== (v1 === v2)) {
            if (stop)
              stop();
            else
              (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => stop == null ? void 0 : stop());
            resolve(v1);
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      );
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => {
          stop == null ? void 0 : stop();
          return toValue(r);
        })
      );
    }
    return Promise.race(promises);
  }
  function toBeTruthy(options) {
    return toMatch((v) => Boolean(v), options);
  }
  function toBeNull(options) {
    return toBe(null, options);
  }
  function toBeUndefined(options) {
    return toBe(void 0, options);
  }
  function toBeNaN(options) {
    return toMatch(Number.isNaN, options);
  }
  function toContains(value, options) {
    return toMatch((v) => {
      const array = Array.from(v);
      return array.includes(value) || array.includes(toValue(value));
    }, options);
  }
  function changed(options) {
    return changedTimes(1, options);
  }
  function changedTimes(n = 1, options) {
    let count = -1;
    return toMatch(() => {
      count += 1;
      return count >= n;
    }, options);
  }
  if (Array.isArray(toValue(r))) {
    const instance = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  } else {
    const instance = {
      toMatch,
      toBe,
      toBeTruthy,
      toBeNull,
      toBeNaN,
      toBeUndefined,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  }
}
function until(r) {
  return createUntil(r);
}

function defaultComparator(value, othVal) {
  return value === othVal;
}
function useArrayDifference(...args) {
  var _a;
  const list = args[0];
  const values = args[1];
  let compareFn = (_a = args[2]) != null ? _a : defaultComparator;
  if (typeof compareFn === "string") {
    const key = compareFn;
    compareFn = (value, othVal) => value[key] === othVal[key];
  }
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).filter((x) => toValue(values).findIndex((y) => compareFn(x, y)) === -1));
}

function useArrayEvery(list, fn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).every((element, index, array) => fn(toValue(element), index, array)));
}

function useArrayFilter(list, fn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).map((i) => toValue(i)).filter(fn));
}

function useArrayFind(list, fn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(
    toValue(list).find((element, index, array) => fn(toValue(element), index, array))
  ));
}

function useArrayFindIndex(list, fn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).findIndex((element, index, array) => fn(toValue(element), index, array)));
}

function findLast(arr, cb) {
  let index = arr.length;
  while (index-- > 0) {
    if (cb(arr[index], index, arr))
      return arr[index];
  }
  return void 0;
}
function useArrayFindLast(list, fn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(
    !Array.prototype.findLast ? findLast(toValue(list), (element, index, array) => fn(toValue(element), index, array)) : toValue(list).findLast((element, index, array) => fn(toValue(element), index, array))
  ));
}

function isArrayIncludesOptions(obj) {
  return isObject(obj) && containsProp(obj, "formIndex", "comparator");
}
function useArrayIncludes(...args) {
  var _a;
  const list = args[0];
  const value = args[1];
  let comparator = args[2];
  let formIndex = 0;
  if (isArrayIncludesOptions(comparator)) {
    formIndex = (_a = comparator.fromIndex) != null ? _a : 0;
    comparator = comparator.comparator;
  }
  if (typeof comparator === "string") {
    const key = comparator;
    comparator = (element, value2) => element[key] === toValue(value2);
  }
  comparator = comparator != null ? comparator : (element, value2) => element === toValue(value2);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).slice(formIndex).some((element, index, array) => comparator(
    toValue(element),
    toValue(value),
    index,
    toValue(array)
  )));
}

function useArrayJoin(list, separator) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).map((i) => toValue(i)).join(toValue(separator)));
}

function useArrayMap(list, fn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).map((i) => toValue(i)).map(fn));
}

function useArrayReduce(list, reducer, ...args) {
  const reduceCallback = (sum, value, index) => reducer(toValue(sum), toValue(value), index);
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const resolved = toValue(list);
    return args.length ? resolved.reduce(reduceCallback, typeof args[0] === "function" ? toValue(args[0]()) : toValue(args[0])) : resolved.reduce(reduceCallback);
  });
}

function useArraySome(list, fn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => toValue(list).some((element, index, array) => fn(toValue(element), index, array)));
}

function uniq(array) {
  return Array.from(new Set(array));
}
function uniqueElementsBy(array, fn) {
  return array.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x, array)))
      acc.push(v);
    return acc;
  }, []);
}
function useArrayUnique(list, compareFn) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const resolvedList = toValue(list).map((element) => toValue(element));
    return compareFn ? uniqueElementsBy(resolvedList, compareFn) : uniq(resolvedList);
  });
}

function useCounter(initialValue = 0, options = {}) {
  let _initialValue = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(initialValue);
  const count = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(initialValue);
  const {
    max = Number.POSITIVE_INFINITY,
    min = Number.NEGATIVE_INFINITY
  } = options;
  const inc = (delta = 1) => count.value = Math.max(Math.min(max, count.value + delta), min);
  const dec = (delta = 1) => count.value = Math.min(Math.max(min, count.value - delta), max);
  const get = () => count.value;
  const set = (val) => count.value = Math.max(min, Math.min(max, val));
  const reset = (val = _initialValue) => {
    _initialValue = val;
    return set(val);
  };
  return { count, inc, dec, get, set, reset };
}

const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[T\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/i;
const REGEX_FORMAT = /[YMDHhms]o|\[([^\]]+)\]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
function defaultMeridiem(hours, minutes, isLowercase, hasPeriod) {
  let m = hours < 12 ? "AM" : "PM";
  if (hasPeriod)
    m = m.split("").reduce((acc, curr) => acc += `${curr}.`, "");
  return isLowercase ? m.toLowerCase() : m;
}
function formatOrdinal(num) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}
function formatDate(date, formatStr, options = {}) {
  var _a;
  const years = date.getFullYear();
  const month = date.getMonth();
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const day = date.getDay();
  const meridiem = (_a = options.customMeridiem) != null ? _a : defaultMeridiem;
  const matches = {
    Yo: () => formatOrdinal(years),
    YY: () => String(years).slice(-2),
    YYYY: () => years,
    M: () => month + 1,
    Mo: () => formatOrdinal(month + 1),
    MM: () => `${month + 1}`.padStart(2, "0"),
    MMM: () => date.toLocaleDateString(toValue(options.locales), { month: "short" }),
    MMMM: () => date.toLocaleDateString(toValue(options.locales), { month: "long" }),
    D: () => String(days),
    Do: () => formatOrdinal(days),
    DD: () => `${days}`.padStart(2, "0"),
    H: () => String(hours),
    Ho: () => formatOrdinal(hours),
    HH: () => `${hours}`.padStart(2, "0"),
    h: () => `${hours % 12 || 12}`.padStart(1, "0"),
    ho: () => formatOrdinal(hours % 12 || 12),
    hh: () => `${hours % 12 || 12}`.padStart(2, "0"),
    m: () => String(minutes),
    mo: () => formatOrdinal(minutes),
    mm: () => `${minutes}`.padStart(2, "0"),
    s: () => String(seconds),
    so: () => formatOrdinal(seconds),
    ss: () => `${seconds}`.padStart(2, "0"),
    SSS: () => `${milliseconds}`.padStart(3, "0"),
    d: () => day,
    dd: () => date.toLocaleDateString(toValue(options.locales), { weekday: "narrow" }),
    ddd: () => date.toLocaleDateString(toValue(options.locales), { weekday: "short" }),
    dddd: () => date.toLocaleDateString(toValue(options.locales), { weekday: "long" }),
    A: () => meridiem(hours, minutes),
    AA: () => meridiem(hours, minutes, false, true),
    a: () => meridiem(hours, minutes, true),
    aa: () => meridiem(hours, minutes, true, true)
  };
  return formatStr.replace(REGEX_FORMAT, (match, $1) => {
    var _a2, _b;
    return (_b = $1 != null ? $1 : (_a2 = matches[match]) == null ? void 0 : _a2.call(matches)) != null ? _b : match;
  });
}
function normalizeDate(date) {
  if (date === null)
    return new Date(Number.NaN);
  if (date === void 0)
    return /* @__PURE__ */ new Date();
  if (date instanceof Date)
    return new Date(date);
  if (typeof date === "string" && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE);
    if (d) {
      const m = d[2] - 1 || 0;
      const ms = (d[7] || "0").substring(0, 3);
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }
  return new Date(date);
}
function useDateFormat(date, formatStr = "HH:mm:ss", options = {}) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => formatDate(normalizeDate(toValue(date)), toValue(formatStr), options));
}

function useIntervalFn(cb, interval = 1e3, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    if (isActive.value)
      timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(interval) || typeof interval === "function") {
    const stopWatch = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}

function useInterval(interval = 1e3, options = {}) {
  const {
    controls: exposeControls = false,
    immediate = true,
    callback
  } = options;
  const counter = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
  const update = () => counter.value += 1;
  const reset = () => {
    counter.value = 0;
  };
  const controls = useIntervalFn(
    callback ? () => {
      update();
      callback(counter.value);
    } : update,
    interval,
    { immediate }
  );
  if (exposeControls) {
    return {
      counter,
      reset,
      ...controls
    };
  } else {
    return counter;
  }
}

function useLastChanged(source, options = {}) {
  var _a;
  const ms = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)((_a = options.initialValue) != null ? _a : null);
  (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
    source,
    () => ms.value = timestamp(),
    options
  );
  return ms;
}

function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending: (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.readonly)(isPending),
    start,
    stop
  };
}

function useTimeout(interval = 1e3, options = {}) {
  const {
    controls: exposeControls = false,
    callback
  } = options;
  const controls = useTimeoutFn(
    callback != null ? callback : noop,
    interval,
    options
  );
  const ready = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => !controls.isPending.value);
  if (exposeControls) {
    return {
      ready,
      ...controls
    };
  } else {
    return ready;
  }
}

function useToNumber(value, options = {}) {
  const {
    method = "parseFloat",
    radix,
    nanToZero
  } = options;
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let resolved = toValue(value);
    if (typeof resolved === "string")
      resolved = Number[method](resolved, radix);
    if (nanToZero && Number.isNaN(resolved))
      resolved = 0;
    return resolved;
  });
}

function useToString(value) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(() => `${toValue(value)}`);
}

function useToggle(initialValue = false, options = {}) {
  const {
    truthyValue = true,
    falsyValue = false
  } = options;
  const valueIsRef = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(initialValue);
  const _value = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(initialValue);
  function toggle(value) {
    if (arguments.length) {
      _value.value = value;
      return _value.value;
    } else {
      const truthy = toValue(truthyValue);
      _value.value = _value.value === truthy ? toValue(falsyValue) : truthy;
      return _value.value;
    }
  }
  if (valueIsRef)
    return toggle;
  else
    return [_value, toggle];
}

function watchArray(source, cb, options) {
  let oldList = (options == null ? void 0 : options.immediate) ? [] : [...source instanceof Function ? source() : Array.isArray(source) ? source : toValue(source)];
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(source, (newList, _, onCleanup) => {
    const oldListRemains = Array.from({ length: oldList.length });
    const added = [];
    for (const obj of newList) {
      let found = false;
      for (let i = 0; i < oldList.length; i++) {
        if (!oldListRemains[i] && obj === oldList[i]) {
          oldListRemains[i] = true;
          found = true;
          break;
        }
      }
      if (!found)
        added.push(obj);
    }
    const removed = oldList.filter((_2, i) => !oldListRemains[i]);
    cb(newList, oldList, added, removed, onCleanup);
    oldList = [...newList];
  }, options);
}

function watchAtMost(source, cb, options) {
  const {
    count,
    ...watchOptions
  } = options;
  const current = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
  const stop = watchWithFilter(
    source,
    (...args) => {
      current.value += 1;
      if (current.value >= toValue(count))
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => stop());
      cb(...args);
    },
    watchOptions
  );
  return { count: current, stop };
}

function watchDebounced(source, cb, options = {}) {
  const {
    debounce = 0,
    maxWait = void 0,
    ...watchOptions
  } = options;
  return watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter: debounceFilter(debounce, { maxWait })
    }
  );
}

function watchDeep(source, cb, options) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
    source,
    cb,
    {
      ...options,
      deep: true
    }
  );
}

function watchIgnorable(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  const filteredCb = createFilterWrapper(
    eventFilter,
    cb
  );
  let ignoreUpdates;
  let ignorePrevAsyncUpdates;
  let stop;
  if (watchOptions.flush === "sync") {
    const ignore = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    ignorePrevAsyncUpdates = () => {
    };
    ignoreUpdates = (updater) => {
      ignore.value = true;
      updater();
      ignore.value = false;
    };
    stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
      source,
      (...args) => {
        if (!ignore.value)
          filteredCb(...args);
      },
      watchOptions
    );
  } else {
    const disposables = [];
    const ignoreCounter = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const syncCounter = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    ignorePrevAsyncUpdates = () => {
      ignoreCounter.value = syncCounter.value;
    };
    disposables.push(
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
        source,
        () => {
          syncCounter.value++;
        },
        { ...watchOptions, flush: "sync" }
      )
    );
    ignoreUpdates = (updater) => {
      const syncCounterPrev = syncCounter.value;
      updater();
      ignoreCounter.value += syncCounter.value - syncCounterPrev;
    };
    disposables.push(
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
        source,
        (...args) => {
          const ignore = ignoreCounter.value > 0 && ignoreCounter.value === syncCounter.value;
          ignoreCounter.value = 0;
          syncCounter.value = 0;
          if (ignore)
            return;
          filteredCb(...args);
        },
        watchOptions
      )
    );
    stop = () => {
      disposables.forEach((fn) => fn());
    };
  }
  return { stop, ignoreUpdates, ignorePrevAsyncUpdates };
}

function watchImmediate(source, cb, options) {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}

function watchOnce(source, cb, options) {
  const stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(source, (...args) => {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => stop());
    return cb(...args);
  }, options);
  return stop;
}

function watchThrottled(source, cb, options = {}) {
  const {
    throttle = 0,
    trailing = true,
    leading = true,
    ...watchOptions
  } = options;
  return watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter: throttleFilter(throttle, trailing, leading)
    }
  );
}

function watchTriggerable(source, cb, options = {}) {
  let cleanupFn;
  function onEffect() {
    if (!cleanupFn)
      return;
    const fn = cleanupFn;
    cleanupFn = void 0;
    fn();
  }
  function onCleanup(callback) {
    cleanupFn = callback;
  }
  const _cb = (value, oldValue) => {
    onEffect();
    return cb(value, oldValue, onCleanup);
  };
  const res = watchIgnorable(source, _cb, options);
  const { ignoreUpdates } = res;
  const trigger = () => {
    let res2;
    ignoreUpdates(() => {
      res2 = _cb(getWatchSources(source), getOldValue(source));
    });
    return res2;
  };
  return {
    ...res,
    trigger
  };
}
function getWatchSources(sources) {
  if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isReactive)(sources))
    return sources;
  if (Array.isArray(sources))
    return sources.map((item) => toValue(item));
  return toValue(sources);
}
function getOldValue(source) {
  return Array.isArray(source) ? source.map(() => void 0) : void 0;
}

function whenever(source, cb, options) {
  const stop = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(
    source,
    (v, ov, onInvalidate) => {
      if (v) {
        if (options == null ? void 0 : options.once)
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => stop());
        cb(v, ov, onInvalidate);
      }
    },
    {
      ...options,
      once: false
    }
  );
  return stop;
}




/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/node_modules/@vueuse/shared/node_modules/vue-demi/lib/index.mjs":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/@vueuse/shared/node_modules/vue-demi/lib/index.mjs ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "./node_modules/@nextcloud/dialogs/node_modules/eventemitter3/index.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/eventemitter3/index.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* reexport default export from named module */ _index_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/@nextcloud/dialogs/node_modules/eventemitter3/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_index_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PQueue)
/* harmony export */ });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/@nextcloud/dialogs/node_modules/eventemitter3/index.mjs");
/* harmony import */ var p_timeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! p-timeout */ "./node_modules/@nextcloud/dialogs/node_modules/p-timeout/index.js");
/* harmony import */ var _priority_queue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./priority-queue.js */ "./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/priority-queue.js");
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



/**
Promise queue with concurrency control.
*/
var _carryoverConcurrencyCount = /*#__PURE__*/new WeakMap();
var _isIntervalIgnored = /*#__PURE__*/new WeakMap();
var _intervalCount = /*#__PURE__*/new WeakMap();
var _intervalCap = /*#__PURE__*/new WeakMap();
var _interval = /*#__PURE__*/new WeakMap();
var _intervalEnd = /*#__PURE__*/new WeakMap();
var _intervalId = /*#__PURE__*/new WeakMap();
var _timeoutId = /*#__PURE__*/new WeakMap();
var _queue = /*#__PURE__*/new WeakMap();
var _queueClass = /*#__PURE__*/new WeakMap();
var _pending = /*#__PURE__*/new WeakMap();
var _concurrency = /*#__PURE__*/new WeakMap();
var _isPaused = /*#__PURE__*/new WeakMap();
var _throwOnTimeout = /*#__PURE__*/new WeakMap();
var _PQueue_brand = /*#__PURE__*/new WeakSet();
class PQueue extends eventemitter3__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
  constructor(options) {
    super();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    _classPrivateMethodInitSpec(this, _PQueue_brand);
    _classPrivateFieldInitSpec(this, _carryoverConcurrencyCount, void 0);
    _classPrivateFieldInitSpec(this, _isIntervalIgnored, void 0);
    _classPrivateFieldInitSpec(this, _intervalCount, 0);
    _classPrivateFieldInitSpec(this, _intervalCap, void 0);
    _classPrivateFieldInitSpec(this, _interval, void 0);
    _classPrivateFieldInitSpec(this, _intervalEnd, 0);
    _classPrivateFieldInitSpec(this, _intervalId, void 0);
    _classPrivateFieldInitSpec(this, _timeoutId, void 0);
    _classPrivateFieldInitSpec(this, _queue, void 0);
    _classPrivateFieldInitSpec(this, _queueClass, void 0);
    _classPrivateFieldInitSpec(this, _pending, 0);
    // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
    _classPrivateFieldInitSpec(this, _concurrency, void 0);
    _classPrivateFieldInitSpec(this, _isPaused, void 0);
    _classPrivateFieldInitSpec(this, _throwOnTimeout, void 0);
    /**
    Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
     Applies to each future operation.
    */
    _defineProperty(this, "timeout", void 0);
    options = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: _priority_queue_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      ...options
    };
    if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${options.intervalCap?.toString() ?? ''}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${options.interval?.toString() ?? ''}\` (${typeof options.interval})`);
    }
    _classPrivateFieldSet(_carryoverConcurrencyCount, this, options.carryoverConcurrencyCount);
    _classPrivateFieldSet(_isIntervalIgnored, this, options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0);
    _classPrivateFieldSet(_intervalCap, this, options.intervalCap);
    _classPrivateFieldSet(_interval, this, options.interval);
    _classPrivateFieldSet(_queue, this, new options.queueClass());
    _classPrivateFieldSet(_queueClass, this, options.queueClass);
    this.concurrency = options.concurrency;
    this.timeout = options.timeout;
    _classPrivateFieldSet(_throwOnTimeout, this, options.throwOnTimeout === true);
    _classPrivateFieldSet(_isPaused, this, options.autoStart === false);
  }
  get concurrency() {
    return _classPrivateFieldGet(_concurrency, this);
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    _classPrivateFieldSet(_concurrency, this, newConcurrency);
    _assertClassBrand(_PQueue_brand, this, _processQueue).call(this);
  }
  async add(function_) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = {
      timeout: this.timeout,
      throwOnTimeout: _classPrivateFieldGet(_throwOnTimeout, this),
      ...options
    };
    return new Promise((resolve, reject) => {
      _classPrivateFieldGet(_queue, this).enqueue(async () => {
        var _this$pending3, _this$pending4, _this$intervalCount, _this$intervalCount2;
        _classPrivateFieldSet(_pending, this, (_this$pending3 = _classPrivateFieldGet(_pending, this), _this$pending4 = _this$pending3++, _this$pending3)), _this$pending4;
        _classPrivateFieldSet(_intervalCount, this, (_this$intervalCount = _classPrivateFieldGet(_intervalCount, this), _this$intervalCount2 = _this$intervalCount++, _this$intervalCount)), _this$intervalCount2;
        try {
          options.signal?.throwIfAborted();
          let operation = function_({
            signal: options.signal
          });
          if (options.timeout) {
            operation = (0,p_timeout__WEBPACK_IMPORTED_MODULE_2__["default"])(Promise.resolve(operation), {
              milliseconds: options.timeout
            });
          }
          if (options.signal) {
            operation = Promise.race([operation, _assertClassBrand(_PQueue_brand, this, _throwOnAbort).call(this, options.signal)]);
          }
          const result = await operation;
          resolve(result);
          this.emit('completed', result);
        } catch (error) {
          if (error instanceof p_timeout__WEBPACK_IMPORTED_MODULE_2__.TimeoutError && !options.throwOnTimeout) {
            resolve();
            return;
          }
          reject(error);
          this.emit('error', error);
        } finally {
          _assertClassBrand(_PQueue_brand, this, _next).call(this);
        }
      }, options);
      this.emit('add');
      _assertClassBrand(_PQueue_brand, this, _tryToStartAnother).call(this);
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async function_ => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
  start() {
    if (!_classPrivateFieldGet(_isPaused, this)) {
      return this;
    }
    _classPrivateFieldSet(_isPaused, this, false);
    _assertClassBrand(_PQueue_brand, this, _processQueue).call(this);
    return this;
  }
  /**
  Put queue execution on hold.
  */
  pause() {
    _classPrivateFieldSet(_isPaused, this, true);
  }
  /**
  Clear the queue.
  */
  clear() {
    _classPrivateFieldSet(_queue, this, new (_classPrivateFieldGet(_queueClass, this))());
  }
  /**
  Can be called multiple times. Useful if you for example add additional items at a later time.
   @returns A promise that settles when the queue becomes empty.
  */
  async onEmpty() {
    // Instantly resolve if the queue is empty
    if (_classPrivateFieldGet(_queue, this).size === 0) {
      return;
    }
    await _assertClassBrand(_PQueue_brand, this, _onEvent).call(this, 'empty');
  }
  /**
  @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
   If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
   Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
  */
  async onSizeLessThan(limit) {
    // Instantly resolve if the queue is empty.
    if (_classPrivateFieldGet(_queue, this).size < limit) {
      return;
    }
    await _assertClassBrand(_PQueue_brand, this, _onEvent).call(this, 'next', () => _classPrivateFieldGet(_queue, this).size < limit);
  }
  /**
  The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
   @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
  */
  async onIdle() {
    // Instantly resolve if none pending and if nothing else is queued
    if (_classPrivateFieldGet(_pending, this) === 0 && _classPrivateFieldGet(_queue, this).size === 0) {
      return;
    }
    await _assertClassBrand(_PQueue_brand, this, _onEvent).call(this, 'idle');
  }
  /**
  Size of the queue, the number of queued items waiting to run.
  */
  get size() {
    return _classPrivateFieldGet(_queue, this).size;
  }
  /**
  Size of the queue, filtered by the given options.
   For example, this can be used to find the number of items remaining in the queue with a specific priority level.
  */
  sizeBy(options) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return _classPrivateFieldGet(_queue, this).filter(options).length;
  }
  /**
  Number of running items (no longer in the queue).
  */
  get pending() {
    return _classPrivateFieldGet(_pending, this);
  }
  /**
  Whether the queue is currently paused.
  */
  get isPaused() {
    return _classPrivateFieldGet(_isPaused, this);
  }
}
function _get_doesIntervalAllowAnother(_this) {
  return _classPrivateFieldGet(_isIntervalIgnored, _this) || _classPrivateFieldGet(_intervalCount, _this) < _classPrivateFieldGet(_intervalCap, _this);
}
function _get_doesConcurrentAllowAnother(_this2) {
  return _classPrivateFieldGet(_pending, _this2) < _classPrivateFieldGet(_concurrency, _this2);
}
function _next() {
  var _this$pending, _this$pending2;
  _classPrivateFieldSet(_pending, this, (_this$pending = _classPrivateFieldGet(_pending, this), _this$pending2 = _this$pending--, _this$pending)), _this$pending2;
  _assertClassBrand(_PQueue_brand, this, _tryToStartAnother).call(this);
  this.emit('next');
}
function _onResumeInterval() {
  _assertClassBrand(_PQueue_brand, this, _onInterval).call(this);
  _assertClassBrand(_PQueue_brand, this, _initializeIntervalIfNeeded).call(this);
  _classPrivateFieldSet(_timeoutId, this, undefined);
}
function _get_isIntervalPaused(_this3) {
  const now = Date.now();
  if (_classPrivateFieldGet(_intervalId, _this3) === undefined) {
    const delay = _classPrivateFieldGet(_intervalEnd, _this3) - now;
    if (delay < 0) {
      // Act as the interval was done
      // We don't need to resume it here because it will be resumed on line 160
      _classPrivateFieldSet(_intervalCount, _this3, _classPrivateFieldGet(_carryoverConcurrencyCount, _this3) ? _classPrivateFieldGet(_pending, _this3) : 0);
    } else {
      // Act as the interval is pending
      if (_classPrivateFieldGet(_timeoutId, _this3) === undefined) {
        _classPrivateFieldSet(_timeoutId, _this3, setTimeout(() => {
          _assertClassBrand(_PQueue_brand, _this3, _onResumeInterval).call(_this3);
        }, delay));
      }
      return true;
    }
  }
  return false;
}
function _tryToStartAnother() {
  if (_classPrivateFieldGet(_queue, this).size === 0) {
    // We can clear the interval ("pause")
    // Because we can redo it later ("resume")
    if (_classPrivateFieldGet(_intervalId, this)) {
      clearInterval(_classPrivateFieldGet(_intervalId, this));
    }
    _classPrivateFieldSet(_intervalId, this, undefined);
    this.emit('empty');
    if (_classPrivateFieldGet(_pending, this) === 0) {
      this.emit('idle');
    }
    return false;
  }
  if (!_classPrivateFieldGet(_isPaused, this)) {
    const canInitializeInterval = !_classPrivateGetter(_PQueue_brand, this, _get_isIntervalPaused);
    if (_classPrivateGetter(_PQueue_brand, this, _get_doesIntervalAllowAnother) && _classPrivateGetter(_PQueue_brand, this, _get_doesConcurrentAllowAnother)) {
      const job = _classPrivateFieldGet(_queue, this).dequeue();
      if (!job) {
        return false;
      }
      this.emit('active');
      job();
      if (canInitializeInterval) {
        _assertClassBrand(_PQueue_brand, this, _initializeIntervalIfNeeded).call(this);
      }
      return true;
    }
  }
  return false;
}
function _initializeIntervalIfNeeded() {
  if (_classPrivateFieldGet(_isIntervalIgnored, this) || _classPrivateFieldGet(_intervalId, this) !== undefined) {
    return;
  }
  _classPrivateFieldSet(_intervalId, this, setInterval(() => {
    _assertClassBrand(_PQueue_brand, this, _onInterval).call(this);
  }, _classPrivateFieldGet(_interval, this)));
  _classPrivateFieldSet(_intervalEnd, this, Date.now() + _classPrivateFieldGet(_interval, this));
}
function _onInterval() {
  if (_classPrivateFieldGet(_intervalCount, this) === 0 && _classPrivateFieldGet(_pending, this) === 0 && _classPrivateFieldGet(_intervalId, this)) {
    clearInterval(_classPrivateFieldGet(_intervalId, this));
    _classPrivateFieldSet(_intervalId, this, undefined);
  }
  _classPrivateFieldSet(_intervalCount, this, _classPrivateFieldGet(_carryoverConcurrencyCount, this) ? _classPrivateFieldGet(_pending, this) : 0);
  _assertClassBrand(_PQueue_brand, this, _processQueue).call(this);
}
/**
Executes all queued functions until it reaches the limit.
*/
function _processQueue() {
  // eslint-disable-next-line no-empty
  while (_assertClassBrand(_PQueue_brand, this, _tryToStartAnother).call(this)) {}
}
async function _throwOnAbort(signal) {
  return new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => {
      reject(signal.reason);
    }, {
      once: true
    });
  });
}
async function _onEvent(event, filter) {
  return new Promise(resolve => {
    const listener = () => {
      if (filter && !filter()) {
        return;
      }
      this.off(event, listener);
      resolve();
    };
    this.on(event, listener);
  });
}

/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/lower-bound.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/lower-bound.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ lowerBound)
/* harmony export */ });
// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound(array, value, comparator) {
  let first = 0;
  let count = array.length;
  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it = first + step;
    if (comparator(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}

/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/priority-queue.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/priority-queue.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriorityQueue)
/* harmony export */ });
/* harmony import */ var _lower_bound_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lower-bound.js */ "./node_modules/@nextcloud/dialogs/node_modules/p-queue/dist/lower-bound.js");
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var _queue = /*#__PURE__*/new WeakMap();
class PriorityQueue {
  constructor() {
    _classPrivateFieldInitSpec(this, _queue, []);
  }
  enqueue(run, options) {
    options = {
      priority: 0,
      ...options
    };
    const element = {
      priority: options.priority,
      run
    };
    if (this.size && _classPrivateFieldGet(_queue, this)[this.size - 1].priority >= options.priority) {
      _classPrivateFieldGet(_queue, this).push(element);
      return;
    }
    const index = (0,_lower_bound_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_classPrivateFieldGet(_queue, this), element, (a, b) => b.priority - a.priority);
    _classPrivateFieldGet(_queue, this).splice(index, 0, element);
  }
  dequeue() {
    const item = _classPrivateFieldGet(_queue, this).shift();
    return item?.run;
  }
  filter(options) {
    return _classPrivateFieldGet(_queue, this).filter(element => element.priority === options.priority).map(element => element.run);
  }
  get size() {
    return _classPrivateFieldGet(_queue, this).length;
  }
}

/***/ }),

/***/ "./node_modules/@nextcloud/dialogs/node_modules/p-timeout/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@nextcloud/dialogs/node_modules/p-timeout/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortError: () => (/* binding */ AbortError),
/* harmony export */   TimeoutError: () => (/* binding */ TimeoutError),
/* harmony export */   "default": () => (/* binding */ pTimeout)
/* harmony export */ });
class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
An error to be thrown when the request is aborted by AbortController.
DOMException is thrown instead of this Error when DOMException is available.
*/
class AbortError extends Error {
  constructor(message) {
    super();
    this.name = 'AbortError';
    this.message = message;
  }
}

/**
TODO: Remove AbortError and just throw DOMException when targeting Node 18.
*/
const getDOMException = errorMessage => globalThis.DOMException === undefined ? new AbortError(errorMessage) : new DOMException(errorMessage);

/**
TODO: Remove below function and just 'reject(signal.reason)' when targeting Node 18.
*/
const getAbortedReason = signal => {
  const reason = signal.reason === undefined ? getDOMException('This operation was aborted.') : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = {
      setTimeout,
      clearTimeout
    }
  } = options;
  let timer;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== 'number' || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const {
        signal
      } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      const abortHandler = () => {
        reject(getAbortedReason(signal));
      };
      signal.addEventListener('abort', abortHandler, {
        once: true
      });
      promise.finally(() => {
        signal.removeEventListener('abort', abortHandler);
      });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }

    // We create the error outside of `setTimeout` to preserve the stack trace.
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(undefined, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === 'function') {
        promise.cancel();
      }
      if (message === false) {
        resolve();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(undefined, timer);
    timer = undefined;
  };
  return cancelablePromise;
}

/***/ })

}]);
//# sourceMappingURL=data_image_svg_xml_3c_21--_20-_20SPDX-FileCopyrightText_202020_20Google_20Inc_20-_20SPDX-Lice-84639e-data_image_svg_xml_3c_21--_20-_20SPDX-FileCopyrightText_202020_20Google_20Inc_20-_20SPDX-Lice-84639e.js.map?v=2dcb905bc800668fb1ac