
const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy

const artist = require('./artist');
const album = require('./album');
const track = require('./track');
const playlist = require('./playlist');
const artistExistError= require('./errores/ArtistAlreadyExistsError');
const artistDoesNotExistError=require('./errores/ArtistDoesNotExistError');
const albumDoesNotExistError= require('./errores/AlbumDoesNotExistError');
const TrackDoesNotExistsError = require('./errores/TrackDoesNotExistsError');
const UserAlreadyExistsError = require('./errores/UserAlreadyExistsError');
const playlistDoesNotExistError = require('./errores/PlaylistDoesNotExistsError');
const user = require('./user');


class UNQfy {
  constructor(){
    this._artists = [];
    this.playlists = [];
    this.users = [];
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
  
  addUser(userData) {
  /* Crea un artista y lo agrega a unqfy. El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)*/
 
    if(this.userExists(userData)){
      throw new UserAlreadyExistsError();
    }

    else{
      const newUser= new user(userData.name, this.getUniqueId());
      this.users.push(newUser);
      return newUser;

    }
  }

  userExists(userData){
    return (this.users.some(
      user => user.name === userData.name)
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
  const track= this._artists.flatMap(artist => artist.albums)
          .flatMap(album => album.tracks).find(t => t.id === id);
          return track;
  }

  getAlbums(id, albums) {
    const newAlbums = albums.filter(a => a.id === id);
    return newAlbums;
  }

  getPlaylistById(id) {
    const playlist = this.playlists.filter(p => p.id === id);
    return playlist;
  }


  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    const albumes = this._artists.flatMap(artist => artist.albums);
    const tracks = albumes.flatMap(album => album.tracks);
    const trackInGenres = tracks.filter(t => t.genres.some(g => genres.includes(g)));
    return trackInGenres;
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    return this._artists.filter(artist => artist.name === artistName).flatMap(artist => artist.albums.flatMap(album => album.tracks));
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
    try {
      const idPlaylist = this.getUniqueId();
      const newPlaylist = new playlist(idPlaylist, name, genresToInclude);
      ///console.log(newPlaylist);
      const tracksInGenres = this.getTracksMatchingGenres(genresToInclude);
      newPlaylist.generateListByTracks(tracksInGenres, maxDuration);
      this.addPlaylist(newPlaylist);
      return newPlaylist;
    } 
    catch (error) {
      throw error;
    }
  }

  addPlaylist(newPlaylist) {
    this.playlists.push(newPlaylist);
  }
  

  searchByName(name) {
    const artists = this._artists.filter(artist => artist.name.includes(name));
    const albums = this._artists.flatMap(artist => artist.albums.filter(album => album.name.includes(name)));
    const tracks = this._artists.flatMap(artist => artist.albums.flatMap(album => album.tracks.filter(track => track.name.includes(name))));
    const playlists = this.playlists.filter(playlist => playlist.name.includes(name));
    return { artists, albums, tracks, playlists };
  }


  deleteArtist(artistId){
    const artista = this.getArtistById(artistId);
    if(this.artistExists(artista)){
     const index = this._artists.indexOf(artista);
     if (index > -1) {
      this._artists.splice(index, 1);
      console.log("array despues de eliminar", this._artists);
    }
      return (`El artista '${artista.name}' ha sido eliminado con éxito`);
    } else{
      throw new artistDoesNotExistError;
    }
  }

  

  deleteAlbum(albumId){

    const artist=this._artists.find(a=>a.albums.includes(this.getAlbumById(albumId)));
    
    if(artist===undefined){
      throw new albumDoesNotExistError;
    } else{
      artist.removeAlbum(this.getAlbumById(albumId));
      return (`El álbum ha sido eliminado con éxito`);
    }
  }
  

  deleteTrack(trackId){
    const artist = this._artists.find(a => this.artistHasTrack(a,trackId));
    //const playlist = this.playlists.flatMap()

    if(artist===undefined){
      throw new TrackDoesNotExistsError;
    } else{
      const album = artist.albums.find(a => a.tracks.some(t=>t.id===trackId));
    album.removeTrack(this.getTrackById(trackId));
    console.log("Track eliminado con éxito!");
    }
  }

  artistHasTrack(artist,trackid){
    return artist.albums.some(a => a.tracks.some(t=>t.id===trackid));
  }

  deletePlaylist(playlistId){
    const playlist = this.playlists.find(p=>p.id===playlistId);
    
    if(playlist===undefined){
      throw new playlistDoesNotExistError; 
    } else{
      const index = this.playlists.indexOf(playlist);
      if (index > -1) {
       this.playlists.splice(index, 1);
       console.log("playlist[] despues de eliminar :", this.playlists);
     }
       return (`La playlist '${playlist.getName()}' ha sido eliminado con éxito`);
    }

  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }


  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, artist, album, track, playlist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

