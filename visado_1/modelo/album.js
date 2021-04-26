module.exports= class album{

  constructor(name, year){
    this._id= Math.floor(Math.random()*100);
    this._name=name;
    this._year=year;
  }

  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }

  
};