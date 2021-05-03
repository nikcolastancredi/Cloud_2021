
module.exports= class user{

  constructor(name, id){
    this._id= id;
    this._name=name;
    this._playedTracks = [];
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

};