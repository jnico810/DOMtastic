
function click(e) {
  let color = "var color= \"" + e.currentTarget.id + "\";";
  chrome.tabs.executeScript(null,
      {code:color}, function() {
    chrome.tabs.executeScript(null, {file: 'inject.js'});
  });
}

dT(() => {
  setupKeyStrokes();
  setupEvents();
});

function setupKeyStrokes() {
  dT("#ide").on("keydown", function (e) {
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault();
      s = this.selectionStart;
      this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s+1;
    } else if ((e.keyCode === 219 || e.which === 219) && e.shiftKey) {
      e.preventDefault();
      s = this.selectionStart;
      this.value = this.value.substring(0,this.selectionStart) + "{}" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s+1;
    } else if ((e.keyCode === 13 || e.which === 13)){
      s = this.selectionStart;
      if (this.value[s - 1] === "{") {
        e.preventDefault();
        this.value = this.value.substring(0,this.selectionStart) + "\n\t\n" + this.value.substring(this.selectionEnd);
        this.selectionEnd = s+2;
      } else {
        let lines = this.value.substr(0, this.selectionStart).split("\n");
        let tabs = lines[lines.length - 1].split("\t");
        let tabNums = tabs.length - 1;
        e.preventDefault();
        let tabString = "";
        for (var i = 0; i < tabNums; i++){
          tabString += "\t";
        }
        this.value = this.value.substring(0, this.selectionStart) + "\n" + tabString + this.value.substring(this.selectionEnd);
        this.selectionEnd = s + 2;
      }
    } else if ((e.keyCode === 8 || e.which === 8)) {
      s = this.selectionStart;
      if (this.value[s - 1] === "{" && this.value[s] === "}") {
        e.preventDefault();
        this.value = this.value.substring(0,this.selectionStart - 1) + this.value.substring(this.selectionEnd + 1);
        this.selectionEnd = s - 1;
      }
    }
  });

  dT("#ide").on("keyup", parseIDE());
}

function setupEvents(){
  dT('#range').on("change", function (e){
    let fontSize = "var fontSize = " + e.currentTarget.value + ";";
    let element = "var element = \"" + dT("#element").first.value + "\";";
    let style = "var style = \"" + dT("#style").first.value + "\";";
    let code = fontSize + "\n" + element + "\n" + style;
  });
}

function parseIDE(){
  let selectorsChanged = [];
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
        dT(el).attr("style", " " );
        selectorsChanged.splice(idx, 1);
      }
    });
    selectors.forEach(function(selector, idx){
      if (dT(selector).first){

        dT(selector).attr("style", styles[idx] );
      }
    });
  };
}
