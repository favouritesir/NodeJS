/*
* Title: about
* Description: about page  handler 
* Author: Ashikur Rahman SA
* Date: Monday, 24 -June-2024 (16:37:47)
*
*/
// Dependencies


// mod object - scaffolding
const mod = {};

// Programme start
mod.about=(req,callback)=>{
    callback(200,{
        message:"This is about page",
    })
}

// Export the mod obj
module.exports=mod;
