document.getElementById("client_file").onchange = function() {read_client_file()};

function read_client_file() {
	console.log('client upload local file');
	var files = document.getElementById("client_file").files;
	if(files.length>0){
		console.log("1 file");
		var file = files[0];
		var allowed_types = [ 'text/plain' , 'image/png', 'application/pdf'];
		if(allowed_types.indexOf(file.type) == -1) {
			alert('Error : Incorrect file type');
			return;
		}
		var reader = new FileReader();
		
		reader.onloadstart = function() {console.log('load start')};
		reader.onload = function() { var text = reader.result; console.log(text);}
		
		reader.readAsText(file);
		console.log('test area');
    		/*reader.addEventListener('loadstart', function() {
	    		console.log('loadstart');
		});
    		reader.addEventListener('load', function(e) {
	    		var text = e.target.result;
			console.log(text);
	    	});*/
		//var text = reader.result;
  }
}


