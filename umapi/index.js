/*
* Title: Uptime monitoring API
* Description: Nodejs project using http and others core module
* Author: Ashikur Rahman SA
* Date: Sunday, 23 -June-2024 (21:22:06)
*
*/
// Dependencies
const http = require('http');
const url = require('url');

// App object - Module scaffolding
const app = {};

// Configuration
app.config = {
    port:4000,
}

// create app method
app.createApp=()=>{
    const server=http.createServer(app.handleReq)
    server.listen(app.config.port);
} 

// handler for request
app.handleReq=(req,res)=>{
    const parseUrl=url.parse(req.url,true);
    const path=parseUrl.pathname.replace(/^\/+|\/+$/g,'')
    res.end("Alhamdulillah");
}

// run the method
app.createApp();