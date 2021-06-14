const TrackAlreadyExistsError= require('./errores/TrackAlreadyExistsError');
const TrackDoesNotExistsError= require('./errores/TrackDoesNotExistsError');

module.exports= class Album{

  constructor(name, year,id){
    this.id = id;
    this.name = name;
    this.year = year;
    this.tracks = [];
  }

  getId(){
    return this.id;
  }
  
  setId(id){
    this.id = id;
  }

  getName(){
    return this.name;
  }

  setName(name){
    this.name =name;
  }
  
  getYear(){
    return this.year;
  }

  setYear(year){
    this.year = year;
  }

  getTracks(){
    return this.tracks;
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