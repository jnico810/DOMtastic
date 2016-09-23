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

document.addEventListener("DOMContentLoaded", () => {

  ready = true;
  queue.forEach((func) => {
    func();
  });


});
window.$l = $l;






// let divs = $l("div")
// let ul = $l("ul")
