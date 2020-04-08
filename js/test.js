//for summary
var summary = {
	total_match : 0,
	processed_file_name : [],
	match_each_file : [],
	
	update_summary_block: function (){
		console.log('summary changed');
		$('#summary details summary').text('Total '+ summary.total_match + ' matches from ' + summary.processed_file_name.length + ' files');
		var ul_list = document.getElementById('summary_file_level');
		ul_list.innerHTML = '';
		for(var i=0; i<summary.processed_file_name.length; i++){
			var li_element = document.createElement('li');
			li_element.innerHTML = summary.processed_file_name[i]+ ' : ' + summary.match_each_file[i] + ' out of ' + summary.total_match + ' ('+ ((100 * summary.match_each_file[i])/ summary.total_match).toFixed(2)+'%)';
			ul_list.appendChild(li_element);
		}
	},

};

var run_on_file = {
    
    list_of_files :[],
    currrent_index : 0,
    regex_body : function() {return $('#regex_2_3');},
    regex_option : function() { return $('#options_2'); },
    btn_clear_all : function () { return $('#clear_all');},
    btn_load_all_files : function () { return $('#get_all_files');},
    lbl_available_files : function () { return $('#available_files');},
    file_selector : function() {return $('#Select_files');},
    btn_process_files : function () { return $('#process_selected_files');},
    word_padding : function () { return $('#padding_size');},
    show_word_p : function () { return $('#show_p_w');},
    hide_word_p : function () { return $('#hide_p_w');},
    regex_val : function () { return $('#regex_val');},
    padding_val : function () { return $('#padding_val');},
    btn_save_all : function () {return $('#save_all'); },
    
    btn_load_result_files : function () {return $('#load_result_files');},
    
    update_lable_available_files : function () {
        run_on_file.lbl_available_files().text(`${run_on_file.list_of_files.length - run_on_file.currrent_index }`+ " Files are available to process");
    },

    validation_to_process_files : function () {
        if(run_on_file.regex_body().val() == "" || run_on_file.regex_body().val() == null){
            alert("Please Enter Regex to proceed");
            return false;
        }

        if(run_on_file.list_of_files.length == 0){
            alert("Please Load All Files to Proceed");
            return false;
        }

        if(run_on_file.file_selector().val() == ""){
            alert("Please Select Files to Proceed");
            return false;
        }
        
        if((run_on_file.list_of_files.length - run_on_file.currrent_index) <= 0){
            alert("No Available Files to process");
            return false;
        }
        
        if((run_on_file.list_of_files.length - run_on_file.currrent_index) < run_on_file.file_selector().val()){
            alert(run_on_file.list_of_files.length - run_on_file.currrent_index + " Files are Available to Process");
            return false;
        }
        
        if(run_on_file.word_padding().val() == ""){
            alert("Word Padding Size can not be NULL");
            return false;
        }

        return true;
    },
    
    read_file_data : function (regex) {
        var file = run_on_file.list_of_files[run_on_file.currrent_index];
        var file_data = "";
        console.log(file);
        var file_path = "test_dir/" + file;
        var padding= parseInt(run_on_file.word_padding().val());
        
        summary.processed_file_name.push(file);
        
        $.get(file_path,(data) =>{
            console.log(data); 
            file_data = data;
            var file_name = [];
            var pre_word_index =[];
            var post_word_index =[];
            var match_index =[];
            var result = [];
            var pre_word = [];
            var post_word = [];
            var match ="";
            while((match = regex.exec(data)) !== null){
                file_name.push(file);
                match_index.push(match.index+'-'+(regex.lastIndex-match.index));
                result.push(match);
                if(match.index >= padding){
                    pre_word.push(data.substr((match.index-padding), padding));
                    pre_word_index.push((match.index-padding) +'-' + padding);
                }
                else{
                    pre_word.push(data.substr(0, match.index));
                    pre_word_index.push(0+'-'+ match.index);
                }
                if((regex.lastIndex+padding) > data.length){
                    post_word.push(data.substr(regex.lastIndex));
                    post_word_index.push(regex.lastIndex);
                }
                else{
                    post_word.push(data.substr(regex.lastIndex , padding));
                    post_word_index.push(regex.lastIndex + '-' +padding);
                }
            }
            
            console.log(result);
            summary.match_each_file.push(result.length);
            summary.total_match = summary.total_match + result.length;
            if (result.length >0){
                var i = 0;
                var id;
                var table = document.getElementById("result_table");
                var row = table.insertRow(-1);
                var cell0 = row.insertCell(0);
                cell0.colSpan = '8';
                cell0.className = 'abc';
                cell0.innerHTML = '<i class="fa fa-angle-right" style="font-size: 16px; padding-right: 6px;"></i>'+file_name[0];
                for(i = 0; i<result.length && result[i] != ""; i++){
                    id = file + "_" + i +" _" + result[i];
                    var row = table.insertRow(-1);
                    var cell0 = row.insertCell(0);
                    var cell1 = row.insertCell(1);
                    var cell2 = row.insertCell(2);
                    var cell3 = row.insertCell(3);
                    var cell4 = row.insertCell(4);
                    var cell5 = row.insertCell(5);
                    var cell6 = row.insertCell(6);
                    var cell7 = row.insertCell(7);
                    
                    cell0.innerHTML = "<input type='checkbox' id='" + id + "' name='" + id + "' value='" + result[i] +"'>";
                    cell1.innerHTML = file_name[i];
                    cell2.innerHTML = pre_word_index[i];
                    cell3.innerHTML = pre_word[i];
                    cell4.innerHTML = post_word_index[i];
                    cell5.innerHTML = post_word[i];
                    cell6.innerHTML = match_index[i];
                    cell7.innerHTML = "<label for='" + id + "'>" + "<span class ='pre_post'>" +pre_word[i] + "</span>" + result[i] + "<span class ='pre_post'>"+ post_word[i] + "</span>" +"</label>";
                    $(row).hide();
                }
                
                $('#result_table td:nth-child(2)').hide();
                $('#result_table td:nth-child(3)').hide();
                $('#result_table td:nth-child(4)').hide();
                $('#result_table td:nth-child(5)').hide();
                $('#result_table td:nth-child(6)').hide();
                $('#result_table td:nth-child(7)').hide();
                
                $( " #result_table td.abc" ).off('click').on( "click", function() {
              	  result_each_file_hideShow($(this));
                });
            }
            summary.update_summary_block();
            $('#summary').show();
        });
        return file_data;
    }
};

