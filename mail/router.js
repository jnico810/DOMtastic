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
