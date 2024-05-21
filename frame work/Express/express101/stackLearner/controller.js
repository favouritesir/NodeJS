const fs=require('fs')
exports.homeController=(req,res)=>{
    fs.readFile("./pages/home.html",(err,data)=>{
      if(err){
          console.log("Error",err);
          res.send("something is rong")
      }else{
          res.write(data)
          res.end()
      }
    })
  }
  exports.aboutController=(req,res)=>{
    fs.readFile("./pages/about.html",(err,data)=>{
      if(err){
          console.log("Error",err);
          res.send("something is rong")
      }else{
          res.write(data)
          res.end()
      }
    })
  }