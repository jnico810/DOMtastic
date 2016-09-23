/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	const $l = function(selector) {
	  if (selector instanceof HTMLElement) {
	    return new DOMNodeCollection([selector]);
	  }
	  else {
	    let selected = document.querySelectorAll(selector);
	    let arraySelected = Array.from(selected);
	    return new DOMNodeCollection(arraySelected);
	  }
	};

	DOMNodeCollection.prototype.html = function (arg) {
	  if (arg){
	    this.array.forEach((el) => {
	      el.innerHTML = arg;
	    });
	  } else{
	    return this.array[0].innerHTML;
	  }
	};

	DOMNodeCollection.prototype.empty = function(){

	  this.array.forEach((el) => {
	    el.innerHTML = "";
	  });

	};

	DOMNodeCollection.prototype.append = function(arg) {
	  if (arg instanceof DOMNodeCollection) {
	    this.array.forEach((el) => {
	      arg.array.forEach((argEl) => {
	        el.innerHTML += argEl.outerHTML;
	      });
	    });
	  } else if (arg instanceof HTMLElement) {
	    this.array.forEach((el) => {
	      el.innerHTML += arg.outerHTML;
	    });
	  } else if (typeof arg === "string"){
	    this.array.forEach((el) => {
	      el.innerHTML += arg;
	    });
	  }
	};


	DOMNodeCollection.prototype.attr = function(attribute, value){

	  if (value){
	    this.array.forEach((el) => {
	      el.setAttribute(attribute, value);
	    });
	  }else{
	    return this.array[0].getAttribute(attribute);
	  }


	};

	window.$l = $l;

	//
	// let divs = $l("div")
	// let ul = $l("ul")


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(array) {
	    this.array = array;
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);