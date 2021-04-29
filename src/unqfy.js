
const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy

const artist = require('./artist');
const album = require('./album');
const track = require('./track');
const artistExistError= require('./errores/ArtistAlreadyExistsError');
const artistDoesNotExistError=require('./errores/ArtistDoesNotExistError');
const albumDoesNotExistError= require('./errores/AlbumDoesNotExistError');


class UNQfy {
  constructor(){
    this._artists = [];
    this.playlists = [];
    this.uniqueId = 0;
 
  }

  getUniqueId() {
    this.uniqueId = this.uniqueId + 1;
    return this.uniqueId;
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy. El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)*/
 
    if(this.artistExists(artistData)){
      throw new artistExistError;
    }

    else{
      const newArtist= new artist(artistData.name,artistData.country, this.getUniqueId());
      this._artists.push(newArtist);
      return newArtist;

    }
  }

  artistExists(artistData){
    return (this._artists.some(
      artist => artist.name === artistData.name)
      );
  }


  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId. El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number) */
    const newAlbum = new album (albumData.name, albumData.year, this.getUniqueId());
    const artist = this.getArtistById(artistId);
    if(artist===undefined){
      throw new artistDoesNotExistError();
    }
    else {
      artist.addAlbum(newAlbum);
      return newAlbum;
    }
  }
  


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId. 
      El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    const newTrack= new track(trackData.name, trackData.duration, trackData.genres,this.getUniqueId());
    const album =  this.getAlbumById(albumId);

    if(album === undefined){
      throw new albumDoesNotExistError();
    }
    else{
      album.addTrack(newTrack);
      return newTrack;
    }
  }

  getArtistById(id) {

    const artist = this._artists.find(a => a.id === id);

    if(artist === undefined){
      throw new artistDoesNotExistError;
    }
    else{
      return artist;

    }
  }

  

  getAlbumById(id) {
    const album = this.getArtistAlbum(id);
    return album;
  }


  getArtistAlbum(id) {
    let album = undefined;
    this._artists.forEach(a => {
      const albums = this.getAlbums(id, a.albums);
      if (albums.length === 1) { album = albums[0]; }
    });
    return album;
  }

  getTrackById(id) {

  }

  getAlbums(id, albums) {
    const newAlbums = albums.filter(a => a.id === id);
    return newAlbums;
  }

  getPlaylistById(id) {

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {

  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {

  }


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */

  }

 save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }


  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, artist, album, track, albumDoesNotExistError, artistDoesNotExistError, artistExistError];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

