//Interface for manipulating passfile
function editView(){
  if(Object.keys(passFile).length === 0){
    var editForm = `
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6"></div>
      <div class="col-3">
        <button type="button" class="btn btn-success btn-sm float-right"><b><h2>&nbsp;&nbsp;+&nbsp;&nbsp;</h2></b></button>
      </div>
    </div>
    `
  }else{
    var editForm = `
    <div>
      <button type="button" class="btn btn-success btn-sm">Add Credentials</button>
    </div>
    `
  }
  document.getElementById('template').innerHTML = editForm;
}
