const rp = require('request-promise');
const BASE_URL = process.env.API_UNQFY;

class NewsletterClient{

    constructor(){
    }

    async notifyNewAlbum(album,artist){
        const request = {
            uri: BASE_URL + '/api/notify',
            body: {
                artistId: artist.id,
               subject: `Nuevo álbum para artista ${artist.name}`,
               message:`se ha agregado el álbum ${album.name} al artista ${artist.name}`
            },
            json: true
        };
      
        return await rp.post(
            request
        ).then((response) => {
      console.log("todos los suscriptores fueron notificados");
        }).catch((error) => {
          console.log("ocurrió un error");
       });
        
    }

    async notifyDeleteArtist(artist){
        const request = {
            uri: BASE_URL + '/api/subscriptions',
            body: {
                artistId: artist.id
            },
            json: true
        };
      
        return await rp.delete(
            request
        ).then((response) => {
        console.log(response);
        console.log("todos los suscriptores fueron dados de baja para el artista");
        }).catch((error) => {
          console.log("ocurrió un error");
       });
        
    }
}

module.exports = NewsletterClient;