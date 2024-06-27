/*
* Title: Not found
* Description: for  404 not found request
* Author: Ashikur Rahman SA
* Date: Monday, 24 -June-2024 (16:01:00)
*
*/

const mod={};

mod.notFound=(req,callback)=>{
    callback(404,{
        message:"Page Not Found",
    })
}

module.exports=mod;