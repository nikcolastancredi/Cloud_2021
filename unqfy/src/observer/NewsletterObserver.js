const EventListener = require('./EventListener');
const NewsletterClient = require('../clientApi/NewsletterClient');
const newsClient = new NewsletterClient();

class NewsletterObserver extends EventListener {

    constructor(){
        super();
       
    }

    update(eventType, data){

        //llamado a la API de Newsletter //POST /api/notify
        if(eventType==="addAlbum"){
        newsClient.notifyNewAlbum(data[0],data[1]);
        }
        if(eventType==="deleteArtist"){
        newsClient.notifyDeleteArtist(data[0]);
    }
    

    }
}

module.exports = NewsletterObserver;