run_on_file.btn_load_all_files().click(function (){
    summary.match_each_file=[];
    summary.processed_file_name=[];
    summary.total_match = 0;
    $('#summary').hide();
    
	//getting list of files
	run_on_file.list_of_files = [];
	$.get("GetFileList", function(responseJson) {    
		// Execute Ajax GET request on URL of "someservlet" and execute the following function with Ajax response JSON...
        $.each(responseJson, function(index, item) { // Iterate over the JSON array.
        	console.log(item);
        	run_on_file.list_of_files.push(item);
        });
        run_on_file.currrent_index = 0; // reset current index    
        run_on_file.update_lable_available_files(); // call function to update lable for #of files
        $("#match_info_2 span").prop( "hidden", false); // make visible msg for match information
        $("#result_table").find("tr:gt(0)").remove(); // reset result table
        $('#result_table').hide();
        
    });     
});

run_on_file.btn_process_files().click(function (){
    // as soon as btn clicked then some effecting element get dis able
    run_on_file.regex_body().prop( "disabled", true );
    run_on_file.btn_load_all_files().prop( "disabled", true );
    run_on_file.file_selector().prop( "disabled", true );
    run_on_file.word_padding().prop("disabled", true);
    
    // doing validation for all possible senario
    var isvalid = run_on_file.validation_to_process_files();
    
    // if all validation get passed then create regex, it will run for loop for every file, in loop read each file, apply regex and create result list/set, create/append result table
    if(isvalid == true ){
        // do stuff when pass validation
        console.log("validation get passed");
        $("#match_info_2 span.match_info_deafult").prop( "hidden", true);
        $('#result_table').show();
        $("#status_bar").prop("hidden", false); // statusbar visible
        $("#status_bar span").text("Files are under Process");
        $("#result_area").css("top", "65px"); // move result area down to make
												// space for status bar
        // create regex
        var regex_modifier = run_on_file.regex_option().val().toLowerCase();
        if(!regex_modifier.includes('g')){
        	regex_modifier = regex_modifier + 'g'; 
        }
        var regex = new RegExp(run_on_file.regex_body().val(), regex_modifier);
        
        // it will run for loop for every file
        var file_data = ""; 
        for(var i=0; i<run_on_file.file_selector().val();i++){
            // in loop read each file
            file_data = run_on_file.read_file_data(regex);
            console.log(file_data + " done");
            run_on_file.currrent_index++ ; 
            $("#status_bar span").text("Processed "+ (i+1) +" Files out of " + run_on_file.file_selector().val());
            
            
            
        }
        run_on_file.hide_word_p().show();
        run_on_file.regex_val().val(regex);
        run_on_file.padding_val().val(run_on_file.word_padding().val());
        
    }
    console.log(isvalid);
    
    $("#status_bar").prop("hidden", true); // satusbar hidden now
    $("#result_area").css("top", "35px"); // move result area up on original space
    
    // validation pass or fail it will enable all element which was disabled ealier.
    run_on_file.regex_body().prop( "disabled", false );
    run_on_file.btn_load_all_files().prop( "disabled", false );
    run_on_file.file_selector().prop( "disabled", false );
    run_on_file.word_padding().prop("disabled", false);
    run_on_file.update_lable_available_files(); // call function to update lable
												// for #of files
});

