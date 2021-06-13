const rp = require('request-promise');
const key = '80fb3133c673cb15bd564a787e6e041b';
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';

module.exports = class MusixMatchCliente {

    constructor(){
      }

    async getLyrics(track){
    var options = {
        uri: BASE_URL + '/track.lyrics.get',
        qs: {
            apikey: key,
            track_id: await this.getTrackIdMusixMatch(track)
        },
        json: true // Automatically parses the JSON string in the response
    };

        let data = await rp.get(
      options
        ).then((response) => {
          var header = response.message.header;
          if (header.status_code !== 200){
            throw new Error('status code != 200');}
            var body = response.message.body;      
            var lyrics = body.lyrics.lyrics_body; 
            return lyrics

        }).catch((error) => {
          console.log('algo salio mal', error);
       });
  
       return data;
    }
  
    async getTrackIdMusixMatch(track){
        const request = {
          uri: BASE_URL + '/track.search',
          qs: {
              apikey: "80fb3133c673cb15bd564a787e6e041b",
              q_track: track.name
          },
          json: true
      };
    
      return await rp.get(
          request
      ).then((response) => {
          var header = response.message.header;
          var tracks = response.message.body.track_list;
          var id = tracks[0].track.track_id;

          if (header.status_code !== 200){
            throw new Error('status code != 200');}
    
          return id;
    
      }).catch((error) => {
        console.log('no se pudo obtener el id del track', error);
     });
      }
}

