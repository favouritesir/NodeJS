const express=require("express")
const app=express()

app.use(express.static('./public'))
app.use(globalMiddleware);
app.use(require('./routes'))
app.use((req,res,next)=>{
  const error=new Error('404 Page Not Found');
  error.status=404;
  next(error);
})

app.use((err,req,res,next)=>{
  if(err.status){
    return res.status(err.status).send(`<h1>${err.message}</h1>`)
  }
  res.status(500).send('<h1>Server Error</h1>')
})
// for global middleware we use app.use() method
// signature of a middleware is same to an handler or controller
function handler(req,res,next){//handler
  // get req
  // process req
  // send res
}
function customMiddleware(req,res,next){//middleware
  // check 
  // must call next() if everything seems ok
  next();
}

/*
** If everything seems ok handler will call response methods
** If everything seems ok middleware will call next
*/

function globalMiddleware(req,res,next){
  console.log(`${req.method}-${req.url}`);
  console.log('I am a global middleware');
  next();
}

app.listen(4000,()=>{
    console.log("MashaAllah server is running")
})


  