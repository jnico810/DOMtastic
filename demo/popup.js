
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
  var tab = 0;
  var lineTabs = [];
  dT("#ide").on("keydown", function (e) {
    let lineNumber = this.value.substr(0, this.selectionStart).split("\n").length;
    // console.log(lineNumber);

    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault();
      s = this.selectionStart;
      tab += 1;
      // console.log(tab);
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
        tab += 1;
        // console.log(tab);
        this.selectionEnd = s+2;
      } else {
        // debugger
        let lines = this.value.substr(0, this.selectionStart).split("\n");
        let tabs = lines[lines.length - 1].split("\t");
        let tabNums = tabs.length - 1;
        // debugger;
        e.preventDefault();
        let tabString = "";
        for (var i = 0; i < tabNums; i++){
          tabString += "\t";
        }
        // debugger
        this.value = this.value.substring(0, this.selectionStart) + "\n" + tabString + this.value.substring(this.selectionEnd);
        this.selectionEnd = s + 2;
      }
    } else if ((e.keyCode === 8 || e.which === 8)) {
      s = this.selectionStart;
      if (this.value[s - 1] === "{" && this.value[s] === "}") {
        e.preventDefault();
        this.value = this.value.substring(0,this.selectionStart - 1) + this.value.substring(this.selectionEnd + 1);
        this.selectionEnd = s - 1;
      } else if(this.value[s - 1] === "\t"){
        tab -= 1;
        // console.log(tab);
      }
    }
  });

  dT("#submit").click(function(e){
    var array = dT("#ide").first.value.split(/{|}/);
    console.log(array);
  });
}

function setupEvents(){
  dT('#range').on("change", function (e){
    let fontSize = "var fontSize = " + e.currentTarget.value + ";";
    let element = "var element = \"" + dT("#element").first.value + "\";";
    let style = "var style = \"" + dT("#style").first.value + "\";";
    let code = fontSize + "\n" + element + "\n" + style;
  });
}
