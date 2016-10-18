const DOMNodeCollection = require('./dom_node_collection');

let ready = false;
let queue = [];
function $l(selector) {
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
    let selected = document.querySelectorAll(selector);
    let arraySelected = Array.from(selected);
    return new DOMNodeCollection(arraySelected);
  }
}


Function.prototype.extend = function(...args) {
  let firstArg = args[0];
  args.slice(1).forEach((obj) => {
    for (let property in obj) {
      firstArg[property] = obj[property];
    }
  });

};

Function.prototype.ajax = function(options){

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

window.$l = $l;
