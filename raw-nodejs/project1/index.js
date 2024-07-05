/*
* Title: Uptime Monitoring API
* Description: Nodejs project for track our given url status(up/down) by raw nodejs
* Author: Ashikur Rahman SA
* Date: Tuesday, 18 -June-2024 (15:56:58)
*
*/

// Dependencies
const { lchown } = require('fs');
const http=require('http');

// App object - Module scaffolding
const app = {};

// Configuration
app.config = {
    port:4000,
}

// Create server
app.createServer=()=>{
    const server=http.createServer(app.reqHandler)
    server.listen(app.config.port,()=>{
        console.log(`Server is listening on port:${app.config.port}`);
    })
}

// request handler for server
app.reqHandler=(req,res)=>{
    console.log(req);
    // send response
    res.end('Alhamdulillah');
}

// start the server
app.createServer();