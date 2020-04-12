//transform HTML strings into elements
function addHTMLString(tmpStr){
    var tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = tmpStr;
    return tmpDiv.firstElementChild;
}

//create skeleton for Edit View
function prepEditView(){
  var startEdit =`
  <div id="edit-container">
    <div id="creds-panel" class="row"></div>
  </div>
  `
  document.getElementById('template').innerHTML = startEdit;
}

//Interface for manipulating passfile
function editView(){
  prepEditView();
  if(Object.keys(passFile).length === 0){
    var tmpHTML = `
    <div class="row">
      <div class="col-9"></div>
      <div class="col-3">
        <button type="button" class="btn btn-success btn-sm float-right" onclick="addCredForm()"><b><h2>&nbsp;&nbsp;+&nbsp;&nbsp;</h2></b></button>
      </div>
    </div>
    `
    var addButton = addHTMLString(tmpHTML);
    document.getElementById('edit-container').appendChild(addButton);

    var tmpHTML = '<div id="add-form" class="row"></div>';
    var addForm = addHTMLString(tmpHTML);
    document.getElementById('edit-container').appendChild(addForm);
  }else{
    var tmpHTML = `
    <div class="row">
      <div class="col-9"></div>
      <div class="col-3">
        <button type="button" class="btn btn-success btn-sm float-right" onclick="addCredForm()"><b><h2>&nbsp;&nbsp;+&nbsp;&nbsp;</h2></b></button>
      </div>
    </div>
    `
    var editForm = addHTMLString(tmpHTML);
  }
}

//Populate credentials form
function addCredForm(){
  var tmpHTML = `
  <div id="add-cred-form" class="col-12">
    <label for="cred-name" class="mt-1">Name</label>
    <input id="cred-name" class="form-control" type="text" placeholder="Name">
    <label for="cred-username" class="mt-1">Username</label>
    <input id="cred-username" class="form-control" type="text" placeholder="Username">
    <label for="cred-password" class="mt-1">Password</label>
    <input id="cred-password" type="password" class="form-control" placeholder="Password">
    <label for="cred-conf-password" class="mt-1">Confirm Password</label>
    <input id="cred-conf-password" type="password" class="form-control" placeholder="Confirm Password">
    <div class="invalid-feedback">Passwords do not match</div>
    <button type="button" onclick="addCred()" class="btn btn-primary mt-3">Add</button>
  </div>
  `
  document.getElementById('add-form').innerHTML = tmpHTML;
}

//Add credentails to pass file
function addCred(){
  name = document.getElementById('cred-name').value;
  user = document.getElementById('cred-username').value;
  pass = document.getElementById('cred-password').value;
  smolObj = {};
  smolObj[user] = pass;
  passFile[name] = smolObj;
  document.getElementById('add-cred-form').innerHTML= '';
}
