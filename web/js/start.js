////////////////////////////////////////////////////////////////
//Views
//Two views initially available - onto next js after either of these
function prepStartView(){
  var startForm = `
  <div class="form-group">
    <label for="pass-files">Choose a store or create a new one</label>
    <select id="pass-files" class="form-control">
    </select>
  </div>
  <div id="auth-or-add" class="form-group">
  </div>
  `
  document.getElementById('template').innerHTML = startForm;
}

//Generate form for creating a new passFile
function newPassForm(){
  var passForm = `
  <div id="newPass">
      <div>
        <label for="passName" class="mt-1">Store name</label>
        <input id="passName" class="form-control" type="text">
        <div class="invalid-feedback">Store name is required</div>
      </div>
      <div>
        <label for="password" class="mt-1">Password</label>
        <input type="password" class="form-control" id="password">
        <div class="invalid-feedback">Password is required</div>
      </div>
      <div>
        <label for="confpassword" class="mt-1">Confirm Password</label>
        <input type="password" class="form-control" id="confpassword">
        <div class="invalid-feedback">Passwords do not match</div>
      </div>
      <button type="button" class="btn btn-sgcustom btn-save btn-sm mt-3 float-right" onclick="createPass()"><img class="icon" src="/img/save-24px.svg"/></button>
  </div>
  `
  document.getElementById('auth-or-add').innerHTML = passForm;
}

//Get the passFile's password
function authForm(){
  var authForm = `
  <div>
      <label for="password" class="mt-1">Password</label>
      <input type="password" class="form-control" id="password">
      <div class="invalid-feedback">Password is invalid</div>
      <div class="row">
        <div class="col-3">
          <button type="button" class="btn btn-sgcustom btn-open btn-sm mt-3" onclick="openPass()"><img class="icon" src="/img/lock_open-24px.svg"/></button>
        </div>
        <div class="col-6"></div>
        <div class="col-3">
          <button type="button" class="btn btn-sgcustom btn-delete btn-sm mt-3 float-right" data-toggle="modal" data-target="#confirmRm"><img class="icon" src="/img/delete-24px.svg"/></button>
        </div>
      </div>
  </div>
  `
  document.getElementById('auth-or-add').innerHTML = authForm;
}

////////////////////////////////////////////////////////////////
//Workers

//Populate dropdown
async function getPasses() {
  // Inside a function marked 'async' we can use the 'await' keyword.

  let n = await eel.getPasses()(); // Must prefix call with 'await', otherwise it's the same syntax
  if(n.length > 0){
    var passes = document.getElementById("pass-files");
    for(i=0;i<n.length;i++){
      var option = document.createElement("option");
      option.text = n[i];
      passes.add(option);
    }
    var option = document.createElement("option");
    option.text = "Add a new pass";
    passes.add(option);
    authForm();
  }
  if(n.length == 0){
    var passes = document.getElementById("pass-files");
    var option = document.createElement("option");
    option.text = "Add a new pass";
    passes.add(option);
    newPassForm();
  }
}

//One of the two actions when using the dropdown
async function createPass(){
  var passForm = document.querySelector('#newPass');
  var passName = document.querySelector('#passName');
  var pass = document.querySelector('#password');
  var conf = document.querySelector('#confpassword');
  if (pass.value == '' && conf.value == ''){
    pass.classList.add('is-invalid');
    return;
  }
  if (pass.value != conf.value){
    conf.classList.add('is-invalid');
    return;
  }
  if (passName.value == ''){
    passName.classList.add('is-invalid');
    return;
  }
  let fail = await eel.createPass(passName.value,conf.value)();
  if(fail){
    alert('An unexpected error has occurred, please try again later');
  }else{
    location.reload();
  }
}

//Send to eel for authentication and deletion
async function rmPass(){
  var name = document.getElementById('pass-files').value;
  var passwd = document.getElementById('password').value;
  let status = await eel.rmPass(name,passwd)();
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
  var name = document.getElementById('pass-files').value;
  origPassFile = name
  var passwd = document.getElementById('password').value;
  let contents = await eel.openPass(name,passwd)();
  if(contents == "open_failed"){
    alert('Unknown error opening password file');
  }else if(contents == "decrypt_failed"){
    document.getElementById('password').classList.add("is-invalid");
  }else{
    passFile = JSON.parse(contents);
    //send to edit.js
    editView();
  }
}

//Add it all together
function startView(){
  prepStartView();
  getPasses();
  var origPassFile = '';
  var passFile = '';
  //Change between create pass and authenticate screens
  var dropDown = document.getElementById("pass-files");
  dropDown.addEventListener('change',function(event){
      var myValue = event.srcElement.value;
      if(myValue != "Add a new pass"){
        authForm();
      }else{
        newPassForm();
      }
  });
}

////////////////////////////////////////////////////////////////
//Main
//variables used by other files will be defined here, these will
//get defaulted when the password file is saved and the page reloads
var origPassFile = '';
var passFile = '';
startView();
