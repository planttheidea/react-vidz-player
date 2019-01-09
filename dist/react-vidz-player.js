(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("react-dom"), require("recompose"), require("vidz"));
	else if(typeof define === 'function' && define.amd)
		define("ReactVidzPlayer", ["prop-types", "react", "react-dom", "recompose", "vidz"], factory);
	else if(typeof exports === 'object')
		exports["ReactVidzPlayer"] = factory(require("prop-types"), require("react"), require("react-dom"), require("recompose"), require("vidz"));
	else
		root["ReactVidzPlayer"] = factory(root["prop-types"], root["react"], root["react-dom"], root["recompose"], root["vidz"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__, __WEBPACK_EXTERNAL_MODULE_recompose__, __WEBPACK_EXTERNAL_MODULE_vidz__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/element-resize-event/index.js":
/*!****************************************************!*\
  !*** ./node_modules/element-resize-event/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var requestFrame = (function () {
  var window = this
  var raf = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function fallbackRAF(func) {
      return window.setTimeout(func, 20)
    }
  return function requestFrameFunction(func) {
    return raf(func)
  }
})()

var cancelFrame = (function () {
  var window = this
  var cancel = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.clearTimeout
  return function cancelFrameFunction(id) {
    return cancel(id)
  }
})()

function resizeListener(e) {
  var win = e.target || e.srcElement
  if (win.__resizeRAF__) {
    cancelFrame(win.__resizeRAF__)
  }
  win.__resizeRAF__ = requestFrame(function () {
    var trigger = win.__resizeTrigger__
    trigger.__resizeListeners__.forEach(function (fn) {
      fn.call(trigger, e)
    })
  })
}

var exports = function exports(element, fn) {
  var window = this
  var document = window.document
  var isIE

  var attachEvent = document.attachEvent
  if (typeof navigator !== 'undefined') {
    isIE = navigator.userAgent.match(/Trident/) ||
      navigator.userAgent.match(/Edge/)
  }

  function objectLoad() {
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
  }

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    if (attachEvent) {
      element.__resizeTrigger__ = element
      element.attachEvent('onresize', resizeListener)
    } else {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative'
      }
      var obj = (element.__resizeTrigger__ = document.createElement('object'))
      obj.setAttribute(
        'style',
        'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;'
      )
      obj.setAttribute('class', 'resize-sensor')
      obj.__resizeElement__ = element
      obj.onload = objectLoad
      obj.type = 'text/html'
      if (isIE) {
        element.appendChild(obj)
      }
      obj.data = 'about:blank'
      if (!isIE) {
        element.appendChild(obj)
      }
    }
  }
  element.__resizeListeners__.push(fn)
}

module.exports = typeof window === 'undefined' ? exports : exports.bind(window)

module.exports.unbind = function (element, fn) {
  var attachEvent = document.attachEvent
  if (fn) {
    element.__resizeListeners__.splice(
      element.__resizeListeners__.indexOf(fn),
      1
    )
  } else {
    element.__resizeListeners__ = []
  }
  if (!element.__resizeListeners__.length) {
    if (attachEvent) {
      element.detachEvent('onresize', resizeListener)
    } else {
      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener(
        'resize',
        resizeListener
      )
      delete element.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__
      element.__resizeTrigger__ = !element.removeChild(
        element.__resizeTrigger__
      )
    }
    delete element.__resizeListeners__
  }
}


/***/ }),

/***/ "./node_modules/fbjs/lib/shallowEqual.js":
/*!***********************************************!*\
  !*** ./node_modules/fbjs/lib/shallowEqual.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/isUndefined.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isUndefined.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/react-icon-base/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-icon-base/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var IconBase = function IconBase(_ref, _ref2) {
  var children = _ref.children;
  var color = _ref.color;
  var size = _ref.size;
  var style = _ref.style;
  var width = _ref.width;
  var height = _ref.height;

  var props = _objectWithoutProperties(_ref, ['children', 'color', 'size', 'style', 'width', 'height']);

  var _ref2$reactIconBase = _ref2.reactIconBase;
  var reactIconBase = _ref2$reactIconBase === undefined ? {} : _ref2$reactIconBase;

  var computedSize = size || reactIconBase.size || '1em';
  return _react2.default.createElement('svg', _extends({
    children: children,
    fill: 'currentColor',
    preserveAspectRatio: 'xMidYMid meet',
    height: height || computedSize,
    width: width || computedSize
  }, reactIconBase, props, {
    style: _extends({
      verticalAlign: 'middle',
      color: color || reactIconBase.color
    }, reactIconBase.style || {}, style)
  }));
};

IconBase.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  style: _propTypes2.default.object
};

IconBase.contextTypes = {
  reactIconBase: _propTypes2.default.shape(IconBase.propTypes)
};

exports.default = IconBase;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/arrow-expand.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-icons/lib/io/arrow-expand.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoArrowExpand = function IoArrowExpand(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm21.4 16.4l5-5-3.9-3.9h10v10l-3.9-3.9-5 5z m0 7.2l2.2-2.2 5 5 3.9-3.9v10h-10l3.9-3.9z m-2.8 0l-5 5 3.9 3.9h-10v-10l3.9 3.9 5-5z m0-7.2l-2.2 2.2-5-5-3.9 3.9v-10h10l-3.9 3.9z' })
        )
    );
};

exports.default = IoArrowExpand;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/arrow-shrink.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-icons/lib/io/arrow-shrink.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoArrowShrink = function IoArrowShrink(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm35 7.2l-6.4 6.4 3.9 3.9h-10v-10l3.9 3.9 6.4-6.4z m0 25.6l-2.2 2.2-6.4-6.4-3.9 3.9v-10h10l-3.9 3.9z m-30 0l6.4-6.4-3.9-3.9h10v10l-3.9-3.9-6.4 6.4z m0-25.6l2.2-2.2 6.4 6.4 3.9-3.9v10h-10l3.9-3.9z' })
        )
    );
};

exports.default = IoArrowShrink;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/ios-fastforward.js":
/*!************************************************************!*\
  !*** ./node_modules/react-icons/lib/io/ios-fastforward.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoIosFastforward = function IoIosFastforward(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm17.5 10l17.5 10-17.5 10v-9.6l-17.5 9.6v-20l17.5 9.6v-9.6z' })
        )
    );
};

exports.default = IoIosFastforward;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/pause.js":
/*!**************************************************!*\
  !*** ./node_modules/react-icons/lib/io/pause.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoPause = function IoPause(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm17.5 34.1c0 0.5-0.4 0.9-0.9 0.9h-5.7c-0.5 0-0.9-0.4-0.9-0.9v-28.2c0-0.5 0.4-0.9 0.9-0.9h5.7c0.5 0 0.9 0.4 0.9 0.9v28.2z m11.6-29.1c0.5 0 0.9 0.4 0.9 0.9v28.2c0 0.5-0.4 0.9-0.9 0.9h-5.7c-0.5 0-0.9-0.4-0.9-0.9v-28.2c0-0.5 0.4-0.9 0.9-0.9h5.7z' })
        )
    );
};

exports.default = IoPause;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/play.js":
/*!*************************************************!*\
  !*** ./node_modules/react-icons/lib/io/play.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoPlay = function IoPlay(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm31.6 18.2c0.6 0.5 0.9 1.1 0.9 1.8s-0.3 1.3-0.9 1.8l-21.7 13c-0.3 0.1-0.5 0.2-0.8 0.2-0.9 0-1.6-0.7-1.6-1.6v-26.8c0-0.9 0.7-1.6 1.6-1.6 0.3 0 0.6 0.1 0.8 0.2z' })
        )
    );
};

exports.default = IoPlay;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/volume-high.js":
/*!********************************************************!*\
  !*** ./node_modules/react-icons/lib/io/volume-high.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoVolumeHigh = function IoVolumeHigh(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm15.5 31.9l-7.4-6.9h-8.1v-10h8.1l7.4-6.9v23.8z m4.4-4.1l-1.5-1.2c1.3-1.9 2.1-4.1 2.1-6.6s-0.8-4.7-2.1-6.6l1.5-1.2c1.6 2.2 2.6 4.9 2.6 7.8s-1 5.6-2.6 7.8z m5.3 3.6l-1.7-1.2c2.1-2.9 3.4-6.4 3.4-10.2s-1.3-7.3-3.4-10.2l1.7-1.2c2.3 3.2 3.7 7.1 3.7 11.4s-1.4 8.2-3.7 11.4z m3.3-25.2l1.6-1.2c3 4.2 4.9 9.4 4.9 15s-1.9 10.8-4.9 15l-1.6-1.2c2.8-3.8 4.5-8.6 4.5-13.8s-1.7-10-4.5-13.8z' })
        )
    );
};

exports.default = IoVolumeHigh;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/volume-low.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-icons/lib/io/volume-low.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoVolumeLow = function IoVolumeLow(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm24 31.9l-7.4-6.9h-8.1v-10h8.1l7.4-6.9v23.8z m4.4-4.1l-1.5-1.2c1.3-1.9 2.1-4.1 2.1-6.6s-0.8-4.7-2.1-6.6l1.5-1.2c1.6 2.2 2.6 4.9 2.6 7.8s-1 5.6-2.6 7.8z' })
        )
    );
};

exports.default = IoVolumeLow;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/volume-medium.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-icons/lib/io/volume-medium.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoVolumeMedium = function IoVolumeMedium(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm21 31.9l-7.4-6.9h-8.1v-10h8.1l7.4-6.9v23.8z m4.4-4.1l-1.5-1.2c1.3-1.9 2.1-4.1 2.1-6.6s-0.8-4.7-2.1-6.6l1.5-1.2c1.6 2.2 2.6 4.9 2.6 7.8s-1 5.6-2.6 7.8z m5.3 3.6l-1.7-1.2c2.1-2.9 3.4-6.4 3.4-10.2s-1.3-7.3-3.4-10.2l1.7-1.2c2.3 3.2 3.7 7.1 3.7 11.4s-1.4 8.2-3.7 11.4z' })
        )
    );
};

exports.default = IoVolumeMedium;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-icons/lib/io/volume-mute.js":
/*!********************************************************!*\
  !*** ./node_modules/react-icons/lib/io/volume-mute.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = __webpack_require__(/*! react-icon-base */ "./node_modules/react-icon-base/lib/index.js");

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoVolumeMute = function IoVolumeMute(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm17.5 17l3.7-4v14l-3.7-4h-5.1v-6h5.1z m8.4-12.3c5.4 3 9.1 8.7 9.1 15.3 0 9.7-7.8 17.5-17.5 17.5-3 0-5.9-0.8-8.4-2.1l-0.1-0.1c-5.4-3-9-8.7-9-15.3 0-9.7 7.8-17.5 17.5-17.5 3 0 5.9 0.8 8.4 2.2h0z m2.4 23c1.5-2.2 2.6-4.8 2.6-7.7 0-5.2-3-9.6-7.2-11.8-0.5-0.2-0.9-0.5-1.4-0.6-1.4-0.6-3.1-0.9-4.8-0.9-2.9 0-5.5 1-7.7 2.5l5.7 5.8h-6l-2.8-2.7c-1.5 2.2-2.5 4.8-2.5 7.7 0 5.1 2.8 9.5 7 11.7 0.5 0.3 1.1 0.6 1.5 0.7 1.5 0.6 3.1 0.9 4.8 0.9 2.9 0 5.6-1 7.8-2.5l-1.6-1.6v-6z' })
        )
    );
};

