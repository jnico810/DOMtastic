dT(() => {
  chrome.tabs.executeScript(null, {file:"bundle.js"});
  var selectorsChanged = [];
  setupIDEKeyStrokes(selectorsChanged);
  setupButtonEvents(selectorsChanged);
});

function setupButtonEvents(selectorsChanged){
  dT("#demo").click(function(e){
    dT("#ide").first.value = "div {\n border: 1px dashed pink;\n color: red; \n}";
    parseIDE(selectorsChanged)();
  });

  dT("#reset").click(function(e){
    selectorsChanged.forEach(function(el, idx) {
      let code = "dT(\"" + el + "\").attr(\"style\", \" \");";
      chrome.tabs.executeScript(null, {code:code});
      selectorsChanged.splice(idx, 1);
    });
    dT("#ide").first.value = "";
  });
}

function setupIDEKeyStrokes(selectorsChanged) {
  dT("#ide").on("keydown", function (e) {
    s = this.selectionStart;
    let startString = this.value.substring(0,this.selectionStart);
    let endString = this.value.substring(this.selectionEnd);
    //Tab hit
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault();
      this.value = startString + "\t" + endString;
      this.selectionEnd = s+1;
    } else if ((e.keyCode === 219 || e.which === 219) && e.shiftKey) {
      //{ hit
      e.preventDefault();
      this.value = startString + "{}" + endString;
      this.selectionEnd = s+1;
    } else if ((e.keyCode === 13 || e.which === 13)){
      //enter hit
      e.preventDefault();
      e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
      // debugger
      if (this.value[s - 1] === "{") {
        this.value = startString + "\n\t\n" + endString;
        this.selectionEnd = s+2;
      } else {
        let lines = this.value.substr(0, this.selectionStart).split("\n");
        let tabString = calculateTabs(lines);
        this.value = startString + "\n" + tabString + endString;
        this.selectionEnd = s + 2;
      }
    } else if ((e.keyCode === 8 || e.which === 8)) {
      //backspace hit
      if (this.value[s - 1] === "{" && this.value[s] === "}") {
        e.preventDefault();
        this.value = this.value.substring(0,this.selectionStart - 1) + this.value.substring(this.selectionEnd + 1);
        this.selectionEnd = s - 1;
      }
    }
  });
  dT("#ide").on("keyup", parseIDE(selectorsChanged));
}

function calculateTabs(lines){
  let tabs = lines[lines.length - 1].split("\t");
  let tabNums = tabs.length - 1;
  let tabString = "";
  for (var i = 0; i < tabNums; i++){
    tabString += "\t";
  }
  return tabString;
}

function parseIDE(changed){
  let selectorsChanged = changed;
  return function (e){
    var array = dT("#ide").first.value.split(/{|}/);
    var selectors = [];
    var styles = [];
    for (var i = 0; i < array.length - 1; i ++){
      let el = array[i].trim();
      if (i % 2 === 0){
        selectors.push(el);
        if (selectorsChanged.indexOf(el) === -1){
          selectorsChanged.push(el);
        }
      } else {
        styles.push(el.split("\n").map(function(el) {
          return el.trim();
        }).join(" "));
      }
    }
    selectorsChanged.forEach(function(el, idx) {
      if (selectors.indexOf(el) === -1){
        let code = "dT(\"" + el + "\").attr(\"style\", \" \");";
        chrome.tabs.executeScript(null, {code:code});
        selectorsChanged.splice(idx, 1);
      }
    });
    selectors.forEach(function(selector, idx){
        let conditionalStart = "if (dT(\"" + selector + "\").first){";
        let code = "dT(\"" + selector + "\").attr(\"style\",\"" + styles[idx] + "\");}";
        chrome.tabs.executeScript(null, { code: conditionalStart + code });
    });
  };
}
