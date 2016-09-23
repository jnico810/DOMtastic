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



window.$l = $l;



// let divs = $l("div")
// let ul = $l("ul")
