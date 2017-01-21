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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom_node_collection = __webpack_require__(1);
	
	var _dom_node_collection2 = _interopRequireDefault(_dom_node_collection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ready = false;
	var queue = [];
	
	document.addEventListener("DOMContentLoaded", function () {
	  ready = true;
	  queue.forEach(function (func) {
	    func();
	  });
	});
	
	var dT = function dT(selector) {
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
	};
	
	dT.extend = function (first) {
	  for (var _len = arguments.length, otherObjects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    otherObjects[_key - 1] = arguments[_key];
	  }
	
	  otherObjects.forEach(function (obj) {
	    for (var property in obj) {
	      first[property] = obj[property];
	    }
	  });
	  return first;
	};
	
	dT.ajax = function (options) {
	  var xmlReq = new XMLHttpRequest();
	
	  var defaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: "GET",
	    url: "",
	    success: function success() {},
	    error: function error() {},
	    data: {}
	  };
	  options = dT.extend(defaults, options);
	  options.method = options.method.toUpperCase();
	
	  if (options.method === "GET" && Object.keys(options.data).length > 0) {
	    options.url += "?" + _toQueryString(options.data);
	  }
	
	  xmlReq.open(options.method, options.url, true);
	  xmlReq.onload = function (e) {
	    if (xmlReq.status === 200) {
	      options.success(JSON.parse(xmlReq.response));
	    } else {
	      options.error(JSON.parse(xmlReq.response));
	    }
	  };
	  xmlReq.send(JSON.stringify(options.data));
	};
	
	var _toQueryString = function _toQueryString(obj) {
	  var result = "";
	  for (var prop in obj) {
	    if (obj.hasOwnProperty(prop)) {
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};
	
	exports.default = dT;
	
	
	window.dT = dT;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOMCollection = function () {
	  function DOMCollection(doms) {
	    _classCallCheck(this, DOMCollection);
	
	    this.doms = doms;
	    /*TOADDTOREADME*/this.first = this.doms[0];
	    /*TOADDTOREADME*/this.last = this.doms[this.doms.length - 1];
	  }
	
	  _createClass(DOMCollection, [{
	    key: "html",
	    value: function html(newHTML) {
	      if (newHTML) {
	        this.doms.forEach(function (el) {
	          return el.innerHTML = newHTML;
	        });
	      } else {
	        return this.doms[0].innerHTML;
	      }
	    }
	  }, {
	    key: "empty",
	    value: function empty() {
	      this.doms.forEach(function (el) {
	        return el.innerHTML = "";
	      });
	    }
	  }, {
	    key: "append",
	    value: function append(child) {
	      if (child instanceof DOMCollection) {
	        this.doms.forEach(function (el) {
	          return child.doms.forEach(function (childEl) {
	            return el.innerHTML += childEl.outerHTML;
	          });
	        });
	      } else if (child instanceof HTMLElement) {
	        this.doms.forEach(function (el) {
	          el.innerHTML += child.outerHTML;
	        });
	      } else if (typeof child === "string") {
	        this.doms.forEach(function (el) {
	          el.innerHTML += child;
	        });
	      }
	    }
	
	    /*TOADDTOREADME*/
	  }, {
	    key: "prepend",
	    value: function prepend(child) {
	      if (child instanceof DOMCollection) {
	        this.doms.forEach(function (el) {
	          return child.doms.forEach(function (childEl) {
	            return el.innerHTML = childEl.outerHTML + el.innerHTML;
	          });
	        });
	      } else if (child instanceof HTMLElement) {
	        this.doms.forEach(function (el) {
	          el.innerHTML = child.outerHTML + el.innerHTML;
	        });
	      } else if (typeof child === "string") {
	        this.doms.forEach(function (el) {
	          el.innerHTML = child + el.innerHTML;
	        });
	      }
	    }
	  }, {
	    key: "attr",
	    value: function attr(attribute, value) {
	      if (value) {
	        this.doms.forEach(function (el) {
	          return el.setAttribute(attribute, value);
	        });
	      } else {
	        return this.doms[0].getAttribute(attribute);
	      }
	    }
	  }, {
	    key: "addClass",
	    value: function addClass(newClass) {
	      this.doms.forEach(function (el) {
	        var current = el.getAttribute("class");
	        if (current) {
	          if (current.indexOf(newClass) === -1) {
	            current += " " + newClass;
	            el.setAttribute("class", current.trim());
	          }
	        } else {
	          el.setAttribute("class", newClass.trim());
	        }
	      });
	    }
	  }, {
	    key: "removeClass",
	    value: function removeClass(removedClass) {
	      this.doms.forEach(function (el) {
	        var current = el.getAttribute("class");
	        if (current && current.indexOf(removedClass) != -1) {
	          var index = current.indexOf(removedClass);
	          var result = current.slice(0, index) + current.slice(index - 1 + removedClass.length + 1);
	          el.setAttribute("class", result.trim());
	        }
	      });
	    }
	  }, {
	    key: "children",
	    value: function children() {
	      var children = [];
	      this.doms.forEach(function (el) {
	        return children.push(el.children);
	      });
	      return new DOMCollection(children);
	    }
	  }, {
	    key: "parent",
	    value: function parent() {
	      var parent = [];
	      this.doms.forEach(function (el) {
	        return parent.push(el.parentNode);
	      });
	      return new DOMCollection(parent);
	    }
	  }, {
	    key: "find",
	    value: function find(selector) {
	      var doms = [];
	      this.doms.forEach(function (el) {
	        return doms.push(el.querySelectorAll(selector));
	      });
	      return new DOMCollection(doms);
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      this.doms.forEach(function (el) {
	        return el.parentNode.removeChild(el);
	      });
	      this.doms = [];
	    }
	  }, {
	    key: "on",
	    value: function on(occurence, callback) {
	      this.doms.forEach(function (el) {
	        return el.addEventListener(occurence, callback);
	      });
	    }
	  }, {
	    key: "off",
	    value: function off(occurence, callback) {
	      this.doms.forEach(function (el) {
	        return el.removeEventListener(occurence, callback);
	      });
	    }
	
	    /*TOADDTOREADME*/
	  }, {
	    key: "click",
	    value: function click(callback) {
	      this.doms.forEach(function (el) {
	        return el.addEventListener('click', callback);
	      });
	    }
	  }]);
	
	  return DOMCollection;
	}();
	
	exports.default = DOMCollection;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map