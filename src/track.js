

module.exports= class Track{

  constructor(name, duration,genres,id){
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.genres = genres;
    this.lyrics = null;

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
    this.name = name;
  }

  getDuration(){
    return this.duration;
  }

  setDuration(duration){
    this.duration = duration;
  }

  getGenres(){
    return this.genres;
  }

  setLyrics(lyrics){
      this.lyrics = lyrics;
  }

  getLyrics() {
    return this.lyrics;
   }
  


};