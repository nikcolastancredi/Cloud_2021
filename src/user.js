
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
    if(this.trackAlreadyPlayed(track.name)){
    this.timesPlayed[track.id]++; //timesPlayed[id] devuelve el valor
    console.log(`track ${track.name} escuchado ${this.timesPlayed[track.id]} veces`);
  } else{
    this.timesPlayed[track.id]=1; // creo un obj k v
    this.playedTracks.push(track.name);   
    console.log(`track ${track.name} agregado a "escuchados" `);
    console.log(`track ${track.name} escuchado ${this.timesPlayed[track.id]} veces`);
  }
  }

  trackAlreadyPlayed(trackName){
    return this.playedTracks.some(t=>t===trackName);
  }




};