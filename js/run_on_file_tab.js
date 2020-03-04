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
    
    update_lable_available_files : function () {
        run_on_file.lbl_available_files().text(`${run_on_file.list_of_files.length - run_on_file.currrent_index }`+ "Files are available to process");
    },

    validation_to_process_files : function () {
        return true;
    }
};

run_on_file.btn_load_all_files().click(function (){
    run_on_file.list_of_files = ["file_1.txt", "file_2.txt", "file_3.txt",]; //getting list of files
    
    run_on_file.currrent_index = 0; // reset current index
    
    run_on_file.update_lable_available_files(); //call function to update lable for #of files
});

run_on_file.btn_process_files().click(function (){
    var isvalid = run_on_file.validation_to_process_files();
    console.log(isvalid);
});
