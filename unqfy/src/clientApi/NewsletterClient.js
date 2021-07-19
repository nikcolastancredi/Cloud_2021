const rp = require('request-promise');
const BASE_URL = 'http://localhost:8080';

class NewsletterClient{

    constructor(){
    }

    async notify(album,artist){
        const request = {
            uri: BASE_URL + '/api/notify',
            body: {
                artistId: artist.id,
               subject: `Nuevo álbum para artista ${artist.name}`,
               message:`se ha agregado el álbum ${album.name}`
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
}

module.exports = NewsletterClient;