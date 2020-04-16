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
    <div class="row mt-3">
      <div class="col-6"></div>
      <div class="col-3">
        <button type="button" class="btn btn-primary btn-sm float-right" onclick=""><img class="save" src="/save-24px.svg"/></button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-success btn-sm float-right" onclick="addCredForm()"><img class="add" src="/add_box-24px.svg"/></button>
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
    genAccordian();
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

//Add credentials to pass file
function addCred(){
  name = document.getElementById('cred-name').value;
  user = document.getElementById('cred-username').value;
  pass = document.getElementById('cred-password').value;
  conf = document.getElementById('cred-conf-password');
  if (pass != conf.value){
    conf.classList.add('is-invalid');
    return;
  }
  smolObj = {};
  smolObj[user] = pass;
  passFile[name] = smolObj;
  document.getElementById('add-cred-form').innerHTML= '';
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
