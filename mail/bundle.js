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
	const Inbox = __webpack_require__(2);

	document.addEventListener("DOMContentLoaded", function () {
	  let sidebar = document.querySelectorAll(".sidebar-nav li");
	  sidebar.forEach((el)=>{
	    el.addEventListener("click", clickHandler);
	  });

	  let content = document.querySelector(".content");
	  const router = new Router(content, routes);
	  router.start();

	});

	function clickHandler (e) {
	  let li = e.currentTarget;
	  let text = li.textContent.toLowerCase();
	  window.location.hash = text;
	}


	routes = {

	  // compose:
	  inbox: Inbox
	  // sent:

	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {

	  constructor(node, routes){
	    this.node = node;
	    this.routes = routes;
	  }

	  start(){
	    window.addEventListener("hashchange", this.render.bind(this));
	    this.render();
	  }

	  render(){

	    this.node.innerHTML = "";
	    let component = this.activeRoute();

	    if (component){
	      component = component.render();
	      this.node.appendChild(component);
	    }
	  }

	  activeRoute(){
	    let location = window.location.hash;
	    location = location.slice(1);
	    return this.routes[location];
	  }


	}


	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let MessageStore = __webpack_require__(3);

	const Inbox = {
	  render: ()=>{
	    let ul = document.createElement("ul");
	    ul.className = "messages";
	    let messages = MessageStore.getInboxMessages();
	    messages.forEach((message) => {
	      let renderedMessage = this.renderMessage(message);
	      ul.appendChild(renderedMessage);
	    });
	    return ul;
	  },

	  renderMessage: (message) => {
	    let li = document.createElement("li");
	    li.className = "message";
	    li.innerHTML = "";
	    let fromSpan = document.createElement("span");

	  }
	};

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	const MessageStore = {

	  getInboxMessages: () => {
	    return messages.inbox;
	  },

	  getSentMessages: () => {
	    return messages.sent;
	  }
	};

	module.exports = MessageStore;


/***/ }
/******/ ]);