exports.default = IoVolumeMute;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/recompose/shallowEqual.js":
/*!************************************************!*\
  !*** ./node_modules/recompose/shallowEqual.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shallowEqual = __webpack_require__(/*! fbjs/lib/shallowEqual */ "./node_modules/fbjs/lib/shallowEqual.js");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _shallowEqual2.default;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components/Button.js":
/*!**********************************!*\
  !*** ./src/components/Button.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(/*! recompose */ "recompose");

var _icons = __webpack_require__(/*! ../icons */ "./src/icons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// external dependencies
var ICON_STYLE = {
  fontSize: 20
};

// icons


var Button = (0, _recompose.pure)(function (_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      label = _ref.label,
      onClick = _ref.onClick,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style;

  var Icon = _icons.icons[icon];

  return _react2.default.createElement(
    'div',
    {
      'aria-label': label,
      onClick: onClick,
      role: 'button',
      style: style
    },
    _react2.default.createElement(Icon, { style: ICON_STYLE }),
    children
  );
});

Button.propTypes = {
  children: _propTypes2.default.node,
  icon: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = Button;
module.exports = exports['default'];

/***/ }),

/***/ "./src/components/Display.js":
/*!***********************************!*\
  !*** ./src/components/Display.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(/*! recompose */ "recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Display = (0, _recompose.pure)(function (_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style;
  return _react2.default.createElement(
    'div',
    {
      onClick: onClick,
      style: style
    },
    children
  );
}); // external dependencies


Display.propTypes = {
  children: _propTypes2.default.node,
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = Display;
module.exports = exports['default'];

/***/ }),

/***/ "./src/components/InformationBar.js":
/*!******************************************!*\
  !*** ./src/components/InformationBar.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(/*! recompose */ "recompose");

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// external dependencies
var InformationBar = (0, _recompose.pure)(function (_ref) {
  var currentTime = _ref.currentTime,
      duration = _ref.duration,
      style = _ref.style;

  var currentTimeDisplay = (0, _utils.getTimeFormatFromCurrentTime)(currentTime);
  var durationDisplay = (0, _utils.getTimeFormatFromCurrentTime)(duration);

  return _react2.default.createElement(
    'div',
    {
      'aria-label': currentTimeDisplay + ' out of ' + duration + ' has passed',
      style: style
    },
    currentTimeDisplay,
    ' / ',
    durationDisplay
  );
});

// utils


InformationBar.propTypes = {
  currentTime: _propTypes2.default.number,
  duration: _propTypes2.default.number
};

exports.default = InformationBar;
module.exports = exports['default'];

/***/ }),

/***/ "./src/components/Track.js":
/*!*********************************!*\
  !*** ./src/components/Track.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(/*! recompose */ "recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = (0, _recompose.pure)(function (_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style;
  return _react2.default.createElement('div', { style: style });
}); // external dependencies


Track.propTypes = {
  style: _propTypes2.default.object
};

exports.default = Track;
module.exports = exports['default'];

/***/ }),

/***/ "./src/components/TrackButton.js":
/*!***************************************!*\
  !*** ./src/components/TrackButton.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(/*! recompose */ "recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrackButton = (0, _recompose.pure)(function (_ref) {
  var label = _ref.label,
      onMouseDown = _ref.onMouseDown,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style;
  return (
    // eslint workaround
    _react2.default.createElement('span', {
      'aria-label': label,
      onMouseDown: onMouseDown,
      role: 'button',
      style: style
    })
  );
}); // external dependencies


TrackButton.propTypes = {
  onMouseDown: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = TrackButton;
module.exports = exports['default'];

/***/ }),

/***/ "./src/components/VolumeContainer.js":
/*!*******************************************!*\
  !*** ./src/components/VolumeContainer.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__(/*! recompose */ "recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VolumeContainer = (0, _recompose.pure)(function (_ref) {
  var children = _ref.children,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style;
  return _react2.default.createElement(
    'div',
    {
      className: '__vidz_volume_change__',
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      role: 'button',
      style: style
    },
    children
  );
}); // external dependencies


