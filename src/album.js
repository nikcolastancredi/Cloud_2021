const TrackAlreadyExistsError= require('./errores/TrackAlreadyExistsError');
const TrackDoesNotExistsError= require('./errores/TrackDoesNotExistsError');

module.exports= class Album{

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
      throw TrackAlreadyExistsError;
    }else{
      this.tracks.push(track);
    }
  }

  removeTrack(track){
    if(this.tracks.some( t => t.name === track.name)){
      const index = this.tracks.indexOf(track);
       return this.tracks.splice(index, 1);
    }else{
            throw TrackDoesNotExistsError;
    }
  }




};