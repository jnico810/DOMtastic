const DOMNodeCollection = require('./dom_node_collection');

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