run_on_file.btn_clear_all().click(function (){
    run_on_file.regex_body().val("");
    run_on_file.regex_option().val("");
    run_on_file.file_selector().val("");

    run_on_file.list_of_files = []; // reset list of files
    
    run_on_file.currrent_index = 0; // reset current index
    
    //call function to update lable for #of files
    run_on_file.lbl_available_files().text("# Files are available to process"); 
    $("#match_info_2 span").prop( "hidden", false); // make visible msg for match information
    $("#result_table").find("tr:gt(0)").remove(); // reset result table
    $('#result_table').hide();
    
    summary.match_each_file=[];
    summary.processed_file_name=[];
    summary.total_match = 0;
    $('#summary').hide();
});

run_on_file.show_word_p().click(function(){
    console.log("show_click");
    run_on_file.show_word_p().hide();
    run_on_file.hide_word_p().show();
    
    $('.pre_post').show();
    $('#match_info_2 label').css('color','#49b485');
    $('#match_info_2 label').css('font-weight','700');
});

run_on_file.hide_word_p().click(function(){
    console.log("hide_click");
    run_on_file.show_word_p().show();
    run_on_file.hide_word_p().hide();
    
    $('.pre_post').hide();
    $('#match_info_2 label').css('color','black');
    $('#match_info_2 label').css('font-weight','100');
    
});

run_on_file.btn_save_all().click(function(){
    console.log("save all clicked");
    var flag = 0;
    if(!(run_on_file.show_word_p().is(':visible'))){
    	run_on_file.hide_word_p().trigger('click');
    	flag = 1;
    }
    var result_json = {
            RegEx : run_on_file.regex_val().val(),
            Padding : run_on_file.padding_val().val(),
            Summary : {
            	TotalMatch :summary.total_match,
            	ProcessedFilesName : summary.processed_file_name,
            	MatchEachile : summary.match_each_file
            },
            Result : []
    };
    
    var table = document.getElementById("result_table");
    for(var i = 1; i<table.rows.length ; i++){
    	console.log('hello');
    	if(table.rows[i].cells.length <= 1)
    	    continue;
        if(i == 2){
        	result_json.Result.push({File_Name : table.rows[i].cells[1].innerText, Matches :[{PreWordIndex : table.rows[i].cells[2].innerText.split('-')[0], PreWordLength : table.rows[i].cells[2].innerText.split('-')[1], PreWord : table.rows[i].cells[3].innerText,
            	PostWordIndex : table.rows[i].cells[4].innerText.split('-')[0], PostWordLength : table.rows[i].cells[4].innerText.split('-')[1], PostWord : table.rows[i].cells[5].innerText,
            	MatchImdex : table.rows[i].cells[6].innerText.split('-')[0], MatchLength : table.rows[i].cells[6].innerText.split('-')[1], Match : table.rows[i].cells[7].innerText,
            	Checked : table.rows[i].cells[0].firstElementChild.checked
            }]});
        }
        else{
        	var x;
        	if(table.rows[i-1].cells.length <= 1){
        		x =2; 
        	}
        	else{
        		x=1;
        	}
        	if(table.rows[i].cells[1].innerText == table.rows[i-x].cells[1].innerText){
        		result_json.Result[result_json.Result.length-1].Matches.push({PreWordIndex : table.rows[i].cells[2].innerText.split('-')[0], PreWordLength : table.rows[i].cells[2].innerText.split('-')[1], PreWord : table.rows[i].cells[3].innerText,
            	PostWordIndex : table.rows[i].cells[4].innerText.split('-')[0], PostWordLength : table.rows[i].cells[4].innerText.split('-')[1], PostWord : table.rows[i].cells[5].innerText,
            	MatchImdex : table.rows[i].cells[6].innerText.split('-')[0], MatchLength : table.rows[i].cells[6].innerText.split('-')[1], Match : table.rows[i].cells[7].innerText,
            	Checked : table.rows[i].cells[0].firstElementChild.checked });
        	}
        	else{
        		result_json.Result.push({File_Name : table.rows[i].cells[1].innerText, Matches :[{PreWordIndex : table.rows[i].cells[2].innerText.split('-')[0], PreWordLength : table.rows[i].cells[2].innerText.split('-')[1], PreWord : table.rows[i].cells[3].innerText,
                	PostWordIndex : table.rows[i].cells[4].innerText.split('-')[0], PostWordLength : table.rows[i].cells[4].innerText.split('-')[1], PostWord : table.rows[i].cells[5].innerText,
                	MatchImdex : table.rows[i].cells[6].innerText.split('-')[0], MatchLength : table.rows[i].cells[6].innerText.split('-')[1], Match : table.rows[i].cells[7].innerText,
                	Checked : table.rows[i].cells[0].firstElementChild.checked
                }]});

        	}
        }  
    }
    console.log(JSON.stringify(result_json));
    if(flag == 1){
    	run_on_file.show_word_p().trigger('click');
    }
    
    $.get("SaveFile",{json_string : JSON.stringify(result_json), regex : result_json.RegEx, padding : result_json.Padding, files: summary.processed_file_name.length}, function(responseJson) {
    	alert(responseJson);
    });
});

