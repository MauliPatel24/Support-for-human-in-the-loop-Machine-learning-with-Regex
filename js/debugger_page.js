document.getElementById("client_file").onchange = function() {read_client_file()};

function read_client_file() {
  console.log('client upload local file');
  var files = document.getElementById("client_file").files;
  if(files.length>0){
    console.log("1 file");
    var file = files[0];
    var allowed_types = [ 'text/plain' ];
    if(allowed_types.indexOf(file.type) == -1) {
		  alert('Error : Incorrect file type');
		  return;
	  }
    
    var reader = new FileReader();
    reader.readAsText(file);
    var text = reader.result;
    console.log('text');
  }
}
