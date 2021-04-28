module.exports= class album{

  constructor(name, year,id){
    this._id= id;
    this._name=name;
    this._year=year;
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
};