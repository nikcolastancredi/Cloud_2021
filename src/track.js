const rp = require('request-promise');
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';


module.exports= class Track{

  constructor(name, duration,genres,id){
    this._id= id;
    this._name= name;
    this._duration= duration;
    this._genres= genres;
    this._lyrics=null;

  }

  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }

  get duration(){
    return this._duration;
  }

  get genres(){
    return this._genres;
  }

 async setLyrics(){

    var options = {
      uri: BASE_URL + '/track.lyrics.get',
      qs: {
          apikey: "80fb3133c673cb15bd564a787e6e041b",
          track_id: "16394917"
      },
      json: true // Automatically parses the JSON string in the response
  };
    this._lyrics = await rp.get(
    options
      ).then((response) => {
        var header = response.message.header;
          var body = response.message.body;      
          var lyrics = body.lyrics.lyrics_body; 
          if (header.status_code !== 200){
            throw new Error('status code != 200');
        }       
          return lyrics
        
      }).catch((error) => {
        console.log('algo salio mal', error);
     });     
     console.log("fuera del get: "+this._lyrics)

     return this._lyrics;
  }

   async getLyrics() {
    if(this._lyrics===null){
      await this.setLyrics()
    }
    
    return this._lyrics

  }

    getTracksIdMusicMach(){
    const request = {
      uri: BASE_URL + '/track.search',
      qs: {
          apikey: "80fb3133c673cb15bd564a787e6e041b",
          q_track: this.name
      },
      json: true // Automatically parses the JSON string in the response
  };

  return rp.get(
      request
  ).then((response) => {

      const tracks = response.message.body.track_list;

      const id = tracks[0].track.track_id;

      return id;

  });
  }
};