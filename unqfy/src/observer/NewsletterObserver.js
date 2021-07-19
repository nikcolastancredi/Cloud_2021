const EventListener = require('./EventListener');
const NewsletterClient = require('../clientApi/NewsletterClient');
const newsClient = new NewsletterClient();

class NewsletterObserver extends EventListener {

    constructor(){
        super();
       
    }

    update(eventType, data){
        console.log(data[0]);
        console.log(data[1]);
        //llamado a la API de Newsletter //POST /api/notify
        newsClient.notify(data[0],data[1]);
    }
}

module.exports = NewsletterObserver;