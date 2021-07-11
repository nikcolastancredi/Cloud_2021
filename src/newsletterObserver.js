const { Observer } = require("./Observer");

class NewsletterObserver extends Observer{

    constructor(){
        super();
       
    }

    update(){
        //llamado a la API de Newsletter //POST /api/notify
    }
}

module.exports = {
    NewsletterObserver
};