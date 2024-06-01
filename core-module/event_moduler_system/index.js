const School=require('./event_module');
const school=new School();
school.on("bell",({msg,period})=>{
    console.log(`${period} period is ${msg}`);
})

// we can use emit directly but use event for emit 2 sec later
school.event('bell',{
    msg:'start',
    period:'4th'
})
school.event('bell',{
    msg:'end',
    period:'4th'
},5000)
