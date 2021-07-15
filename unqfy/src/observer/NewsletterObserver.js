const EventListener = require('./EventListener');

class NewsletterObserver extends EventListener {

    constructor(){
        super();
       
    }

    update(eventType, data){
        console.log(data[0]);
        console.log(data[1]);
        //llamado a la API de Newsletter //POST /api/notify
    }
}

module.exports = NewsletterObserver;