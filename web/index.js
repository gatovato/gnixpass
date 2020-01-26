//var myList = [];
//eel.getPasses()(x => myList = x)



async function getPasses() {
  // Inside a function marked 'async' we can use the 'await' keyword.

  let n = await eel.getPasses()(); // Must prefix call with 'await', otherwise it's the same syntax
  for(i=0;i<n.length;i++){
    passes = document.getElementById('pass-files');
    passes.innerHTML += n[i];
  };
  if(n.length == 0){
    passes = document.getElementById('pass-files');
    passes.innerHTML = 'Add a new pass';
  }
}

getPasses();
