const rp = require('request-promise');
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';


module.exports= class Track{

  constructor(name, duration,genres,id){
    this._id= id;
    this._name= name;
    this._duration= duration;
    this._genres= genres;

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

   getLyrics() {

    const request = {
      uri: BASE_URL + '/track.lyrics.get',
      qs: {
          apikey: "80fb3133c673cb15bd564a787e6e041b",
          track_id: "16394917"
      },
      json: true // Automatically parses the JSON string in the response
  };

  return rp.get(
    request
      ).then((response) => {
          const body = response.message.body;      
          const lyrics = body.lyrics.lyrics_body;   
          console.log("la letra: " + lyrics);    
          return lyrics;
        
      }).catch((error) => {
        throw error;
    });
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