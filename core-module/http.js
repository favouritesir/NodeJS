const http=require('http');
const fs=require('fs')

const server=http.createServer((req,res)=>{
    const stream=fs.createReadStream(__dirname+"/home.html")//any files
    // stream.pipe(res)
    stream.on('data',(data)=>{
        res.write(data)
    })
});
server.listen(4000);