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




	window.$l = $l;



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

	DOMNodeCollection.prototype.addClass = function(newClass) {

	  this.array.forEach((el) => {
	    if (el.getAttribute("class")) {
	      let current = el.getAttribute("class");
	      current += ` ${newClass}`;
	      el.setAttribute("class", current);
	    } else{
	      el.setAttribute("class", newClass);
	    }
	  });
	};

	DOMNodeCollection.prototype.removeClass = function(removedClass) {

	  this.array.forEach((el) => {

	    if (el.getAttribute("class").indexOf(removedClass) != -1) {

	      let current = el.getAttribute("class");
	      let currentArray = current.split(" ");
	      let result = "";
	      for (let i = 0; i < currentArray.length; i++) {
	        if (currentArray[i] !== removedClass) {
	          result += ` ${currentArray[i]}`;
	        }
	      }
	      el.setAttribute("class", result);

	    }

	  });

	};


	DOMNodeCollection.prototype.children = function() {

	  const children = [];
	  this.array.forEach((el) => {
	    children.push(el.children);
	  });
	  return new DOMNodeCollection(children);

	};

	DOMNodeCollection.prototype.parent = function() {

	  const parent = [];
	  this.array.forEach((el) => {
	    parent.push(el.parentNode);
	  });
	  return new DOMNodeCollection(parent);
	};

	DOMNodeCollection.prototype.find = function (selector) {

	  const doms = [];
	  this.array.forEach((el) => {
	    doms.push(el.querySelectorAll(selector));
	  });
	  return new DOMNodeCollection(doms);
	};

	DOMNodeCollection.prototype.remove = function (){

	  this.array.forEach((el) => {
	    el.parentNode.removeChild(el);
	  });
	  this.array = [];
	};

	DOMNodeCollection.prototype.on  = function (occurence, callback) {
	  this.array.forEach((el) => {
	    el.addEventListener(occurence, callback);
	  });
	};

	DOMNodeCollection.prototype.off  = function (occurence, callback) {
	  this.array.forEach((el) => {
	    el.removeEventListener(occurence, callback);
	  });
	};


	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);