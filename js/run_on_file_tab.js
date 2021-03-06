var run_on_file = {
    
    list_of_files :[],
    currrent_index : 0,
    //available_files : list_of_files.length - currrent_index,
    //available_files :list_of_files == undefined ? 0 : list_of_files.length - currrent_index,
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
    //<input type="text" id="regex_val"> <input type="number" id="padding_val">
    
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
        $.get(file_path,(data) =>{
            console.log(data); 
            file_data = data;
            //var result = data.match(regex);
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
                match_index.push(match.index+'-'+match.length);
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
               // console.log(match.index + "--" + regexpNames.lastIndex);
               // console.log(Hello ${match} ); 
                
            }
            
            console.log(result);
            if (result.length >0){
                //var res = "<table>";
                var i = 0;
                var id;
                var table = document.getElementById("result_table");
                for(i = 0; i<result.length && result[i] != ""; i++){
                    id = file + "_" + i +" _" + result[i]
                   // res = res + "<tr> <td> " + result[i] + "</td> <td> " + "<input type='radio' id='Correct' name='" + result[i] + "' value='Correct'> <label for='Correct'>Correct</label> <input type='radio' id='InCorrect' name='" + result[i] + "' value='InCorrect'> <label for='InCorrect'>InCorrect</label> </td> </tr>";
                    //res = res + "<tr> <td>" + "<input type='checkbox' id='" + id + "' name='" + id + "' value='" + result[i] +"'>" + "</td> <td>" + "<label for='" + id + "'>" + result[i] + "</label>" + "</td> </tr>";
                    var row = table.insertRow(-1);
                    var cell0 = row.insertCell(0);
                    var cell1 = row.insertCell(1);
                    var cell2 = row.insertCell(2);
                    var cell3 = row.insertCell(3);
                    var cell4 = row.insertCell(4);
                    var cell5 = row.insertCell(5);
                    var cell6 = row.insertCell(6);
                    var cell7 = row.insertCell(7);
                    var cell8 = row.insertCell(8);
                    
                    cell0.innerHTML = "<input type='checkbox' id='" + id + "' name='" + id + "' value='" + result[i] +"'>";
                    cell1.innerHTML = file_name[i];
                    cell2.innerHTML = pre_word_index[i];
                    cell3.innerHTML = pre_word[i];
                    cell4.innerHTML = post_word_index[i];
                    cell5.innerHTML = post_word[i];
                    cell6.innerHTML = match_index[i];
                    //cll2.innerHTML = "<label for='" + id + "'>" + pre_word[i] + " ~ "+ result[i] + " ~ " + post_word[i] + "</label>";
                    cell7.innerHTML = "<label for='" + id + "'>" + "<span class ='pre_post'>" +pre_word[i] + "</span>" + result[i] + "<span class ='pre_post'>"+ post_word[i] + "</span>" +"</label>";
                    cell8.innerHTML = "<button  class='modify'>Modify</button>"
                }
                //res = res + "</table>";
                //document.getElementById("match_info_2").innerHTML = document.getElementById("match_info_2").innerHTML + res;
                //document.getElementById("match_info_2").append(res);
            }
        });
        return file_data;
    }
};

run_on_file.btn_load_all_files().click(function (){
    run_on_file.list_of_files = ["file_1.txt", "file_2.txt", "file_3.txt",]; //getting list of files
    
    run_on_file.currrent_index = 0; // reset current index
    
    run_on_file.update_lable_available_files(); //call function to update lable for #of files
    $("#match_info_2 span").prop( "hidden", false); //make visible msg for match information
    $("#result_table").find("tr:gt(0)").remove(); //reset result table
});

run_on_file.btn_process_files().click(function (){
    //as soon as btn clicked then some effecting element get dis able
    run_on_file.regex_body().prop( "disabled", true );
    run_on_file.btn_load_all_files().prop( "disabled", true );
    run_on_file.file_selector().prop( "disabled", true );
    
    //doing validation for all possible senario
    var isvalid = run_on_file.validation_to_process_files();
    
    //if all validation get passed then [1] create regex, [2] it will run for loop for every file, [3] in loop read each file, 
    //[4] apply regex and create result list/set, [5] create/append result table
    if(isvalid == true ){
        //do stuff when pass validation
        console.log("validation get passed");
        $("#match_info_2 span").prop( "hidden", true);
        $("#status_bar").prop("hidden", false); //statusbar visible
        $("#status_bar span").text("Files are under Process");
        $("#result_area").css("top", "65px"); //move result area down to make space for status bar
        //[1] create regex
        var regex = new RegExp(run_on_file.regex_body().val(), run_on_file.regex_option().val());
        //var data = "this is test";
        //var result = data.match(regex);
        
        //[2] it will run for loop for every file
        var file_data = ""; 
        for(var i=0; i<run_on_file.file_selector().val();i++){
            //[3] in loop read each file
            file_data = run_on_file.read_file_data(regex);
            console.log(file_data + " done"); 
            //[4] apply regex and create result list/set
            
            //[5] create/append result table
            
            run_on_file.currrent_index++ ; 
            $("#status_bar span").text("Processed "+ (i+1) +" Files out of " + run_on_file.file_selector().val());
            
        }
        run_on_file.hide_word_p().show();
        run_on_file.regex_val().val(regex);
        run_on_file.padding_val().val(run_on_file.word_padding().val());
        
    }
    console.log(isvalid);
    
    $("#status_bar").prop("hidden", true); //satusbar hidden now
    $("#result_area").css("top", "35px"); //move result area up on original space
    
    //validation pass or fail it will enable all element which was disabled ealier.
    run_on_file.regex_body().prop( "disabled", false );
    run_on_file.btn_load_all_files().prop( "disabled", false );
    run_on_file.file_selector().prop( "disabled", false );
    run_on_file.update_lable_available_files(); //call function to update lable for #of files
});

run_on_file.btn_clear_all().click(function (){
    run_on_file.regex_body().val("");
    run_on_file.regex_option().val("");
    run_on_file.file_selector().val("");

    run_on_file.list_of_files = []; //reset list of files
    
    run_on_file.currrent_index = 0; // reset current index
    
    run_on_file.lbl_available_files().text("# Files are available to process"); //call function to update lable for #of files
    $("#match_info_2 span").prop( "hidden", false); //make visible msg for match information
    $("#result_table").find("tr:gt(0)").remove(); //reset result table
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

odify_match = function(e) {
    console.log(e.toElement.parentNode.parentNode);

    var highlighted_text = '';
    if (window.getSelection) {
       

        if(window.getSelection().anchorNode.parentNode.parentNode.parentNode.parentNode == e.toElement.parentNode.parentNode){ 
            console.log('ok');
            highlighted_text = window.getSelection().toString();
        }else if(window.getSelection().anchorNode.parentNode.parentNode.parentNode == e.toElement.parentNode.parentNode){
            console.log('ok');
            highlighted_text = window.getSelection().toString();
        }
        else{
            alert("invalid text selected or invalid button pressed...!!!")
        }

    } else if (document.selection && document.selection.type != "Control") {
        highlighted_text = document.selection.createRange().text;
    }
    console.log(highlighted_text);

};

$( document ).ready(function() {
    console.log( "ready!" );
    run_on_file.show_word_p().hide();
    run_on_file.hide_word_p().hide();
    
    $('button.modify').off('click').on('click', function(e) { 
        debugger;
        
        modify_match(e);
    });
});
