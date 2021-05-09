
module.exports= class User{

  constructor(name, id){
    this._id= id;
    this._name=name;
    this._playedTracks = [];
    this._timesPlayed = {};

  }

  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }

  get playedTracks(){
    return this._playedTracks;
  }

  get timesPlayed(){
    return this._timesPlayed;
  }

  playTrack(track){
    if(this.trackAlreadyPlayed(track.id)){
    this.timesPlayed[track.id]++; //timesPlayed[id] devuelve el valor
    console.log(`track ${track.name} escuchado ${this.timesPlayed[track.id]} veces`);
  } else{
    this.timesPlayed[track.id]=1; // creo propiedad en obj 
    this.playedTracks.push(track);   
    console.log(`track '${track.name}' agregado a "escuchados" `);
    console.log(`track '${track.name}' escuchado ${this.timesPlayed[track.id]} veces`);
  }
  }

  trackAlreadyPlayed(trackId){
    return this.playedTracks.some(t=>t.id===trackId);
  }

  getPlayedTracks(){
    return this.playedTracks.map(t=>t.name);
  }

  getTimesPlayed(trackId){
    if(this.trackAlreadyPlayed(trackId)){
    return this.timesPlayed[trackId];
    }
    else{
      return 0;
    }
  }



};