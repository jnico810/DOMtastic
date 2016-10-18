/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dom_node_collection = __webpack_require__(1);
	
	var _dom_node_collection2 = _interopRequireDefault(_dom_node_collection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ready = false;
	var queue = [];
	function dT(selector) {
	  if (selector instanceof Function) {
	    if (!ready) {
	      queue.push(selector);
	    } else {
	      selector();
	    }
	  } else if (selector instanceof HTMLElement) {
	    return new _dom_node_collection2.default([selector]);
	  } else {
	    var selected = document.querySelectorAll(selector);
	    return new _dom_node_collection2.default(Array.from(selected));
	  }
	}
	
	Function.prototype.extend = function () {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var firstArg = args[0];
	  args.slice(1).forEach(function (obj) {
	    for (var property in obj) {
	      firstArg[property] = obj[property];
	    }
	  });
	};
	
	dT.prototype.ajax = function (options) {
	
	  defaults = {
	    method: "GET",
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    dataType: 'json',
	    data: {},
	    success: function success(data) {
	      console.log("SUCCESS");
	    },
	    error: function error(data) {
	      console.log("ERROR");
	    },
	    url: document.URL
	  };
	
	  this.extend(defaults, options);
	
	  var xhr = new XMLHttpRequest();
	  xhr.open(defaults.method, defaults.url);
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      return defaults.success(JSON.parse(xhr.response));
	    } else {
	      return defaults.error(JSON.parse(xhr.response));
	    }
	  };
	  xhr.send(defaults.data);
	  xhr.setRequestHeader("Content-Type", contentType);
	};
	
	document.addEventListener("DOMContentLoaded", function () {
	  ready = true;
	  queue.forEach(function (func) {
	    func();
	  });
	});
	
	window.dT = dT;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOMNodeCollection = function DOMNodeCollection(array) {
	  _classCallCheck(this, DOMNodeCollection);
	
	  this.array = array;
	};
	
	DOMNodeCollection.prototype.html = function (arg) {
	  if (arg) {
	    this.array.forEach(function (el) {
	      el.innerHTML = arg;
	    });
	  } else {
	    return this.array[0].innerHTML;
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	
	  this.array.forEach(function (el) {
	    el.innerHTML = "";
	  });
	};
	
	DOMNodeCollection.prototype.append = function (arg) {
	  if (arg instanceof DOMNodeCollection) {
	    this.array.forEach(function (el) {
	      arg.array.forEach(function (argEl) {
	        el.innerHTML += argEl.outerHTML;
	      });
	    });
	  } else if (arg instanceof HTMLElement) {
	    this.array.forEach(function (el) {
	      el.innerHTML += arg.outerHTML;
	    });
	  } else if (typeof arg === "string") {
	    this.array.forEach(function (el) {
	      el.innerHTML += arg;
	    });
	  }
	};
	
	DOMNodeCollection.prototype.attr = function (attribute, value) {
	
	  if (value) {
	    this.array.forEach(function (el) {
	      el.setAttribute(attribute, value);
	    });
	  } else {
	    return this.array[0].getAttribute(attribute);
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (newClass) {
	
	  this.array.forEach(function (el) {
	    if (el.getAttribute("class")) {
	      var current = el.getAttribute("class");
	      current += " " + newClass;
	      el.setAttribute("class", current);
	    } else {
	      el.setAttribute("class", newClass);
	    }
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (removedClass) {
	
	  this.array.forEach(function (el) {
	
	    if (el.getAttribute("class").indexOf(removedClass) != -1) {
	
	      var current = el.getAttribute("class");
	      var currentArray = current.split(" ");
	      var result = "";
	      for (var i = 0; i < currentArray.length; i++) {
	        if (currentArray[i] !== removedClass) {
	          result += " " + currentArray[i];
	        }
	      }
	      el.setAttribute("class", result);
	    }
	  });
	};
	
	DOMNodeCollection.prototype.children = function () {
	
	  var children = [];
	  this.array.forEach(function (el) {
	    children.push(el.children);
	  });
	  return new DOMNodeCollection(children);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	
	  var parent = [];
	  this.array.forEach(function (el) {
	    parent.push(el.parentNode);
	  });
	  return new DOMNodeCollection(parent);
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	
	  var doms = [];
	  this.array.forEach(function (el) {
	    doms.push(el.querySelectorAll(selector));
	  });
	  return new DOMNodeCollection(doms);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	
	  this.array.forEach(function (el) {
	    el.parentNode.removeChild(el);
	  });
	  this.array = [];
	};
	
	DOMNodeCollection.prototype.on = function (occurence, callback) {
	  this.array.forEach(function (el) {
	    el.addEventListener(occurence, callback);
	  });
	};
	
	DOMNodeCollection.prototype.off = function (occurence, callback) {
	  this.array.forEach(function (el) {
	    el.removeEventListener(occurence, callback);
	  });
	};
	
	exports.default = DOMNodeCollection;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map