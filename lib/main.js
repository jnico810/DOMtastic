import DOMNodeCollection from './dom_node_collection.js';

let ready = false;
let queue = [];
function dT(selector) {
  if (selector instanceof Function) {
    if (!ready){
      queue.push(selector);
    }else {
      selector();
    }
  }
  else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
  else {
    const selected = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(selected));
  }
}


Function.prototype.extend = function(...args) {
  const firstArg = args[0];
  args.slice(1).forEach((obj) => {
    for (let property in obj) {
      firstArg[property] = obj[property];
    }
  });

};

dT.prototype.ajax = function(options){

  defaults = {
    method: "GET",
    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType : 'json',
    data: {},
    success: (data)=> {console.log("SUCCESS");},
    error:(data)=> {console.log("ERROR");},
    url: document.URL
  };

  this.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(defaults.method, defaults.url);
  xhr.onload = function() {
    if (xhr.status === 200){
      return defaults.success(JSON.parse(xhr.response));
    } else {
      return defaults.error(JSON.parse(xhr.response));
    }
  };
  xhr.send(defaults.data);
  xhr.setRequestHeader("Content-Type", contentType);
};


document.addEventListener("DOMContentLoaded", () => {
  ready = true;
  queue.forEach((func) => {
    func();
  });
});

window.dT = dT;
