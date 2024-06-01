class Organizer extends require('events'){
    event(nm="",props={},timeout=2000){
        setTimeout(() => {//for usnderstand the process
            this.emit(nm,props)
        }, timeout);
    }
}

module.exports=Organizer;