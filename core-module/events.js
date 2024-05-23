const EventEmitter=require("events")
const emitter=new EventEmitter();

emitter.on('log',()=>console.log("ok done"))

setTimeout(() => {
    emitter.emit("log")
}, 1000);