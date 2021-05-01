const trackAlreadyExistsError= require('./errores/TrackAlreadyExistsError');

module.exports= class album{

  constructor(name, year,id){
    this._id= id;
    this._name=name;
    this._year=year;
    this._tracks = [];
  }

  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }

  get year(){
    return this._year;
  }

  get tracks(){
    return this._tracks;
  }


  addTrack(track){
    if(this._tracks.some( t => t.name === track.name)){
      throw trackAlreadyExistsError;
    }else{
      this._tracks.push(track);
    }
  }
};