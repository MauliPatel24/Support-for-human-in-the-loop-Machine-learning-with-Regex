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
    
    update_lable_available_files : function () {
        run_on_file.lbl_available_files().text(`${run_on_file.list_of_files.length - run_on_file.currrent_index }`+ "Files are available to process");
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

        return true;
    },
    
    read_file_data : function (regex) {
        var file = run_on_file.list_of_files[run_on_file.currrent_index];
        console.log(file);
        file = "test_dir/" + file;
        $.get(file,(data) =>{
            console.log(data); 
            var result = data.match(regex);
            console.log(result);
            if (result.length >0){
                var res = "<table>";
                var i = 0;
                for(i = 0; i<result.length && result[i] != ""; i++){
                    res = res + "<tr> <td> " + result[i] + "</td> <td> " + "<input type='radio' id='Correct' name='" + result[i] + "' value='Correct'> <label for='Correct'>Correct</label> <input type='radio' id='InCorrect' name='" + result[i] + "' value='InCorrect'> <label for='InCorrect'>InCorrect</label> </td> </tr>";
                }
                res = res + "</table>";
                //document.getElementById("match_info_2").innerHTML = res;
                document.getElementById("match_info_2").appendChild(res);
            }
        });
    }
};

run_on_file.btn_load_all_files().click(function (){
    run_on_file.list_of_files = ["file_1.txt", "file_2.txt", "file_3.txt",]; //getting list of files
    
    run_on_file.currrent_index = 0; // reset current index
    
    run_on_file.update_lable_available_files(); //call function to update lable for #of files
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
        
        //[1] create regex
        var regex = new RegExp(run_on_file.regex_body().val(), run_on_file.regex_option().val());
        //var data = "this is test";
        //var result = data.match(regex);
        
        //[2] it will run for loop for every file
        var file_data = ""; 
        for(var i=0; i<run_on_file.file_selector().val();i++){
            //[3] in loop read each file
            file_data = run_on_file.read_file_data(regex);
            
            //[4] apply regex and create result list/set
            
            //[5] create/append result table
            run_on_file.currrent_index++ ;
        }
        
    }
    console.log(isvalid);
    
    //validation pass or fail it will enable all element which was disabled ealier.
    run_on_file.regex_body().prop( "disabled", false );
    run_on_file.btn_load_all_files().prop( "disabled", false );
    run_on_file.file_selector().prop( "disabled", false );
});