//if($( "#result_table td.abc" ).length >0){  $( " #result_table td.abc" ).on( "click", function() {
//	  alert( $( this ).text() );
//}); }

run_on_file.btn_load_result_files().click(function(){
	console.log('load result files');
	
	$.get("GetResultFileList", function(responseJson) { 
		var ul_list = document.getElementById('result_file_list');
		ul_list.innerHTML = '';
		$.each(responseJson, function(index, item) { // Iterate over the JSON array.
        	console.log(item);
        	//run_on_file.list_of_files.push(item);
        	var li_element = document.createElement('li');
        	li_element.innerHTML = item;
        	li_element.setAttribute('class', "clickable_2");
        	ul_list.appendChild(li_element);
        });
	});
});

result_each_file_hideShow = function (e){
	//alert( e.parent().index() +'---'+e.text());
	var row_index = e.parent().index() +1 ;
	if(e.context.firstElementChild.className.indexOf('fa-angle-right') >0 ){
	    console.log(e.context.firstElementChild.className.indexOf('fa-angle-right'));
	    e.context.firstElementChild.className = 'fa fa-angle-down';
	    while(e.parent().parent().children()[row_index].cells.length > 1){
	    	console.log('need to show');
	    	//do here
	    	$('#result_table tr:nth-child('+(row_index+1)+')').show();
	    	row_index = row_index+1;
	    	if(row_index == e.parent().parent().children().length ) break;
	    }
	}
	else{
	    e.context.firstElementChild.className = 'fa fa-angle-right';
	    while(e.parent().parent().children()[row_index].cells.length > 1){
	    	console.log('need to hide');
	    	//do here
	    	$('#result_table tr:nth-child('+(row_index+1)+')').hide();
	    	row_index = row_index+1;

	    	if(row_index == e.parent().parent().children().length ) break;
	    }
	}
};

read_result_file = function (e){
	console.log(e.context.innerText);
	var file_path = "Result_dir/" + e.context.innerText;
	
	$.get(file_path,(data) =>{ 
        var obj = JSON.parse(data);
        load_result(obj);
	});
};

load_result = function (obj){
	console.log(obj);
	
	run_on_file.btn_load_all_files().trigger('click');
	run_on_file.regex_body().val(obj.RegEx.split('/')[1]);
	run_on_file.regex_option().val(obj.RegEx.split('/')[2]);
	run_on_file.currrent_index = run_on_file.list_of_files.length - obj.Summary.ProcessedFilesName.length + 1;
};

$('body').on('click', 'li.clickable_2', function() {
	console.log(this.textContent );// do something
	read_result_file($(this));
});

$( document ).ready(function() {
    console.log( "ready!" );
    run_on_file.show_word_p().hide();
    run_on_file.hide_word_p().hide();
    $('#regex_val').hide();
    $('#padding_val').hide();
   
    $('#result_table th:nth-child(2)').hide();
    $('#result_table th:nth-child(3)').hide();
    $('#result_table th:nth-child(4)').hide();
    $('#result_table th:nth-child(5)').hide();
    $('#result_table th:nth-child(6)').hide();
    $('#result_table th:nth-child(7)').hide();
    
    $('#result_table').hide();
    $('#summary').hide();
});
