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

function createPass(){
  var passForm = `
  <div>
      <label for="passName">Choose a file or create a new console</label>
      <input id="passName" class="form-control" type="text" placeholder="Pass file Name">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password">
      <label for="confpassword">Confirm Password</label>
      <input type="repassword" class="form-control" id="confpassword" placeholder="Confirm Password">
  </div>
  `
  document.getElementById('template').innerHTML = passForm;
}

getPasses();
createPass();

dropDown = document.getElementById("pass-files");
dropDown.addEventListener('change',function(event){
    var myValue = event.srcElement.value;
    console.log(myValue);
});