VolumeContainer.propTypes = {
  children: _propTypes2.default.node,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  style: _propTypes2.default.object
};

exports.default = VolumeContainer;
module.exports = exports['default'];

/***/ }),

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icons = exports.availableIcons = undefined;

var _arrowExpand = __webpack_require__(/*! react-icons/lib/io/arrow-expand */ "./node_modules/react-icons/lib/io/arrow-expand.js");

var _arrowExpand2 = _interopRequireDefault(_arrowExpand);

var _iosFastforward = __webpack_require__(/*! react-icons/lib/io/ios-fastforward */ "./node_modules/react-icons/lib/io/ios-fastforward.js");

var _iosFastforward2 = _interopRequireDefault(_iosFastforward);

var _pause = __webpack_require__(/*! react-icons/lib/io/pause */ "./node_modules/react-icons/lib/io/pause.js");

var _pause2 = _interopRequireDefault(_pause);

var _play = __webpack_require__(/*! react-icons/lib/io/play */ "./node_modules/react-icons/lib/io/play.js");

var _play2 = _interopRequireDefault(_play);

var _arrowShrink = __webpack_require__(/*! react-icons/lib/io/arrow-shrink */ "./node_modules/react-icons/lib/io/arrow-shrink.js");

var _arrowShrink2 = _interopRequireDefault(_arrowShrink);

var _volumeHigh = __webpack_require__(/*! react-icons/lib/io/volume-high */ "./node_modules/react-icons/lib/io/volume-high.js");

var _volumeHigh2 = _interopRequireDefault(_volumeHigh);

var _volumeLow = __webpack_require__(/*! react-icons/lib/io/volume-low */ "./node_modules/react-icons/lib/io/volume-low.js");

var _volumeLow2 = _interopRequireDefault(_volumeLow);

var _volumeMedium = __webpack_require__(/*! react-icons/lib/io/volume-medium */ "./node_modules/react-icons/lib/io/volume-medium.js");

var _volumeMedium2 = _interopRequireDefault(_volumeMedium);

var _volumeMute = __webpack_require__(/*! react-icons/lib/io/volume-mute */ "./node_modules/react-icons/lib/io/volume-mute.js");

