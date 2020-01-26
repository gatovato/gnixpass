//var myList = [];
//eel.getPasses()(x => myList = x)



async function getPasses() {
  // Inside a function marked 'async' we can use the 'await' keyword.

  let n = await eel.getPasses()(); // Must prefix call with 'await', otherwise it's the same syntax
  if(n.length > 0){
    passes = document.getElementById("pass-files");
    var option = document.createElement("option");
    option.text = "Add a new pass";
    passes.add(option);
    for(i=0;i<n.length;i++){
      var option = document.createElement("option");
      option.text = n[i];
      passes.add(option);
    }
  }
  if(n.length == 0){
    passes = document.getElementById("pass-files");
    var option = document.createElement("option");
    option.text = "Add a new pass";
    passes.add(option);
  }
}

getPasses();
