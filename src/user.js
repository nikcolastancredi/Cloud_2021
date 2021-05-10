
module.exports= class User{

  constructor(name, id){
    this._id= id;
    this._name=name;
    this._playedTracks = [];
    this._timesPlayed = [];

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

      const priorValue = this.timesPlayed.find(t => t.trackId === track.id).timesPlayed;

      const trackIndex = this.timesPlayed.findIndex(t => t.trackId === track.id);
      this.timesPlayed[trackIndex].timesPlayed = priorValue + 1;

  } else{

    this.timesPlayed.push({
      trackId : track.id,
      timesPlayed : 1
      
    });
    this.playedTracks.push(track);   
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