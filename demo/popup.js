
function click(e) {

  chrome.tabs.executeScript(null,
      {code:'debugger'});
  window.close();
}
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
  chrome.tabs.executeScript(null,
      {code:'debugger'});
  // const dT = (selector) => {
  //   if (selector instanceof Function) {
  //     if (!ready){
  //       queue.push(selector);
  //     }else {
  //       selector();
  //     }
  //   }
  //   else if (selector instanceof HTMLElement) {
  //     return new DOMCollection([selector]);
  //   }
  //   else {
  //     const selected = document.querySelectorAll(selector);
  //     return new DOMCollection(Array.from(selected));
  //   }
  // };
  //
  // dT.extend = (first, ...otherObjects) => {
  //   otherObjects.forEach((obj) => {
  //     for (let property in obj) {
  //       first[property] = obj[property];
  //     }
  //   });
  //   return first;
  // };
  //
  //
  // dT.ajax = (options) => {
  //   const xmlReq = new XMLHttpRequest();
  //
  //   const defaults = {
  //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  //     method: "GET",
  //     url: "",
  //     success: () => {},
  //     error: () => {},
  //     data: {},
  //   };
  //   options = dT.extend(defaults, options);
  //   options.method = options.method.toUpperCase();
  //
  //   if (options.method === "GET" && Object.keys(options.data).length > 0){
  //     options.url += "?" + _toQueryString(options.data);
  //   }
  //
  //   xmlReq.open(options.method, options.url, true);
  //   xmlReq.onload = (e) => {
  //     if (xmlReq.status === 200){
  //       options.success(JSON.parse(xmlReq.response));
  //     } else {
  //       options.error(JSON.parse(xmlReq.response));
  //     }
  //   };
  //   xmlReq.send(JSON.stringify(options.data));
  // };
  //
  // const _toQueryString = obj => {
  //   let result = "";
  //   for (let prop in obj){
  //     if (obj.hasOwnProperty(prop)){
  //       result += prop + "=" + obj[prop] + "&";
  //     }
  //   }
  //   return result.substring(0, result.length - 1);
  // };
  // debugger
});
