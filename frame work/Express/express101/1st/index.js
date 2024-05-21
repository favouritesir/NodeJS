const express=require('express')
const app=express();

app.get('/',(req,res)=>{
    res.send(`<h1>Alhamdulillah express is running</h1>`)
})
app.get('/about',(req,res)=>{
    res.send(`<h1>Alhamdulillah about page is showing</h1>`)
})
app.get('/contact',(req,res)=>{
    res.send(`<h1>Alhamdulillah contact page is showing</h1>`)
})

app.listen(4000);