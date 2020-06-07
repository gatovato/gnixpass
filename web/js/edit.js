//Transform HTML strings into elements
function addHTMLString(tmpStr){
    var tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = tmpStr;
    return tmpDiv.firstElementChild;
}

//Create skeleton for Edit View
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
    <div class="row mt-3">
      <div class="col-3"></div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-home btn-sm float-right" onclick="exitEdit()"><img class="icon" src="/img/home-24px.svg"/></button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-save btn-sm float-right" onclick=""><img class="icon" src="/img/save-24px.svg"/></button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-add btn-sm float-right" onclick="addCredForm()"><img class="icon" src="/img/add_box-24px.svg"/></button>
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
    <div class="row mt-3">
      <div class="col-3"></div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-home btn-sm float-right" onclick="exitEdit()"><img class="icon" src="/img/home-24px.svg"/></button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-save btn-sm float-right" onclick=""><img class="icon" src="/img/save-24px.svg"/></button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-add btn-sm float-right" onclick="addCredForm()"><img class="icon" src="/img/add_box-24px.svg"/></button>
      </div>
    </div>
    `
    var addButton = addHTMLString(tmpHTML);
    document.getElementById('edit-container').appendChild(addButton);

    var tmpHTML = '<div id="add-form" class="row"></div>';
    var addForm = addHTMLString(tmpHTML);
    document.getElementById('edit-container').appendChild(addForm);
    genAccordian();
  }
}

//Populate credentials form
function addCredForm(){
  var tmpHTML = `
  <div id="add-cred-form" class="col-12">
    <div>
      <label for="cred-name" class="mt-1">Name</label>
      <input id="cred-name" class="form-control" type="text">
      <div class="invalid-feedback">Name is required</div>
    </div>
    <label for="cred-username" class="mt-1">Username</label>
    <input id="cred-username" class="form-control" type="text">
    <label for="cred-password" class="mt-1">Password</label>
    <input id="cred-password" type="password" class="form-control">
    <div>
      <label for="cred-conf-password" class="mt-1">Confirm Password</label>
      <input id="cred-conf-password" type="password" class="form-control">
      <div class="invalid-feedback">Passwords do not match</div>
    </div>
    <div class="row mt-3">
      <div class="col-6"></div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-add btn-sm float-right" onclick="addCred()"><img class="icon" src="/img/add-24px.svg"/></button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-sgcustom btn-delete btn-sm float-right" onclick="hideCredForm()"><img class="icon" src="/img/cancel-24px.svg"/></button>
      </div>
    </div>
  </div>
  `
  document.getElementById('add-form').innerHTML = tmpHTML;
}

//Hide the add cred form
function hideCredForm(){
  document.getElementById('add-cred-form').innerHTML= '';
}

//Add credentials to pass file
function addCred(){
  entryName = document.getElementById('cred-name');
  user = document.getElementById('cred-username').value;
  pass = document.getElementById('cred-password').value;
  conf = document.getElementById('cred-conf-password');
  if (pass != conf.value){
    conf.classList.add('is-invalid');
    return;
  }
  if (entryName.value == ''){
    entryName.classList.add('is-invalid');
    return;
  }
  smolObj = {};
  smolObj[user] = pass;
  passFile[entryName.value] = smolObj;
  hideCredForm();
  genAccordian();
}

//Remove credentials from passFile
function rmCred(rmName){
  delete passFile[rmName];
  genAccordian();
}

//Generate accordian
function genAccordian(){
  if(document.getElementById('credList')){
    document.getElementById('credList').remove();
  }
  accordianStr = '<div class="accordion col-12" id="credList"></div>';
  accordian = addHTMLString(accordianStr);
  document.getElementById('creds-panel').appendChild(accordian);
  ct = 0;
  for(name in passFile){
    for(key in passFile[name]){
        tmpStr = `
        <div class="card">
          <div class="card-header" id="header${ct}">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${ct}" aria-expanded="false" aria-controls="#collapse${ct}">
                ${name}
              </button>
            </h2>
          </div>
          <div id="collapse${ct}" class="collapse" aria-labelledby="header${ct}" data-parent="#credList">
            <div class="card-body">
              <table class="table table-bordered table-dark">
                <thead>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Username</th>
                    <td>${key}</td>
                  </tr>
                  <tr>
                    <th scope="row">Password</th>
                    <td>${passFile[name][key]}</td>
                  </tr>
                </tbody>
              </table>
              <button type="button" class="btn btn-sgcustom btn-save btn-sm mb-3" data-toggle="modal" data-target="#editCard" onclick="prepEditCard('${name}')"><img class="icon" src="/img/edit-24px.svg"/></button>
              <button type="button" onclick="rmCred('${name}')" class="btn btn-sgcustom btn-delete btn-sm mb-3 float-right"><img class="icon" src="/img/delete-24px.svg"/></button>
            </div>
          </div>
        </div>
        `;
        card = addHTMLString(tmpStr);
        document.getElementById('credList').appendChild(card);
        ct++;
    }
  }
}

function prepEditCard(tmpName){
  var tmpTitle = `Edit ${tmpName}`;
  document.getElementById('editCardTitle').innerHTML = tmpTitle;
  var tmpCardForm = `
    <div>
      <label for="card-cred-name" class="mt-1">Name</label>
      <input id="card-cred-name" class="form-control" type="text">
      <div class="invalid-feedback">Name is required</div>
    </div>
    <label for="card-cred-username" class="mt-1">Username</label>
    <input id="card-cred-username" class="form-control" type="text">
    <label for="card-cred-password" class="mt-1">Password</label>
    <input id="card-cred-password" type="password" class="form-control">
    <div>
      <label for="card-cred-conf-password" class="mt-1">Confirm Password</label>
      <input id="card-cred-conf-password" type="password" class="form-control">
      <div class="invalid-feedback">Passwords do not match</div>
    </div>
    `;
  document.getElementById('editCardBody').innerHTML = tmpCardForm;
  var tmpFunct = `editCard('${tmpName}')`;
  document.getElementById('editCardSave').setAttribute("onclick",tmpFunct);
  document.getElementById('card-cred-name').value = tmpName;
  for(key in passFile[tmpName]){
      document.getElementById('card-cred-username').value = key;
      document.getElementById('card-cred-password').value = passFile[tmpName][key];
      document.getElementById('card-cred-conf-password').value = passFile[tmpName][key];
  }
}

function editCard(tmpName){
  entryName = document.getElementById('card-cred-name');
  user = document.getElementById('card-cred-username').value;
  pass = document.getElementById('card-cred-password').value;
  conf = document.getElementById('card-cred-conf-password');
  if (pass != conf.value){
    conf.classList.add('is-invalid');
    return;
  }
  if (entryName.value == ''){
    entryName.classList.add('is-invalid');
    return;
  }
  smolObj = {};
  smolObj[user] = pass;
  if(entryName.value == tmpName){
    passFile[tmpName] = smolObj;
  }else{
    delete passFile[tmpName];
    passFile[entryName.value] = smolObj;
  }
  genAccordian();
  $('#editCard').modal('toggle');
}

function savePass(){
  passwd = 'woa';
  let test = eel.savePass(origPassFile,passFile,passwd)();
}

function exitEdit(){
  passFile = '';
  startView();
}
