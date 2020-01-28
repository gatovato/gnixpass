//var myList = [];
//eel.getPasses()(x => myList = x)


function newPass(){
  var passForm = `
  <div id="newPass">
      <label for="passName" class="mt-1">Store name</label>
      <input id="passName" class="form-control" type="text" placeholder="Store name">
      <label for="password" class="mt-1">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password">
      <label for="confpassword" class="mt-1">Confirm Password</label>
      <input type="repassword" class="form-control" id="confpassword" placeholder="Confirm Password">
      <div class="invalid-feedback">Passwords do not match</div>
      <button type="button" onclick="createPass()" class="btn btn-primary mt-3">Save</button>
  </div>
  `
  document.getElementById('template').innerHTML = passForm;
}

function authenticate(){
  var authForm = `
  <div>
      <label for="password" class="mt-1">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password">
      <button type="button" class="btn btn-primary mt-3">Open</button>
  </div>
  `
  document.getElementById('template').innerHTML = authForm;
}


async function getPasses() {
  // Inside a function marked 'async' we can use the 'await' keyword.

  let n = await eel.getPasses()(); // Must prefix call with 'await', otherwise it's the same syntax
  if(n.length > 0){
    passes = document.getElementById("pass-files");
    for(i=0;i<n.length;i++){
      var option = document.createElement("option");
      option.text = n[i];
      passes.add(option);
    }
    var option = document.createElement("option");
    option.text = "Add a new pass";
    passes.add(option);
    authenticate();
  }
  if(n.length == 0){
    passes = document.getElementById("pass-files");
    var option = document.createElement("option");
    option.text = "Add a new pass";
    passes.add(option);
    newPass();
  }
}

async function createPass(){
  passForm = document.querySelector('#newPass');
  pass = document.querySelector('#password');
  conf = document.querySelector('#confpassword');
  if (pass.value != conf.value){
    conf.classList.add('is-invalid');
  }
  let success = await eel.createPass(name,pass);
  if(success){
    console.log('win');
  }else {
    console.log('fail');
  }
}

getPasses();

dropDown = document.getElementById("pass-files");
dropDown.addEventListener('change',function(event){
    var myValue = event.srcElement.value;
    if(myValue !="Add a new pass"){
      authenticate();
    }else{
      newPass();
    }
});
