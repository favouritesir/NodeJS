/*
* Title: Handler for umapi
* Description: Nodejs module for uptime monitoring api project.
* Author: Ashikur Rahman SA
* Date: Monday, 24 -June-2024 (11:05:27)
*
*/
// Dependencies
const url = require('url');
const routes = require('../router');
const {StringDecoder}=require('string_decoder');



// handler object - Module scaffolding
const handler = {};


handler.handleReq=(req,res)=>{
    const parseUrl=url.parse(req.url,true);
    const path=parseUrl.pathname.replace(/^\/+|\/+$/g,'');
    const query=parseUrl.query;
    const headers=req.headers;
    const reqObj={parseUrl,path,query,headers,body:""};
    const decoder=new StringDecoder('utf-8');

    // choose handler function from routes obj
    const handle = routes[path]||routes['notFound'];
    
    
    // get post body
    req.on('data', (buffer) => {
        reqObj.body += decoder.write(buffer);
    });

    // after get post body
    req.on('end',()=>{
        reqObj.body+=decoder.end();
    
        
        // now invoke the handler function with req and a default response callback
        handle(reqObj,(statusCode,payload)=>{
            // check the status code type
            const code=typeof(statusCode)==='number'?statusCode:500;
            // check the payload type
            const data=typeof(payload)==='object'?payload:{};

            // return the final response
            res.writeHead(code);
            res.end(JSON.stringify(data));
        })
    })

}

module.exports=handler;