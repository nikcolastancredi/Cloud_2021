const newsletterClient = require('../clientApi/Newsletter');
const newsletterClientIntance = new newsletterClient();

class ObserverNewsletter {

    update(){
        newsletterClientIntance.notify();
    }
}

module.exports = ObserverNewsletter;