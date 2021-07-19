const unqfyClient = require('../client/unqfyClient');
const unqfyClientInstance = new unqfyClient();
const gmailAPIClient = require('../client/GMailAPIClient');
const gmailAPIClientInstance = new gmailAPIClient();
const artistError = require('../errores/ArtistDoesNotExistError');

class SubscriptionsManager {

    constructor(){
        this.subscribers = {}; // lista de objetos con valores artistaId y email del suscriptor
    }

    checkArtist(artistId){//if artist does not exist throw error
        const artist = unqfyClientInstance.getArtist(artistId);
        if(artist==null){
            throw new artistError;
        }
    }

    addSubscriber(artistId, email){
        // this.checkArtist(artistId);
        // if( this.subscribers[artistId]==undefined){
        //     this.subscribers[artistId]=[];
        // }
        // this.subscribers[artistId].push(email);
        if( this.subscribers[1]==undefined){
            this.subscribers[1]=[];
        }
        if( this.subscribers[1]!=email){
            this.subscribers[1].push(email);
        }

    }
    
    getAllSubscribers(artistId){
        // checkArtist(artistId);
        // if( this.subscribers[artistId]!= undefined){
        //    return subscribers[artistId]
        // }
        if( this.subscribers[1]!= undefined){
                return this.subscribers[1]
             }
            
        else {
            return []
        };
    }

    removeSubscriber(artistId, email){
        //checkArtist(artistId);
        // if( this.subscribers[artistId]!= undefined){
        //     if(subscribers[artistId].some(e=> e==email)){
        //         subscribers[artistId] = subscribers[artistId].filter(e=> e!= email);
        //     }
        // }
        if( this.subscribers[1]!= undefined){
            if(this.subscribers[1].some(e=> e==email)){
                this.subscribers[1] = this.subscribers[1].filter(e=> e!= email);
            }
        }

    }

    removeAllSubscriptions(artistId){//se borran todos los emails suscriptos a un artista
        // checkArtist(artistId);
        // if( this.subscribers[artistId]!=undefined){
        //     delete subscribers[artistId];
        // }
        if( this.subscribers[1]!=undefined){
            delete this.subscribers[1];
        }
    }

    sendNotifications(artistId,subject,message){
        // checkArtist(artistId);
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
            console.error("Algo salió mal");
            console.error(error);
        })
    });
    }
    
} 


module.exports = SubscriptionsManager;