const EventListener = require('./EventListener');

class NewsletterObserver extends EventListener {

    constructor(){
        super();
       
    }

    update(data){
        //llamado a la API de Newsletter //POST /api/notify
    }
}

module.exports = NewsletterObserver;