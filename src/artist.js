const AlbumAlreadyExistsError= require('./errores/AlbumAlreadyExistsError');
const AlbumDoesNotExistError= require('./errores/AlbumDoesNotExistError');


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
  
  get albums(){
    return this._albums;
  }

  addAlbum(album){
    if(this._albums.some(a => a.name===album.name)){
      throw AlbumAlreadyExistsError; 
    }
    else{
       this._albums.push(album);

    }
  }

  removeAlbum(album){
    if(this._albums.some(a => a.id===album.id)){
      const index = this.albums.indexOf(album);
      if (index > -1) {
       this.albums.splice(index, 1);
       console.log("array despues de eliminar album",this.albums);
    }
    else {
      throw new AlbumDoesNotExistError;
    }
  }
}

  getTracks(){
  
    return this._albums.flatMap(album => album.tracks);

  }



};
