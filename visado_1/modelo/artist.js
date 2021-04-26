const albumAlreadyExistsError= require('./errores/AlbumAlreadyExistsError');
const albumDoesNotExistError= require('./errores/AlbumDoesNotExistError');


module.exports= class Artist{

  constructor(name,country,id){
    this._id= id;
    this._name=name;
    this._country=country;
    this._albums= [];
  }
  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }

  get country(){
    return this._country;
  }

  addAlbum(album){
    if(this.albums.find(a=>a===album)===undefined){
      this._albums.push(album);}
    else{
      throw albumAlreadyExistsError;
    }
  }

  removeAlbum(album){
    if(this.albums.find(a=>a===album)!==undefined){
      this.albums.pop(album);
    }
    else{
      throw albumDoesNotExistError;
    }
  }

  get albums(){
    return this._albums;
  }


};
