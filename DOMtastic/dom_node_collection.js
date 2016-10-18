class DOMCollection {
  constructor(array) {
    this.array = array;
  }
  html(newHTML){
    if (newHTML){
      this.array.forEach((el) => el.innerHTML = newHTML);
    } else{
      return this.array[0].innerHTML;
    }
  }

  empty(){
    this.array.forEach((el) => el.innerHTML = "");
  }

  append(child){
    if (child instanceof DOMCollection) {
      this.array.forEach((el) => (
        child.array.forEach((childEl) => (
          el.innerHTML += childEl.outerHTML
        ))
      ));
    } else if (child instanceof HTMLElement) {
      this.array.forEach((el) => {
        el.innerHTML += child.outerHTML;
      });
    } else if (typeof child === "string"){
      this.array.forEach((el) => {
        el.innerHTML += child;
      });
    }
  }
  attr(attribute, value){
    if (value){
      this.array.forEach((el) => el.setAttribute(attribute, value));
    }else{
      return this.array[0].getAttribute(attribute);
    }
  }

  addClass(newClass){
    this.array.forEach((el) => {
      let current = el.getAttribute("class");
      if (current) {
        if (current.indexOf(newClass) === -1){
          current += ` ${newClass}`;
          el.setAttribute("class", current.trim());
        }
      } else{
        el.setAttribute("class", newClass.trim());
      }
    });
  }
  removeClass(removedClass){
    this.array.forEach((el) => {
      const current = el.getAttribute("class");
      if (current && current.indexOf(removedClass) != -1) {
        const index = current.indexOf(removedClass);
        const result = (
          current.slice(0, index) +
          current.slice(index - 1 + removedClass.length + 1)
        );
        el.setAttribute("class", result.trim());
      }
    });
  }

  children(){
    let children = [];
    this.array.forEach((el) => children.push(el.children));
    return new DOMCollection(children);
  }

  parent(){
    let parent = [];
    this.array.forEach((el) => parent.push(el.parentNode));
    return new DOMCollection(parent);
  }

  find(selector){
    let doms = [];
    this.array.forEach((el) => doms.push(el.querySelectorAll(selector)));
    return new DOMCollection(doms);
  }

  remove(){
    this.array.forEach((el) => el.parentNode.removeChild(el));
    this.array = [];
  }

  on(occurence, callback){
    this.array.forEach((el) => el.addEventListener(occurence, callback));
  }

  off(occurence, callback){
    this.array.forEach((el) => el.removeEventListener(occurence, callback));
  }
}

export default DOMCollection;
