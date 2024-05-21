const app=(require('express'))();
const fs=require('fs');

app.get('/',(req,res)=>{
    fs.readFile('pages/index.html',(err,data)=>{
        if(err){
            res.send('<h3>Not Found</h3>')
        }
        res.write(data);
        res.end();
    })
})

app.get('/about',(req,res)=>{
    fs.readFile('pages/about.html',(err,data)=>{
        if(err){
            res.send('<h3>Not Found</h3>')
        }
        res.write(data);
        res.end();
    })
})

app.listen(4000);