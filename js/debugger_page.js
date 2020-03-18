var debugger_page = {
	file_selector :function() { return $('#client_file'); },
	dir_selector :function() { return $('#client_dir'); },
	display_area : function() { return $('#display_selected_file_list'); },
	
};

debugger_page.file_selector().on("change", function(){ 
	var files = document.getElementById("client_file").files;
	var index = 0;
	read_file(files, index);
	
});

debugger_page.dir_selector().on("change", function(){ 
	console.log("dir changed");
	var files = document.getElementById("client_dir").files;
	var ul = document.getElementById("selected_file_list");
	$( "#selected_file_list" ).empty();
	var li = document.createElement('li');
	li.setAttribute("id", files[0].webkitRelativePath.split('/')[0]);
	li.setAttribute('class', "dir_repre");
	li.innerHTML = files[0].webkitRelativePath.split('/')[0];
	ul.appendChild(li);
	
	for (let i=0; i<files.length; i++) {
		//debugger_page.display_area().text(debugger_page.display_area().text() +"\n"+ files[i].webkitRelativePath);
		var x = files[i].webkitRelativePath.split('/');
		console.log(x);
		for (let j=1; j<x.length; j++){
			console.log(x[j]);
			if(x[j] == files[i].name){
				console.log(x[j] + " is file");
				//var parent = $('#'+x[j-1]);
				var parent = document.getElementById(x[j-1]);
				if ($('ul','#'+x[j-1]).length == 0 ){
					var u = document.createElement('ul');
					parent.appendChild(u);
					var c = document.createElement('li');
					c.setAttribute('id', i);
					c.setAttribute('class', "clickable");
					c.innerHTML = x[j];
					u.appendChild(c);
				}
				else{
					var u = parent.childNodes[1];
					var c = document.createElement('li');
					c.setAttribute('id', i);
					c.setAttribute('class', "clickable");
					c.innerHTML = x[j];
					u.appendChild(c);
				}
			}
			else{
				console.log(x[j] + "is dir");
				if($('#'+x[j]).length == 0){
					var parent = document.getElementById(x[j-1]);
				    if ($('ul','#'+x[j-1]).length == 0 ){
					    var u = document.createElement('ul');
					    parent.appendChild(u);
					    var c = document.createElement('li');
					    c.setAttribute('id', x[j]);
					    c.setAttribute('class', "dir_repre");
					    c.innerHTML = x[j];
					    u.appendChild(c);
				    }
				    else{
					    var u = parent.childNodes[1];
					    var c = document.createElement('li');
					    c.setAttribute('id', x[j]);
					    c.setAttribute('class', "dir_repre");
					    c.innerHTML = x[j];
					    u.appendChild(c);
				    }
				}
			}
		}
	}


});

$('body').on('click', 'li.clickable', function() {
	console.log(this.textContent + this.id);// do something
	var files = document.getElementById("client_dir").files;
	var index = this.id;
	read_file(files, index);
});

//----------------------------------------------------------------------------------------
//document.getElementById("client_file").onchange = function() {read_file()};

function read_file(files, index) {
	console.log('client upload local file');
	//var files = document.getElementById("client_file").files;
	//var files = document.getElementById("client_dir").files;
	if(files.length>0){
		console.log("1 file");
		var file = files[index];
		var allowed_types = [ 'text/plain' , 'image/png', 'application/pdf'];
		if(allowed_types.indexOf(file.type) == -1) {
			alert('Error : Incorrect file type');
			return;
		}
		var reader = new FileReader();
		
		reader.onloadstart = function() {console.log('load start')};
		reader.onload = function() {
			var text = reader.result;
			console.log(text);
			test_area.value = text;
			$("#regex_string").trigger("input");
		}
		
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


