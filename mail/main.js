const Router = require('./router');


document.addEventListener("DOMContentLoaded", function () {
  let sidebar = document.querySelectorAll(".sidebar-nav li");
  sidebar.forEach((el)=>{
    el.addEventListener("click", clickHandler);
  });

  let content = document.querySelector(".content");
  const router = new Router(content);
  router.start();
  
});

function clickHandler (e) {
  let li = e.currentTarget;
  let text = li.textContent.toLowerCase();
  window.location.hash = text;
}