var _volumeMute2 = _interopRequireDefault(_volumeMute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AVAILABLE_ICONS = {
  EXPAND: 'EXPAND',
  FAST_FORWARD: 'FAST_FORWARD',
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  SHRINK: 'SHRINK',
  VOLUME_HIGH: 'VOLUME_HIGH',
  VOLUME_LOW: 'VOLUME_LOW',
  VOLUME_MEDIUM: 'VOLUME_MEDIUM',
  VOLUME_MUTE: 'VOLUME_MUTE'
}; // external dependencies


var ICON_MAP = {
  EXPAND: _arrowExpand2.default,
  FAST_FORWARD: _iosFastforward2.default,
  PAUSE: _pause2.default,
  PLAY: _play2.default,
  SHRINK: _arrowShrink2.default,
  VOLUME_HIGH: _volumeHigh2.default,
  VOLUME_LOW: _volumeLow2.default,
  VOLUME_MEDIUM: _volumeMedium2.default,
  VOLUME_MUTE: _volumeMute2.default
};

exports.availableIcons = AVAILABLE_ICONS;
exports.icons = ICON_MAP;
exports.default = {
  availableIcons: AVAILABLE_ICONS,
  icons: ICON_MAP
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2; // external dependencies


// components


// icons


var _elementResizeEvent = __webpack_require__(/*! element-resize-event */ "./node_modules/element-resize-event/index.js");

var _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

var _debounce = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");

var _debounce2 = _interopRequireDefault(_debounce);

var _isUndefined = __webpack_require__(/*! lodash/isUndefined */ "./node_modules/lodash/isUndefined.js");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "react-dom");

var _recompose = __webpack_require__(/*! recompose */ "recompose");

var _shallowEqual = __webpack_require__(/*! recompose/shallowEqual */ "./node_modules/recompose/shallowEqual.js");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _vidz = __webpack_require__(/*! vidz */ "vidz");

var _vidz2 = _interopRequireDefault(_vidz);

var _Button = __webpack_require__(/*! ./components/Button */ "./src/components/Button.js");

var _Button2 = _interopRequireDefault(_Button);

var _Display = __webpack_require__(/*! ./components/Display */ "./src/components/Display.js");

var _Display2 = _interopRequireDefault(_Display);

var _InformationBar = __webpack_require__(/*! ./components/InformationBar */ "./src/components/InformationBar.js");

var _InformationBar2 = _interopRequireDefault(_InformationBar);

var _Track = __webpack_require__(/*! ./components/Track */ "./src/components/Track.js");

var _Track2 = _interopRequireDefault(_Track);

var _TrackButton = __webpack_require__(/*! ./components/TrackButton */ "./src/components/TrackButton.js");

var _TrackButton2 = _interopRequireDefault(_TrackButton);

var _VolumeContainer = __webpack_require__(/*! ./components/VolumeContainer */ "./src/components/VolumeContainer.js");

var _VolumeContainer2 = _interopRequireDefault(_VolumeContainer);

var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _styles = __webpack_require__(/*! ./styles */ "./src/styles.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var THEMES = ['dark', 'light'];

var PLAYBACK_SPEEDS = [1, 2, 4, 8, 16];

var _getFullscreenPropert = (0, _utils.getFullscreenProperties)(),
    exitFullscreen = _getFullscreenPropert.exitFullscreen,
    fullscreen = _getFullscreenPropert.fullscreen,
    fullscreenchange = _getFullscreenPropert.fullscreenchange,
    fullscreenEnabled = _getFullscreenPropert.fullscreenEnabled,
    requestFullscreen = _getFullscreenPropert.requestFullscreen;

var transformProperty = (0, _utils.getTransformProperty)();

var VidzPlayer = (_temp2 = _class = function (_Component) {
  _inherits(VidzPlayer, _Component);

  function VidzPlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VidzPlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VidzPlayer.__proto__ || Object.getPrototypeOf(VidzPlayer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      autoHideTimeout: null,
      canUseFullscreen: document[fullscreenEnabled],
      controlsVisible: true,
      currentTime: 0,
      duration: 0,
      isDraggingDurationTrackButton: false,
      isDraggingVolumeTrackButton: false,
      isFullscreen: false,
      isLoaded: false,
      isMuted: false,
      isPlaying: false,
      isVolumeChangeActive: false,
      playbackRateIndex: 0,
      queuedOnVolumeSet: [],
      volume: 1
    }, _this.duration = null, _this.durationTrack = null, _this.durationTrackButton = null, _this.vidzInstance = null, _this.volume = null, _this.volumeTrack = null, _this.volumeTrackButton = null, _this.debounceSetPlayerDimensionsOnResize = (0, _debounce2.default)(function () {
      var isFullscreen = _this.state.isFullscreen;


      if (isFullscreen) {
        _this.debounceSetPlayerDimensions();
      }
    }, 50), _this.debounceSetPlayerDimensions = (0, _debounce2.default)(function () {
      var dimensions = _this.getHeightAndWidth();

      _this.vidzInstance.setPlayerDimensions(dimensions);
    }, 50), _this.setTime = (0, _debounce2.default)(function (percentage) {
      _this.vidzInstance.setCurrentTime(percentage * _this.vidzInstance.duration);
    }, 50), _this.setVolume = (0, _debounce2.default)(function (percentage) {
      _this.vidzInstance.setVolume(percentage);
    }, 50), _this.getHeightAndWidth = function () {
      var _this$props = _this.props,
          heightFromProps = _this$props.height,
          widthFromProps = _this$props.width;
      var isFullscreen = _this.state.isFullscreen;


      var width = widthFromProps;

      if (isFullscreen) {
        width = window.innerWidth;
      } else if ((0, _isUndefined2.default)(width)) {
        width = Math.round(_this.refs.container.clientWidth);
      }

      var height = heightFromProps;

      if ((0, _isUndefined2.default)(height)) {
        if (_this.vidzInstance) {
          var naturalHeight = _this.vidzInstance.player.videoHeight;
          var naturalWidth = _this.vidzInstance.player.videoWidth;
          var multiplier = _this.vidzInstance.player.width / naturalWidth;

          height = Math.round(naturalHeight * multiplier);
        } else {
          height = Math.round(width * 0.6);
        }
      }

      if (isFullscreen) {
        var maxHeight = window.innerHeight;

        if (height > maxHeight) {
          height = maxHeight;
        }
      }

      return {
        height: height,
        width: width
      };
    }, _this.onClickDurationTrack = function (e) {
      var left = _this.duration.getBoundingClientRect().left;
      var offset = e.pageX - left;
      var percentage = offset / _this.duration.clientWidth;

      _this.setDurationTrackButtonPosition(percentage, true);
    }, _this.onClickFastForward = function () {
      var _this$state = _this.state,
          isPlaying = _this$state.isPlaying,
          playbackRateIndex = _this$state.playbackRateIndex;


      if (isPlaying) {
        var newIndex = playbackRateIndex === PLAYBACK_SPEEDS.length - 1 ? 0 : playbackRateIndex + 1;

        _this.setState({
          playbackRateIndex: newIndex
        });

        _this.vidzInstance.setPlaybackRate(PLAYBACK_SPEEDS[newIndex]);
      }
    }, _this.onClickPlayPauseButton = function () {
      var isPlaying = _this.state.isPlaying;


      if (_this.vidzInstance.playbackRate !== 1) {
        _this.vidzInstance.setPlaybackRate(1);

        _this.setState({
          playbackRateIndex: 0
        });
      }

      if (isPlaying) {
        _this.vidzInstance.pause();
      } else {
        _this.vidzInstance.play();
      }
    }, _this.onClickToggleFullscreen = function () {
      var isFullscreen = _this.state.isFullscreen;


      if (isFullscreen) {
        document[exitFullscreen]();
      } else {
        _this.refs.container[requestFullscreen]();
      }
    }, _this.onClickToggleVolumeMuted = function () {
      var isMuted = _this.state.isMuted;


      if (isMuted) {
        _this.setState({
          isMuted: false
        });

        _this.vidzInstance.unmute();
      } else {
        _this.setState({
          isMuted: true
        });

        _this.vidzInstance.mute();
      }
    }, _this.onClickVolumeTrack = function (e) {
      var top = _this.volume.getBoundingClientRect().top;
      var offset = e.pageY - top;
      var percentage = offset / _this.volume.clientHeight;

      _this.setVolumeTrackButtonPosition(percentage, true);
    }, _this.onDragDurationTrackButton = function (e) {
      var left = _this.duration.getBoundingClientRect().left;

      var offset = e.pageX - left;

      var percentage = offset / _this.duration.clientWidth;

      if (percentage > 1) {
        percentage = 1;
      } else if (percentage < 0) {
        percentage = 0;
      }

      _this.setDurationTrackButtonPosition(percentage, true);
    }, _this.onDragVolumeTrackButton = function (e) {
      var top = _this.volumeTrack.getBoundingClientRect().top;

      var offset = e.pageY - top;

      var percentage = offset / _this.volumeTrack.clientHeight;

      if (percentage > 1) {
        percentage = 1;
      } else if (percentage < 0) {
        percentage = 0;
      }

      _this.setVolumeTrackButtonPosition(percentage, true);
    }, _this.onDragEndDurationTrackButton = function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this.setState({
        isDraggingDurationTrackButton: false
      });

      window.removeEventListener('mouseup', _this.onDragEndDurationTrackButton);
      window.removeEventListener('mousemove', _this.onDragDurationTrackButton);
    }, _this.onDragEndVolumeTrackButton = function (e) {
      e.stopPropagation();
      e.preventDefault();

      var queuedOnVolumeSet = _this.state.queuedOnVolumeSet;


      _this.setState({
        isDraggingVolumeTrackButton: false
      });

      queuedOnVolumeSet.forEach(function (fn) {
        fn();
      });

      _this.setState({
        queuedOnVolumeSet: []
      });

      window.removeEventListener('mouseup', _this.onDragEndVolumeTrackButton);
      window.removeEventListener('mousemove', _this.onDragVolumeTrackButton);
    }, _this.onDragStartDurationTrackButton = function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this.setState({
        isDraggingDurationTrackButton: true
      });

      window.addEventListener('mouseup', _this.onDragEndDurationTrackButton);
      window.addEventListener('mousemove', _this.onDragDurationTrackButton);
    }, _this.onDragStartVolumeTrackButton = function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this.setState({
        isDraggingVolumeTrackButton: true
      });

      window.addEventListener('mouseup', _this.onDragEndVolumeTrackButton);
      window.addEventListener('mousemove', _this.onDragVolumeTrackButton);
    }, _this.onFullscreenChange = function () {
      _this.setState({
        isFullscreen: document[fullscreen]
      });

      var dimensions = _this.getHeightAndWidth();

      _this.vidzInstance.setPlayerDimensions(dimensions);
    }, _this.onLoadedMetadata = function (e, instance) {
      var onLoadedMetadata = _this.props.onLoadedMetadata;


      _this.setPercentLoaded(instance.percentLoaded);
      _this.setTimeRepresentation({
        duration: instance.duration
      });

      if (onLoadedMetadata) {
        onLoadedMetadata.call(instance, e, instance);
      }
    }, _this.onMouseEnterVolumeChange = function () {
      var queuedOnVolumeSet = _this.state.queuedOnVolumeSet;


      if (queuedOnVolumeSet.length) {
        _this.setState({
          queuedOnVolumeSet: []
        });
      }

      _this.setVolumeChangeState(true);
    }, _this.onMouseLeaveVolumeChange = function () {
      var isDraggingVolumeTrackButton = _this.state.isDraggingVolumeTrackButton;


      if (isDraggingVolumeTrackButton) {
        var queuedOnVolumeSet = [_this.setVolumeChangeState];

        _this.setState({
          queuedOnVolumeSet: queuedOnVolumeSet
        });
      } else {
        _this.setVolumeChangeState();
      }
    }, _this.setVolumeChangeState = function () {
      var isActive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      _this.setState({
        isVolumeChangeActive: isActive
      });
    }, _this.onMouseMoveContainer = function () {
      var _this$state2 = _this.state,
          autoHideTimeout = _this$state2.autoHideTimeout,
          controlsVisible = _this$state2.controlsVisible,
          isPlaying = _this$state2.isPlaying;


      clearTimeout(autoHideTimeout);

      if (!controlsVisible) {
        _this.setState({
          controlsVisible: true
        });
      }

      if (isPlaying) {
        _this.setTimeoutToHideControls();
      }
    }, _this.onPause = function (e, instance) {
      var onPause = _this.props.onPause;
      var autoHideTimeout = _this.state.autoHideTimeout;


      clearTimeout(autoHideTimeout);

      _this.setState({
        controlsVisible: true,
        isPlaying: false
      });

      if (onPause) {
        onPause.call(instance, e, instance);
      }

      _this.setPercentLoaded(instance.percentLoaded);
    }, _this.onPlay = function (e, instance) {
      var onPlay = _this.props.onPlay;
      var controlsVisible = _this.state.controlsVisible;


      _this.setState({
        isPlaying: true
      });

      if (onPlay) {
        onPlay.call(instance, e, instance);
      }

      _this.setPercentLoaded(instance.percentLoaded);

      if (controlsVisible) {
        _this.setTimeoutToHideControls();
      }
    }, _this.onTimeUpdate = function (e, instance) {
      var onTimeUpdate = _this.props.onTimeUpdate;


      _this.setPercentPlayed(instance.currentTime, instance.duration);
      _this.setPercentLoaded(instance.percentLoaded);
      _this.setTimeRepresentation({
        currentTime: instance.currentTime
      });

      if (onTimeUpdate) {
        onTimeUpdate.call(instance, e, instance);
      }
    }, _this.onVolumeChange = function (e, instance) {
      var onVolumeChange = _this.props.onVolumeChange;


      var volume = _this.vidzInstance.volume;

      _this.setState({
        volume: volume
      });

      if (onVolumeChange) {
        onVolumeChange.call(instance, e, instance);
      }
    }, _this.setDurationTrackButtonPosition = function (percentage) {
      var setTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var marginLeft = Math.round(percentage * 12);
      var percentInPixels = Math.round(percentage * _this.duration.clientWidth);
      var left = percentInPixels - marginLeft;

      if (transformProperty) {
        _this.durationTrackButton.style.transform = 'translate3d(' + left + 'px, 0, 0)';
      } else {
        _this.durationTrackButton.style.left = left + 'px';
      }

      if (setTime) {
        _this.setTime(percentage);
      }
    }, _this.setPercentLoaded = function (percentLoaded) {
      _this.durationTrack.style.width = percentLoaded + '%';
    }, _this.setPercentPlayed = function (currentTime, duration) {
      var percentPlayed = (0, _utils.getPercentPlayed)(currentTime, duration);

      _this.setDurationTrackButtonPosition(percentPlayed / 100);
    }, _this.setTimeRepresentation = function (_ref2) {
      var currentTime = _ref2.currentTime,
          duration = _ref2.duration;

      if (!(0, _isUndefined2.default)(currentTime)) {
        _this.setState({
          currentTime: currentTime
        });
      }

      if (!(0, _isUndefined2.default)(duration)) {
        _this.setState({
          duration: duration
        });
      }
    }, _this.setTimeoutToHideControls = function () {
      var preventAutoHideControls = _this.props.preventAutoHideControls;


      if (!preventAutoHideControls) {
        var autoHideTimeout = setTimeout(function () {
          _this.setState({
            controlsVisible: false
          });
        }, 3000);

        _this.setState({
          autoHideTimeout: autoHideTimeout
        });
      }
    }, _this.setVidzInstance = function () {
      if (_this.refs.container.parentNode.clientWidth === 0) {
        _this.debounceSetPlayerDimensions();
      }

      var _this$props2 = _this.props,
          autoplay = _this$props2.autoplay,
          muted = _this$props2.muted;

      var _this$getHeightAndWid = _this.getHeightAndWidth(),
          height = _this$getHeightAndWid.height,
          width = _this$getHeightAndWid.width;

      _this.vidzInstance = (0, _vidz2.default)(_this.refs.playerContainer, _extends({}, _this.props, {
        controls: false,
        height: height,
        onLoadedMetadata: _this.onLoadedMetadata,
        onPause: _this.onPause,
        onPlay: _this.onPlay,
        onTimeUpdate: _this.onTimeUpdate,
        onVolumeChange: _this.onVolumeChange,
        width: width
      }));

      _this.vidzInstance.player.style.display = 'block';

      if (autoplay) {
        _this.setState({
          isPlaying: true
        });
      }

      if (muted) {
        _this.setState({
          isMuted: true
        });
      }

      _this.setState({
        isLoaded: true
      });
    }, _this.setVolumeTrackButtonPosition = function (percentage) {
      var setVolume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var top = Math.round(percentage * _this.volumeTrack.clientHeight);

      if (transformProperty) {
        _this.volumeTrackButton.style.transform = 'translate3d(0, ' + top + 'px, 0)';
      } else {
        _this.volumeTrackButton.style.top = top + 'px';
      }

      if (setVolume) {
        _this.setVolume(1 - percentage);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VidzPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setVidzInstance();

      (0, _elementResizeEvent2.default)(this.refs.container, this.debounceSetPlayerDimensions);

      document.addEventListener(fullscreenchange, this.onFullscreenChange);
      window.addEventListener('resize', this.debounceSetPlayerDimensionsOnResize);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(previousProps) {
      if (!(0, _shallowEqual2.default)(this.props, previousProps) || !this.state.isLoaded) {
        this.setVidzInstance();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener(fullscreenchange, this.onFullscreenChange);
      window.removeEventListener('resize', this.debounceSetPlayerDimensionsOnResize);
    }

    /**
     * if in fullscreen mode, resize the player because it isn't handled by the
     * element resize
     */


    /**
     * resize the Vidz instance dimensions
     */


    /**
     * set the currentTime on the Vidz instance based on the percentage of the duration
     */


    /**
     * update the volume of the Vidz instance based on the percentage passed
     */


    /**
     * get the intended height and width
     *
     * the width is either the explicit width passed as a prop, the width of the
     * parent container, or if in fullscreen mode the width of the window
     *
     * the height is either the explicit height passed as a prop or the aspect
     * ratio of the video based on its metadata (with a generic default until
     * metadata has loaded)
     *
     * @return {{height: number, width: number}}
     */


    /**
     * set the currentTime of the video based on the location clicked
     *
     * @param {Event} e
     */


    /**
     * increase the playback rate in increments in PLAYBACK_SPEEDS
     */


    /**
     * toggle between play and pause
     */


    /**
     * toggle between fullscreen mode and standard mode
     */


    /**
     * toggle between muted and unmuted
     */


    /**
     * set the volume based on the location clicked
     *
     * @param {Event} e
     */


    /**
     * based on where the button was dragged, calculate the percentage
     * of the total video length and jump to that time location
     *
     * @param {Event} e
     */


    /**
     * based on where the button was dragged, calculate the percentage
     * of the total volume length and apply that volume
     *
     * @param {Event} e
     */


    /**
     * when finished dragging the button, remove the listeners
     *
     * @param {Event} e
     */


    /**
     * when finished dragging the button, remove the listeners and if there
     * are functions in the queue to fire, fire them
     *
     * @param {Event} e
     */


    /**
     * when you start dragging, add listeners to update the currentTime
     * onDrag
     *
     * @param {Event} e
     */


    /**
     * when you start dragging, add listeners to update the volume
     * onDrag
     *
     * @param {Event} e
     */


    /**
     * when the fullscreen state changes, reset the dimensions of the video
     */


    /**
     * when metadata has loaded, update the percentLoaded and the
     * time displayed, and fire the function passed by props if exists
     *
     * @param {Event} e
     * @param {Vidz} instance
     */


    /**
     * show the volume bar on mouseenter
     */


    /**
     * hide the volume bar on mouseleave unless a drag is in effect,
     * else queue up the closure of it
     */


    /**
     * set the active state of the volume bar
     *
     * @param {boolean} isActive
     */


    /**
     * when mouse movement occurs over the container, clear
     * the timeout of hiding the controls and set a new one
     */


    /**
     * on pause set the controls to be visible and the isPlaying state,
     * plus the function passed by props if it exists
     *
     * @param {Event} e
     * @param {instance} instance
     */


    /**
     * on play set the hde controls timeout and the isPlaying state,
     * plus the function passed by props if it exists
     *
     * @param {Event} e
     * @param {instance} instance
     */


    /**
     * on time update set the currentTime and percent loaded,
     * plus the function passed by props if it exists
     *
     * @param {Event} e
     * @param {instance} instance
     */


    /**
     * on volume change set the volume in state,
     * plus the function passed by props if it exists
     *
     * @param {Event} e
     * @param {instance} instance
     */


    /**
     * update the position of the durationTrackButton,
     * and the currentTime if setTime is true
     *
     * @param {number} percentage
     * @param {boolean} setTime=false
     */


    /**
     * update the width of the duration track with the new percent loaded
     *
     * @param {number} percentLoaded
     */


    /**
     * set the position of the duration track button based on the percent played
     *
     * @param {number} currentTime
     * @param {number} duration
     */


    /**
     * set the currentTime and duration in state so they can be reflected
     * in the visual display
     *
     * @param {number} currentTime
     * @param {number} duration
     */


    /**
     * set the timeout to hide the controls from inactivity
     */


    /**
     * create a new Vidz instance and save it to the class' instance
     */


    /**
     * update the position of the volume track button based on the percentage passed,
     * and set the volume if setVolume is true
     *
     * @param {number} percentage
     * @param {boolean} setVolume=false
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          controlsBackgroundColor = _props.controlsBackgroundColor,
          controlsFontColor = _props.controlsFontColor,
          playOnClick = _props.playOnClick,
          controlsTrackColor = _props.controlsTrackColor,
          theme = _props.theme;
      var _state = this.state,
          canUseFullscreen = _state.canUseFullscreen,
          controlsVisible = _state.controlsVisible,
          currentTime = _state.currentTime,
          duration = _state.duration,
          isFullscreen = _state.isFullscreen,
          isMuted = _state.isMuted,
          isPlaying = _state.isPlaying,
          isVolumeChangeActive = _state.isVolumeChangeActive,
          playbackRateIndex = _state.playbackRateIndex;


      var volume = this.vidzInstance ? this.vidzInstance.volume : 1;
      var volumeIcon = (0, _utils.getVolumeIcon)(volume, isMuted);

      var styles = void 0;

      switch (theme) {
        case THEMES[1]:
          styles = _styles.lightStyles;
          break;

        default:
          styles = _styles.darkStyles;
          break;
      }

      var controlsStyle = (0, _utils.getControlsContainerStyle)(styles.controlsContainer, controlsVisible);
      var durationTrackStyle = (0, _utils.getControlStyle)(styles.durationTrack, controlsTrackColor);
      var durationTrackButtonStyle = (0, _utils.getControlStyle)(styles.durationTrackButton, controlsFontColor);
      var playPauseButtonStyle = (0, _utils.getControlStyle)(styles.playPauseButton, controlsBackgroundColor, controlsFontColor);
      var volumeButtonStyle = (0, _utils.getControlStyle)(styles.volumeButton, controlsBackgroundColor, controlsFontColor);
      var informationContainerStyle = (0, _utils.getControlStyle)(styles.informationContainer, controlsBackgroundColor, controlsFontColor);
      var fastForwardButtonStyle = (0, _utils.getControlStyle)(styles.fastForwardButton, controlsBackgroundColor, controlsFontColor);
      var fullscreenButtonStyle = (0, _utils.getControlStyle)(styles.fullscreenButton, controlsBackgroundColor, controlsFontColor);
      var volumeChangeStyle = (0, _utils.getVolumeChangeStyle)(styles.volumeChange, _styles.allStyles.volumeChangeActive, isVolumeChangeActive, controlsBackgroundColor, controlsFontColor);
      var volumeChangeTrackStyle = (0, _utils.getControlStyle)(styles.volumeChangeTrack, controlsTrackColor);
      var volumeTrackButtonStyle = (0, _utils.getControlStyle)(styles.volumeTrackButton, controlsFontColor);

      return _react2.default.createElement(
        'div',
        {
          onMouseMove: this.onMouseMoveContainer,
          ref: 'container',
          style: styles.container
        },
        _react2.default.createElement('div', {
          onClick: playOnClick && this.onClickPlayPauseButton,
          ref: 'playerContainer'
        }),
        _react2.default.createElement(
          'div',
          { style: controlsStyle },
          _react2.default.createElement(
            _Display2.default,
            {
              onClick: this.onClickDurationTrack,
              ref: function ref(component) {
                _this2.duration = (0, _reactDom.findDOMNode)(component);
              },
              style: styles.durationSlider
            },
            _react2.default.createElement(_Track2.default, {
              ref: function ref(component) {
                _this2.durationTrack = (0, _reactDom.findDOMNode)(component);
              },
              style: durationTrackStyle
            }),
            _react2.default.createElement(_TrackButton2.default, {
              label: 'Seek to a different time in the video',
              onMouseDown: this.onDragStartDurationTrackButton,
              ref: function ref(component) {
                _this2.durationTrackButton = (0, _reactDom.findDOMNode)(component);
              },
              style: durationTrackButtonStyle
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.actionsContainer },
            _react2.default.createElement(_Button2.default, {
              icon: isPlaying ? _icons.availableIcons.PAUSE : _icons.availableIcons.PLAY,
              label: 'Toggle playing the video',
              onClick: this.onClickPlayPauseButton,
              style: playPauseButtonStyle
            }),
            _react2.default.createElement(_InformationBar2.default, {
              currentTime: currentTime,
              duration: duration,
              style: informationContainerStyle
            }),
            _react2.default.createElement(
              _Button2.default,
              {
                icon: _icons.availableIcons.FAST_FORWARD,
                label: 'Increase the playback speed',
                onClick: this.onClickFastForward,
                style: fastForwardButtonStyle
              },
              _react2.default.createElement(
                'span',
                { style: styles.speedIdentifier },
                PLAYBACK_SPEEDS[playbackRateIndex],
                'x'
              )
            ),
            _react2.default.createElement(
              _VolumeContainer2.default,
              {
                onMouseEnter: this.onMouseEnterVolumeChange,
                onMouseLeave: this.onMouseLeaveVolumeChange,
                style: styles.volumnChangeContainer
              },
              _react2.default.createElement(_Button2.default, {
                icon: volumeIcon,
                label: 'Toggle the video being muted',
                onClick: this.onClickToggleVolumeMuted,
                style: volumeButtonStyle
              }),
              _react2.default.createElement(
                _Display2.default,
                {
                  onClick: this.onClickVolumeTrack,
                  ref: function ref(component) {
                    _this2.volume = (0, _reactDom.findDOMNode)(component);
                  },
                  style: volumeChangeStyle
                },
                _react2.default.createElement(_Track2.default, {
                  ref: function ref(component) {
                    _this2.volumeTrack = (0, _reactDom.findDOMNode)(component);
                  },
                  style: volumeChangeTrackStyle
                }),
                _react2.default.createElement(_TrackButton2.default, {
                  label: 'Change the volume',
                  onMouseDown: this.onDragStartVolumeTrackButton,
                  ref: function ref(component) {
                    _this2.volumeTrackButton = (0, _reactDom.findDOMNode)(component);
                  },
                  style: volumeTrackButtonStyle
                })
              )
            ),
            canUseFullscreen && _react2.default.createElement(_Button2.default, {
              icon: isFullscreen ? _icons.availableIcons.SHRINK : _icons.availableIcons.EXPAND,
              label: 'Toggle fullscreen mode',
              onClick: this.onClickToggleFullscreen,
              style: fullscreenButtonStyle
            })
          )
        )
      );
    }
  }]);

  return VidzPlayer;
}(_react.Component), _class.propTypes = {
  autoplay: _propTypes2.default.bool,
  controlsBackgroundColor: _propTypes2.default.string,
  controlsFontColor: _propTypes2.default.string,
  controlsTrackColor: _propTypes2.default.string,
  height: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  mp4: _propTypes2.default.string,
  muted: _propTypes2.default.bool,
  ogg: _propTypes2.default.string,
  onCanPlay: _propTypes2.default.func,
  onCanPlayType: _propTypes2.default.func,
  onDurationChange: _propTypes2.default.func,
  onEmptied: _propTypes2.default.func,
  onEnded: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  onLoad: _propTypes2.default.func,
  onLoadStart: _propTypes2.default.func,
  onLoadedData: _propTypes2.default.func,
  onLoadedMetadata: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  onProgress: _propTypes2.default.func,
  onSeeked: _propTypes2.default.func,
  onSeeking: _propTypes2.default.func,
  onStalled: _propTypes2.default.func,
  onSuspend: _propTypes2.default.func,
  onTimeUpdate: _propTypes2.default.func,
  onVolumeChange: _propTypes2.default.func,
  onWaiting: _propTypes2.default.func,
  playOnClick: _propTypes2.default.bool,
  preload: _propTypes2.default.string,
  preventAutoHideControls: _propTypes2.default.bool,
  theme: _propTypes2.default.oneOf(THEMES),
  webm: _propTypes2.default.string,
  width: _propTypes2.default.number
}, _class.defaultProps = {
  autoplay: false,
  controls: false,
  loop: false,
  muted: false,
  playOnClick: false,
  preventAutoHideControls: false,
  theme: THEMES[0]
}, _temp2);
exports.default = (0, _recompose.pure)(VidzPlayer);
module.exports = exports['default'];

/***/ }),

/***/ "./src/styles.js":
/*!***********************!*\
  !*** ./src/styles.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var DARK_COLOR = 'rgb(63, 63, 63)';
var DARK_COLOR_BACKGROUND = 'rgba(63, 63, 63, 0.7)';
var LIGHT_COLOR = 'rgb(243, 243, 243)';
var LIGHT_COLOR_BACKGROUND = 'rgba(243, 243, 243, 0.7)';
var TRACK_BUTTON_SIZE = 12;
var BOX_SHADOW_SIZE = '0 0 3px';

var ALL_STYLES = {
  actionsContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  button: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    flexWrap: 'nowrap',
    fontSize: 16
  },
  container: {
    position: 'relative'
  },
  control: {
    height: 40,
    lineHeight: '40px',
    padding: '0 10px'
  },
  controlsContainer: {
    bottom: 0,
    left: 0,
    opacity: 1,
    position: 'absolute',
    right: 0,
    transition: 'opacity 150ms ease-in-out, visibility 150ms ease-in-out',
    visibility: 'visible'
  },
  durationSlider: {
    cursor: 'pointer',
    position: 'relative'
  },
  durationTrack: {
    height: 2,
    marginTop: -1,
    position: 'relative',
    top: '50%',
    width: 0
  },
  fullscreenButton: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0
  },
  informationContainer: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 0,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 12,
    minWidth: 1
  },
  playPauseButton: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0
  },
  speedIdentifier: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 11
  },
  trackButton: {
    borderRadius: '50%',
    display: 'block',
    height: TRACK_BUTTON_SIZE,
    position: 'absolute',
    width: TRACK_BUTTON_SIZE
  },
  video: {
    objectFit: 'fill'
  },
  volumeButton: {
    boxSizing: 'border-box',
    textAlign: 'center',
    width: 40
  },
  volumeChange: {
    backgroundColor: 'inherit',
    bottom: '100%',
    boxSizing: 'border-box',
    color: 'inherit',
    cursor: 'pointer',
    display: 'none',
    height: 100,
    left: 0,
    padding: '10px 0',
    position: 'absolute',
    width: '100%'
  },
  volumeChangeActive: {
    display: 'block'
  },
  volumeChangeTrack: {
    height: '100%',
    left: '50%',
    marginLeft: -1,
    position: 'relative',
    width: 2
  },
  volumnChangeContainer: {
    backgroundColor: 'inherit',
    color: 'inherit',
    position: 'relative',
    zIndex: 1000
  }
};

var darkStyles = _extends({}, ALL_STYLES, {
  control: _extends({}, ALL_STYLES.control, {
    backgroundColor: DARK_COLOR_BACKGROUND,
    color: LIGHT_COLOR
  }),
  durationSlider: _extends({}, ALL_STYLES.durationSlider),
  durationTrack: _extends({}, ALL_STYLES.durationTrack, {
    backgroundColor: LIGHT_COLOR
  }),
  durationTrackButton: _extends({}, ALL_STYLES.trackButton, {
    backgroundColor: LIGHT_COLOR,
    boxShadow: BOX_SHADOW_SIZE + ' ' + DARK_COLOR,
    left: 0,
    marginTop: -1 * (TRACK_BUTTON_SIZE / 2 + 1),
    top: '50%'
  }),
  volumeChange: _extends({}, ALL_STYLES.volumeChange, {
    backgroundColor: DARK_COLOR_BACKGROUND
  }),
  volumeChangeTrack: _extends({}, ALL_STYLES.volumeChangeTrack, {
    backgroundColor: LIGHT_COLOR
  }),
  volumeTrackButton: _extends({}, ALL_STYLES.trackButton, {
    backgroundColor: LIGHT_COLOR,
    boxShadow: BOX_SHADOW_SIZE + ' ' + DARK_COLOR,
    left: '50%',
    marginLeft: -1 * (TRACK_BUTTON_SIZE / 2),
    top: 6
  })
});

exports.darkStyles = darkStyles = _extends({}, darkStyles, {
  fastForwardButton: _extends({}, ALL_STYLES.button, darkStyles.control, ALL_STYLES.fastForwardButton),
  fullscreenButton: _extends({}, ALL_STYLES.button, darkStyles.control, ALL_STYLES.fullscreenButton),
  informationContainer: _extends({}, ALL_STYLES.informationContainer, darkStyles.control),
  playPauseButton: _extends({}, ALL_STYLES.button, darkStyles.control, ALL_STYLES.playPauseButton),
  volumeButton: _extends({}, ALL_STYLES.button, darkStyles.control, ALL_STYLES.volumeButton)
});

var lightStyles = _extends({}, ALL_STYLES, {
  control: _extends({}, ALL_STYLES.control, {
    backgroundColor: LIGHT_COLOR_BACKGROUND,
    color: DARK_COLOR
  }),
  durationSlider: _extends({}, ALL_STYLES.durationSlider),
  durationTrack: _extends({}, ALL_STYLES.durationTrack, {
    backgroundColor: DARK_COLOR
  }),
  durationTrackButton: _extends({}, ALL_STYLES.trackButton, {
    backgroundColor: DARK_COLOR,
    boxShadow: BOX_SHADOW_SIZE + ' ' + LIGHT_COLOR,
    left: 0,
    marginTop: -1 * (TRACK_BUTTON_SIZE / 2 + 1),
    top: '50%'
  }),
  volumeChange: _extends({}, ALL_STYLES.volumeChange, {
    backgroundColor: LIGHT_COLOR_BACKGROUND
  }),
  volumeChangeTrack: _extends({}, ALL_STYLES.volumeChangeTrack, {
    backgroundColor: DARK_COLOR
  }),
  volumeTrackButton: _extends({}, ALL_STYLES.trackButton, {
    backgroundColor: LIGHT_COLOR,
    boxShadow: BOX_SHADOW_SIZE + ' ' + DARK_COLOR,
    left: '50%',
    marginLeft: -1 * (TRACK_BUTTON_SIZE / 2 + 1),
    top: 0
  })
});

exports.lightStyles = lightStyles = _extends({}, lightStyles, {
  fastForwardButton: _extends({}, ALL_STYLES.button, lightStyles.control, ALL_STYLES.fastForwardButton),
  fullscreenButton: _extends({}, ALL_STYLES.button, lightStyles.control, ALL_STYLES.fullscreenButton),
  informationContainer: _extends({}, ALL_STYLES.informationContainer, lightStyles.control),
  playPauseButton: _extends({}, ALL_STYLES.button, lightStyles.control, ALL_STYLES.playPauseButton),
  volumeButton: _extends({}, ALL_STYLES.button, lightStyles.control, ALL_STYLES.volumeButton)
});

exports.allStyles = ALL_STYLES;
exports.darkStyles = darkStyles;
exports.lightStyles = lightStyles;
exports.default = {
  allStyles: ALL_STYLES,
  darkStyles: darkStyles,
  lightStyles: lightStyles
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVolumeIcon = exports.getVolumeChangeStyle = exports.getTransformProperty = exports.getPercentPlayed = exports.getTimeFormatFromCurrentTime = exports.getFullscreenProperties = exports.getControlStyle = exports.getControlsContainerStyle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // icons


var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

var TEST_DIV = document.createElement('div');

/**
 * get the style for the controls container based on isControlsVisible
 *
 * @param {object} defaultControlsStyle
 * @param {boolean} isControlsVisible
 * @return {object}
 */
var getControlsContainerStyle = function getControlsContainerStyle(defaultControlsStyle, isControlsVisible) {
  if (isControlsVisible) {
    return defaultControlsStyle;
  }

  return _extends({}, defaultControlsStyle, {
    opacity: 0,
    visibility: 'hidden'
  });
};

/**
 * get the style for the control based on backgroundColor and fontColor
 *
 * @param {object} defaultStyle
 * @param {string} backgroundColor
 * @param {string} fontColor
 * @return {object}
 */
var getControlStyle = function getControlStyle(defaultStyle, backgroundColor, fontColor) {
  if (!backgroundColor && !fontColor) {
    return defaultStyle;
  }

  var mergedStyle = {};

  if (backgroundColor) {
    mergedStyle.backgroundColor = backgroundColor;
  }

  if (fontColor) {
    mergedStyle.color = fontColor;
  }

  return _extends({}, defaultStyle, mergedStyle);
};

/**
 * get the vendor-prefixed properties associated with fullscreen activities
 *
 * @return {object}
 */
var getFullscreenProperties = function getFullscreenProperties() {
  if ('requestFullscreen' in TEST_DIV) {
    var fullscreen = 'webkitIsFullscreen' in TEST_DIV ? 'webkitIsFullScreen' : 'fullscreen';

    return {
      exitFullscreen: 'exitFullscreen',
      fullscreen: fullscreen,
      fullscreenEnabled: 'fullscreenEnabled',
      fullscreenchange: 'fullscreenchange',
      requestFullscreen: 'requestFullscreen'
    };
  }

  if ('webkitRequestFullscreen' in TEST_DIV) {
    return {
      exitFullscreen: 'webkitExitFullscreen',
      fullscreen: 'webkitIsFullScreen',
      fullscreenEnabled: 'webkitFullscreenEnabled',
      fullscreenchange: 'webkitfullscreenchange',
      requestFullscreen: 'webkitRequestFullscreen'
    };
  }

  if ('mozRequestFullScreen' in TEST_DIV) {
    return {
      exitFullscreen: 'mozCancelFullScreen',
      fullscreen: 'mozFullScreen',
      fullscreenEnabled: 'mozFullScreenEnabled',
      fullscreenchange: 'mozfullscreenchange',
      requestFullscreen: 'mozRequestFullScreen'
    };
  }

  return {
    exitFullscreen: 'exitFullscreen',
    fullscreen: 'fullscreen',
    fullscreenEnabled: 'fullscreenEnabled',
    fullscreenchange: 'fullscreenchange',
    requestFullscreen: 'requestFullscreen'
  };
};

/**
 * get the percentage played rounded to two decimal places
 *
 * @param {number} currentTime
 * @param {number} duration
 * @return {number}
 */
var getPercentPlayed = function getPercentPlayed(currentTime, duration) {
  return Math.round(currentTime / duration * 10000) / 100;
};

/**
 * based on the currentTime, show the string format as either
 * HH:MM:SS or MM:SS, based on showHours
 *
 * @param {number} currentTime
 * @param {boolean} showHours=false
 * @return {string}
 */
var getTimeFormatFromCurrentTime = function getTimeFormatFromCurrentTime(currentTime) {
  var showHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var integerValue = parseInt(currentTime, 10);
  var hours = Math.floor(integerValue / 3600);
  var minutes = Math.floor((integerValue - hours * 3600) / 60);
  var seconds = integerValue - hours * 3600 - minutes * 60;
  var hoursDisplay = hours < 10 ? '0' + hours : hours;
  var minutesDisplay = minutes < 10 ? '0' + minutes : minutes;
  var secondsDisplay = seconds < 10 ? '0' + seconds : seconds;

  if (showHours) {
    return hoursDisplay + ':' + minutesDisplay + ':' + secondsDisplay;
  }

  return minutesDisplay + ':' + secondsDisplay;
};

/**
 * get the vendor-prefixed CSS transform property
 *
 * @return {string}
 */
var getTransformProperty = function getTransformProperty() {
  if ('transform' in TEST_DIV.style) {
    return 'transform';
  }

  if ('WebkitTransform' in TEST_DIV.style) {
    return 'WebkitTransform';
  }

  if ('MozTransform' in TEST_DIV.style) {
    return 'MozTransform';
  }

  if ('OTransform' in TEST_DIV.style) {
    return 'OTransform';
  }

  if ('msTransform' in TEST_DIV.style) {
    return 'msTransform';
  }

  return 'transform';
};

/**
 * get the volume change style based on isVolumeChangeActive, the backgroundColor, and the fontColor
 *
 * @param {object} defaultVolumeChange
 * @param {object} volumeChangeActive
 * @param {boolean} isVolumeChangeActive
 * @param {string} backgroundColor
 * @param {string} fontColor
 * @return {object}
 */
var getVolumeChangeStyle = function getVolumeChangeStyle(defaultVolumeChange, volumeChangeActive, isVolumeChangeActive, backgroundColor, fontColor) {
  if (!isVolumeChangeActive) {
    return defaultVolumeChange;
  }

  if (backgroundColor || fontColor) {
    var mergedStyle = {};

    if (backgroundColor) {
      mergedStyle.backgroundColor = backgroundColor;
    }

    if (fontColor) {
      mergedStyle.color = fontColor;
    }

    return _extends({}, defaultVolumeChange, volumeChangeActive, mergedStyle);
  }

  return _extends({}, defaultVolumeChange, volumeChangeActive);
};

/**
 * get the volume icon based on the volume and isMuted
 *
 * @param {number} volume
 * @param {boolean} isMuted
 * @return {string}
 */
var getVolumeIcon = function getVolumeIcon(volume, isMuted) {
  switch (true) {
    case isMuted:
      return _icons.availableIcons.VOLUME_MUTE;

    case volume >= 0.67:
      return _icons.availableIcons.VOLUME_HIGH;

    case volume >= 0.33:
      return _icons.availableIcons.VOLUME_MEDIUM;

    default:
      return _icons.availableIcons.VOLUME_LOW;
  }
};

exports.getControlsContainerStyle = getControlsContainerStyle;
exports.getControlStyle = getControlStyle;
exports.getFullscreenProperties = getFullscreenProperties;
exports.getTimeFormatFromCurrentTime = getTimeFormatFromCurrentTime;
exports.getPercentPlayed = getPercentPlayed;
exports.getTransformProperty = getTransformProperty;
exports.getVolumeChangeStyle = getVolumeChangeStyle;
exports.getVolumeIcon = getVolumeIcon;
exports.default = {
  getControlStyle: getControlStyle,
  getControlsContainerStyle: getControlsContainerStyle,
  getFullscreenProperties: getFullscreenProperties,
  getPercentPlayed: getPercentPlayed,
  getTimeFormatFromCurrentTime: getTimeFormatFromCurrentTime,
  getTransformProperty: getTransformProperty,
  getVolumeIcon: getVolumeIcon
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/tquetano/git/react-vidz-player/src/index.js */"./src/index.js");


/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ }),

/***/ "recompose":
/*!****************************!*\
  !*** external "recompose" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_recompose__;

/***/ }),

/***/ "vidz":
/*!***********************!*\
  !*** external "vidz" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vidz__;

/***/ })

/******/ });
});
//# sourceMappingURL=react-vidz-player.js.map