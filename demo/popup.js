
function click(e) {
  let color = "var color= \"" + e.currentTarget.id + "\";";
  chrome.tabs.executeScript(null,
      {code:color}, function() {
    chrome.tabs.executeScript(null, {file: 'inject.js'});
  });
}


dT(() => {
  setupKeyStrokes();


  dT('#range').on("change", function (e){
    let fontSize = "var fontSize = " + e.currentTarget.value + ";";
    let element = "var element = \"" + dT("#element").first.value + "\";";
    let style = "var style = \"" + dT("#style").first.value + "\";";
    let code = fontSize + "\n" + element + "\n" + style;
  });

});

function setupKeyStrokes() {
  dT("#ide").on("keydown", function (e){
    var s;
    if (e.keyCode === 9 || e.which === 9){
      e.preventDefault();
      s = this.selectionStart;
      this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s+1;
    } else if ((e.keyCode === 219 || e.which === 219) && e.shiftKey){
      e.preventDefault();
      s = this.selectionStart;
      this.value = this.value.substring(0,this.selectionStart) + "{}" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s+1;
    } else if ((e.keyCode === 13 || e.which === 13)){
      s = this.selectionStart;
      if (this.value[s - 1] === "{"){
        e.preventDefault();
        this.value = this.value.substring(0,this.selectionStart) + "\n\t\n" + this.value.substring(this.selectionEnd);
        this.selectionEnd = s+2;
      }
    } else if ((e.keyCode === 8 || e.which === 8)){
      s = this.selectionStart;
      if (this.value[s - 1] === "{" && this.value[s] === "}"){
        e.preventDefault();
        console.log('yes');
        this.value = this.value.substring(0,this.selectionStart - 1) + this.value.substring(this.selectionEnd + 1);
        this.selectionEnd = s - 1;
      }
    }
  });
}
