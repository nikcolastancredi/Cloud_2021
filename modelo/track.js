

module.exports= class Track{

  constructor(name, duration){
    this._id= Math.floor(Math.random()*100);
    this.name= name;
    this.duration=duration;
    this._genres=[];

  }


};