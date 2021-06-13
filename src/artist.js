const AlbumAlreadyExistsError= require('./errores/AlbumAlreadyExistsError');
const AlbumDoesNotExistError= require('./errores/AlbumDoesNotExistError');


module.exports= class Artist{

  constructor(name,country,id){
    this.id = id;
    this.name=name;
    this.country=country;
    this.albums= [];
  }
  

  setName(name){
    this.name = name;
  }

  setCountry(country){
    this.country = country;
  }

  addAlbum(album){
    if(this.albums.some(a => a.name===album.name)){
      throw new AlbumAlreadyExistsError(); 
    }
    else{
       this.albums.push(album);

    }
  }

  removeAlbum(album){
    if(this.albums.some(a => a.id===album.id)){
      const index = this.albums.indexOf(album);
      if (index > -1) {
       this.albums.splice(index, 1);
      
    }
    else {
      throw new AlbumDoesNotExistError();
    }
  }
}
      
hasTrack(trackid){//
  return this.albums.some(a => a.tracks.some(t=>t.id===trackid));
}


removeTrackFromAlbum(track){//
  return this.getAlbumByTrack(track.id).removeTrack(track);
}

getAlbumByTrack(trackId){ //
  return this.albums.find(a => a.tracks.some(t=>t.id===trackId));
}

getTracks(){
  return this.albums.flatMap(a =>a.tracks);
}

};
