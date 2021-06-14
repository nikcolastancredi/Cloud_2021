const TrackAlreadyExistsError= require('./errores/TrackAlreadyExistsError');
const TrackDoesNotExistsError= require('./errores/TrackDoesNotExistsError');

module.exports= class Album{

  constructor(name, year,id){
    this.id= id;
    this.name=name;
    this.year=year;
    this.tracks = [];
  }


  addTrack(track){
    if(this._tracks.some( t => t.name === track.name)){
      throw new TrackAlreadyExistsError();
    }else{
      this.tracks.push(track);
    }
  }

  removeTrack(track){
    if(this.tracks.some( t => t.name === track.name)){
      const index = this.tracks.indexOf(track);
       return this.tracks.splice(index, 1);
    }else{
            throw new TrackDoesNotExistsError();
    }
  }




};