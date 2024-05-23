const fs=require("fs");
if(!fs.existsSync("./files_by_fs_module")){
    try{
        fs.mkdirSync("./files_by_fs_module")
    }catch(err){
        console.log(err);
    }
}

// create 1st file on different folder;
fs.writeFileSync("./files_by_fs_module/1st.txt","ma-shaAllah 1st file is created.\n");
console.log("1st: "+fs.readFileSync("./files_by_fs_module/1st.txt"));//read 1st file

// create 2nd file on different folder;
fs.writeFileSync("./files_by_fs_module/2nd.txt","ma-shaAllah 2nd file is created.\n");
console.log("2nd: "+fs.readFileSync("./files_by_fs_module/2nd.txt"));
// replace 2nd file
fs.writeFileSync("./files_by_fs_module/2nd.txt","ma-shaAllah 2nd file is replaced and update");
console.log("2nd replace: "+fs.readFileSync("./files_by_fs_module/2nd.txt"));


// create 2nd file on different folder;
fs.writeFileSync("./files_by_fs_module/3rd.txt","ma-shaAllah 3rd file is created.\n");
console.log("3rd: "+fs.readFileSync("./files_by_fs_module/3rd.txt"));
// append 2nd file
fs.appendFileSync("./files_by_fs_module/3rd.txt","ma-shaAllah 3rd file is append and update");
let data=fs.readFileSync("./files_by_fs_module/3rd.txt");//return buffer
console.log("3rd append: "+ data.toString());