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
