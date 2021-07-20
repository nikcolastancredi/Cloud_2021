const unqfyClient = require('../client/unqfyClient');
const unqfyClientInstance = new unqfyClient();
const gmailAPIClient = require('../client/GMailAPIClient');
const gmailAPIClientInstance = new gmailAPIClient();
const  errorArtist = require('../errores/ArtistDoesNotExistError');

class SubscriptionsManager {

    constructor(){
        this.subscribers = {}; // lista de objetos con valores artistaId y email del suscriptor
    }

    checkArtist(artistId){//if artist does not exist throw error
         return unqfyClientInstance.getArtist(artistId);

    }

    addSubscriber(artistId, email){
        if (unqfyClientInstance.getArtist(artistId) !== undefined){
            if( this.subscribers[artistId]==undefined){
                this.subscribers[artistId]=[];
            }
            if(! this.subscribers[artistId].some(e => e == email)){
                this.subscribers[artistId].push(email);
            }
        }else{
            new errorArtist();
        }
       

    }
    
    getAllSubscribers(artistId){
         this.checkArtist(artistId);
         if( this.subscribers[artistId]!= undefined){
            return this.subscribers[artistId]
         }

            
        else {
            return []
        };
    }

    removeSubscriber(artistId, email){
        this.checkArtist(artistId);
        
        if( this.subscribers[artistId]!= undefined){
            if(this.subscribers[artistId].some(e=> e==email)){
                this.subscribers[artistId] = this.subscribers[artistId].filter(e=> e!= email);
            }
        }

    }

    removeAllSubscriptions(artistId){//se borran todos los emails suscriptos a un artista
         this.checkArtist(artistId);
         if( this.subscribers[artistId]!=undefined){
            delete this.subscribers[artistId];
         }
        
    }

    sendNotifications(artistId,subject,message){
        this.checkArtist(artistId);
        const sender =   {
            "name": "Unqfy Neswsletter",
            "email": "newsletter.unqfy@gmail.com",
        };
        const subsEmails = this.getAllSubscribers(artistId);
        
        subsEmails.forEach(email => {
            
        const receiver = {
            "name": " ",
            "email": email
        }

        gmailAPIClientInstance.send_mail(subject, message,receiver, sender)
        .then(res => {
            console.log("Mail enviado!");
            console.log(res);
        }).catch((error) => {
            console.log("Algo salió mal");
            console.log(error);
        })
    });
    }
    
} 


module.exports = SubscriptionsManager;