////////////////////////////////////////////////////////////////
//Views
//Two views initially available - onto next js after either of these

function newPassView(){
  var passForm = `
  <div id="newPass">
      <label for="passName" class="mt-1">Store name</label>
      <input id="passName" class="form-control" type="text" placeholder="Store name">
      <label for="password" class="mt-1">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password">
      <label for="confpassword" class="mt-1">Confirm Password</label>
      <input type="password" class="form-control" id="confpassword" placeholder="Confirm Password">
      <div class="invalid-feedback">Passwords do not match</div>
      <button type="button" onclick="createPass()" class="btn btn-primary mt-3">Save</button>
  </div>
  `
  document.getElementById('template').innerHTML = passForm;
}

function authenticateView(){
  var authForm = `
  <div>
      <label for="password" class="mt-1">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password">
      <div class="invalid-feedback">Password is invalid</div>
      <div class="row">
        <div class="col-3">
          <button type="button" class="btn btn-primary mt-3" onclick="openPass()">Open</button>
        </div>
        <div class="col-6"></div>
        <div class="col-3">
          <button type="button" class="btn btn-danger mt-3 float-right" data-toggle="modal" data-target="#confirmRm">Delete</button>
        </div>
      </div>
  </div>
  `
  document.getElementById('template').innerHTML = authForm;
}

////////////////////////////////////////////////////////////////
//Workers

//Populate dropdown
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
    authenticateView();
  }
  if(n.length == 0){
    passes = document.getElementById("pass-files");
    var option = document.createElement("option");
    option.text = "Add a new pass";
    passes.add(option);
    newPassView();
  }
}

//One of the two actions when using the dropdown
async function createPass(){
  passForm = document.querySelector('#newPass');
  passName = document.querySelector('#passName');
  pass = document.querySelector('#password');
  conf = document.querySelector('#confpassword');
  if (pass.value != conf.value){
    conf.classList.add('is-invalid');
  }
  let fail = await eel.createPass(passName.value,conf.value)();
  if(fail){
    alert('An unexpected error has occurred, please try again later');
  }else{
    location.reload();
  }
}

//send to eel for authentication and deletion
async function rmPass(){
  name = document.getElementById('pass-files').value;
  passwd = document.getElementById('password').value;
  let status = await eel.rmPass(name,passwd)();
  console.log(status);
  if(status == "decrypt_failed"){
    document.getElementById('password').classList.add("is-invalid");
    $('#confirmRm').modal('toggle');
    return;
  }
  if(status == "delete_failed"){
    alert('Unknown error deleting password file');
    $('#confirmRm').modal('toggle');
    return;
  }
  if(status == "success"){
    location.reload();
  }
}

 //Send credentials to eel, if good send to next js, if bad validate
async function openPass(){
  name = document.getElementById('pass-files').value;
  passwd = document.getElementById('password').value;
  let contents = await eel.openPass(name,passwd)();
  if(contents == "open_failed"){
    alert('Unknown error opening password file');
  }else if(contents == "decrypt_failed"){
    document.getElementById('password').classList.add("is-invalid");
  }else{
    passFile = JSON.parse(contents);
    //send to edit.js
  }
}

////////////////////////////////////////////////////////////////
//Main

var passFile = '';

getPasses();

//Change between create pass and authenticate screens
dropDown = document.getElementById("pass-files");
dropDown.addEventListener('change',function(event){
    var myValue = event.srcElement.value;
    if(myValue !="Add a new pass"){
      authenticateView();
    }else{
      newPassView();
    }
});
