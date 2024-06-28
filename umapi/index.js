/*
* Title: Uptime monitoring API
* Description: Nodejs project using http and others core module
* Author: Ashikur Rahman SA
* Date: Sunday, 23 -June-2024 (21:22:06)
*
*/
// Dependencies
const http = require('http');
const {handleReq} = require('./tools/handler');
const environments = require('./tools/environments');

// App object - Module scaffolding
const app = {};

// // Configuration
// app.config = {
//     port:4000,
// }

// create app method
app.createApp=()=>{
    const server=http.createServer(handleReq)
    server.listen(environments.port);
} 


// run the method
app.createApp();