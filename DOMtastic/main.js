import DOMCollection from './dom_node_collection.js';

let ready = false;
let queue = [];

document.addEventListener("DOMContentLoaded", () => {
  ready = true;
  queue.forEach((func) => {
    func();
  });
});

const dT = (selector) => {
  if (selector instanceof Function) {
    if (!ready){
      queue.push(selector);
    }else {
      selector();
    }
  }
  else if (selector instanceof HTMLElement) {
    return new DOMCollection([selector]);
  }
  else {
    const selected = document.querySelectorAll(selector);
    return new DOMCollection(Array.from(selected));
  }
};

dT.extend = (...args) => {
  const firstArg = args[0];
  args.slice(1).forEach((obj) => {
    for (let property in obj) {
      firstArg[property] = obj[property];
    }
  });
};

dT.ajax = (options) => {

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
export default dT;

window.dT = dT;
