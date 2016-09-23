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

	const Router = __webpack_require__(1);


	document.addEventListener("DOMContentLoaded", function () {
	  let sidebar = document.querySelectorAll(".sidebar-nav li");
	  sidebar.forEach((el)=>{
	    el.addEventListener("click", clickHandler);
	  });

	  let content = document.querySelector(".content");
	  const router = new Router(content);
	  router.start();
	  
	});

	function clickHandler (e) {
	  let li = e.currentTarget;
	  let text = li.textContent.toLowerCase();
	  window.location.hash = text;
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {

	  constructor(node){
	    this.node = node;
	  }

	  start(){
	    window.addEventListener("hashchange", this.render.bind(this));
	    this.render();
	  }

	  render(){

	    this.node.innerHTML = "";
	    let routeName = this.activeRoute();
	    let p = document.createElement("p");
	    p.innerHTML = routeName;
	    this.node.appendChild(p);
	  }

	  activeRoute(){
	    let location = window.location.hash;
	    return location.slice(1);
	  }


	}


	module.exports = Router;


/***/ }
/******/ ]);