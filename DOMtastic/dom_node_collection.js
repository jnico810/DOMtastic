class DOMCollection {
  constructor(doms) {
    this.doms = doms;
  }
  html(newHTML){
    if (newHTML){
      this.doms.forEach((el) => el.innerHTML = newHTML);
    } else{
      return this.doms[0].innerHTML;
    }
  }

  empty(){
    this.doms.forEach((el) => el.innerHTML = "");
  }

  append(child){
    if (child instanceof DOMCollection) {
      this.doms.forEach((el) => (
        child.doms.forEach((childEl) => (
          el.innerHTML += childEl.outerHTML
        ))
      ));
    } else if (child instanceof HTMLElement) {
      this.doms.forEach((el) => {
        el.innerHTML += child.outerHTML;
      });
    } else if (typeof child === "string"){
      this.doms.forEach((el) => {
        el.innerHTML += child;
      });
    }
  }
  attr(attribute, value){
    if (value){
      this.doms.forEach((el) => el.setAttribute(attribute, value));
    }else{
      return this.doms[0].getAttribute(attribute);
    }
  }

  addClass(newClass){
    this.doms.forEach((el) => {
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
    this.doms.forEach((el) => {
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
    this.doms.forEach((el) => children.push(el.children));
    return new DOMCollection(children);
  }

  parent(){
    let parent = [];
    this.doms.forEach((el) => parent.push(el.parentNode));
    return new DOMCollection(parent);
  }

  find(selector){
    let doms = [];
    this.doms.forEach((el) => doms.push(el.querySelectorAll(selector)));
    return new DOMCollection(doms);
  }

  remove(){
    this.doms.forEach((el) => el.parentNode.removeChild(el));
    this.doms = [];
  }

  on(occurence, callback){
    this.doms.forEach((el) => el.addEventListener(occurence, callback));
  }

  off(occurence, callback){
    this.doms.forEach((el) => el.removeEventListener(occurence, callback));
  }
}

export default DOMCollection;
