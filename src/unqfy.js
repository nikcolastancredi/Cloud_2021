
const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy

const Artist = require('./Artist');
const Album = require('./Album');
const Track = require('./Track');
const Playlist = require('./Playlist');
const ArtistExistError= require('./errores/ArtistAlreadyExistsError');
const ArtistDoesNotExistError=require('./errores/ArtistDoesNotExistError');
const AlbumDoesNotExistError= require('./errores/AlbumDoesNotExistError');
const TrackDoesNotExistsError = require('./errores/TrackDoesNotExistsError');
const UserAlreadyExistsError = require('./errores/UserAlreadyExistsError');
const UserDoesNotExistError = require('./errores/UserDoesNotExistsError');
const PlaylistDoesNotExistError = require('./errores/PlaylistDoesNotExistsError');
const User = require('./User');
// const spoCliente = require('./src/clientApi/SpotifyCliente');
// const spotifyClientInstance = new spoCliente.SpotifyCliente();
const MusixMatchCliente =  require('./clientApi/MusixMatchCliente');
const mmCliente = new MusixMatchCliente();


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
      throw new ArtistExistError;
    }

    else{
      const newArtist= new Artist(artistData.name,artistData.country, this.getUniqueId());
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
      const newUser= new User(userData.name, this.getUniqueId());
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
    const newAlbum = new Album (albumData.name, albumData.year, this.getUniqueId());
    const artist = this.getArtistById(artistId);
    if(artist===undefined){
      throw new ArtistDoesNotExistError();
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
    const newTrack= new Track(trackData.name, trackData.duration, trackData.genres,this.getUniqueId());
    const album =  this.getAlbumById(albumId);

    if(album === undefined){
      throw new AlbumDoesNotExistError();
    }
    else{
      album.addTrack(newTrack);
      return newTrack;
    }
  }

  getArtistById(id) {

    const artist = this._artists.find(a => a.id === id);

    if(artist === undefined){
      throw new ArtistDoesNotExistError;
    }
    else{
      return artist;

    }
  }

  

  getAlbumById(id) {
    const album = this.getArtistAlbum(id);
    if(album===undefined){
      throw new AlbumDoesNotExistError();
    }
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
    const track = this._artists
      .flatMap((artist) => artist.albums)
      .flatMap((album) => album.tracks)
      .find((t) => t.id === id);

    if (track === undefined) {
      throw new TrackDoesNotExistsError();
    } else {
      return track;
    }
  }

  getAlbums(id, albums) {
    const newAlbums = albums.filter(a => a.id === id);
    return newAlbums;
  }

  getPlaylistById(id) {
    const playlist = this.playlists.filter(p => p.id === id);
    if (playlist.length === 0) {
      throw new PlaylistDoesNotExistError();
    } else {
      return playlist[0];
    }
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
    const artistNameValue = artistName.toLowerCase();
    const artist = this._artists.filter(artist => artist.name.toLowerCase() === artistNameValue)[0];

    if(artist === null || artist === undefined){

      return [];
    } else{

      return artist.getTracks();
    }
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
      const idPlaylist = this.getUniqueId();
      const newPlaylist = new Playlist(idPlaylist, name, genresToInclude);
      ///console.log(newPlaylist);
      const tracksInGenres = this.getTracksMatchingGenres(genresToInclude);
      newPlaylist.generateListByTracks(tracksInGenres, maxDuration);
      this.addPlaylist(newPlaylist);
      return newPlaylist;
  }

  addPlaylist(newPlaylist) {
    this.playlists.push(newPlaylist);
  }
  

  searchByName(name) {
    const nameValue = name.toLowerCase();
    const artists = this._artists.filter(artist => artist.name.toLowerCase().includes(nameValue));
    const albums = this._artists.flatMap(artist => artist.albums.filter(album => album.name.toLowerCase().includes(nameValue)));
    const tracks = this._artists.flatMap(artist => artist.albums.flatMap(album => album.tracks.filter(track => track.name.toLowerCase().includes(nameValue))));
    const playlists = this.playlists.filter(playlist => playlist.name.toLowerCase().includes(nameValue));
    return { artists, albums, tracks, playlists };
  }


  deleteArtist(artistId){//si el artista existe elimina primero los tracks (si existen) de todas las playlists, y elimina al artista.
    const artista = this.getArtistById(artistId);
    
    if(this.artistExists(artista)){
     this.deleteTracksFromPlaylists(artista.getTracks());
     this.deleteTracksFromUsers(artista.getTracks());///
     const index = this._artists.indexOf(artista);
     if (index > -1) {
      this._artists.splice(index, 1);
    }
      return (`El artista '${artista.name}' ha sido eliminado con éxito`);
    } else{
      throw new ArtistDoesNotExistError;
    }
  }

  deleteTracksFromPlaylists(tracks){//
    this.playlists.forEach(p=> p.removeTracks(tracks));
  }

  deleteTracksFromUsers(tracks){
    this.users.forEach(u=>u.removeListenedTracks(tracks));///
  }

  deleteAlbum(albumId){

    const artist= this._artists.find(a=>a.albums.includes(this.getAlbumById(albumId)));
    const album = this.getAlbumById(albumId);
    
    if(artist===undefined){
      throw new AlbumDoesNotExistError;
    } else{
      this.deleteTracksFromPlaylists(album.tracks);//
      this.deleteTracksFromUsers(album.tracks);///
      artist.removeAlbum(this.getAlbumById(albumId));
      return (`El álbum ha sido eliminado con éxito`);
    }
  }
  

  deleteTrack(trackId){
    const artist = this._artists.find(a => a.hasTrack(trackId));
    const playlists = this.playlists.filter(p=>p.hasTrack(this.getTrackById(trackId)));
    let eliminado = {};

    if(artist===undefined){
      throw new TrackDoesNotExistsError;
    } else{
      eliminado = artist.removeTrackFromAlbum(this.getTrackById(trackId))[0];//
      this.deleteTracksFromUsers([eliminado]);
      if(playlists.length > 0){
       playlists.forEach(p=> p.removeTrack(trackId)); 
        }
      console.log(`Track '${eliminado.name}' id:${eliminado.id} eliminado con éxito!`);
    }    
  }

  deletePlaylist(playlistId){
    const playlist = this.playlists.find(p=>p.id===playlistId);
    
    if(playlist === undefined){
      throw new PlaylistDoesNotExistError; 
    } else{
      const index = this.playlists.indexOf(playlist);
       this.playlists.splice(index, 1);
       console.log("playlist[] despues de eliminar :", this.playlists);
     
       return (`La playlist '${playlist.getName()}' ha sido eliminado con éxito`);
    }

  }



  playTrack(userId, trackId){//
    const user = this.getUserById(userId);
    const track = this.getTrackById(trackId);
    if(user === undefined){
      throw new UserDoesNotExistError;
    } else {
      this.userPlayTrack(user,track);
    }
  }

  getUserById(id) {
    const user = this.users.filter(u => u.id === id);
    if (user.length === 0) {
      throw new UserDoesNotExistError();
    } else {
      return user[0];
    }
  }


  userPlayTrack(user,track){
    if (track===undefined) {
      throw new TrackDoesNotExistsError;
     } else {
       user.playTrack(track);
     }
  }

  userGetPlayedTracks(userId){
    
    const user = this.getUserById(userId);
    if(user === undefined){
      throw new UserDoesNotExistError;
    } else {
    return user.getPlayedTracks();
    }
  }

  userGetTimesPlayed(userId, trackId){
    const user = this.getUserById(userId);
    if(user === undefined){
      throw new UserDoesNotExistError;
    } else {
    return user.getTimesPlayed(trackId);
    }
  }

  getThisIs(artistId){

    // consigo el artista
    const artist = this.getArtistById(artistId);

    // consigo los temas del artista
    const tracksMatchingArtist = this.getTracksMatchingArtist(artist.name);

    // obtengo todos los temas escuchados de todos los usuarios
    const listenedTracks = this.users.flatMap(u => u.timesPlayed);

    //hago la union de temas escuchados con los que coinciden con el artista
    const listenedTracksByArtist = this.union(listenedTracks, tracksMatchingArtist);

    // reduzco para poder sumar por trackId
    const listTrackWithTimesPlayed = this.getSumListenedTracks(listenedTracksByArtist);

    //ordeno los tracks de mayor a menor.
    const orderedTracksById= listTrackWithTimesPlayed.sort((t1, t2) => t2.timesPlayed - t1.timesPlayed).slice(0, 3);

    const result = [];

    orderedTracksById.forEach(t => {

      const track = this.getTrackById(t.trackId);
      const trackToAdd = new Track(track.name, track.duration, track.genres, track.id);
      trackToAdd.timesPlayed = t.timesPlayed;
      result.push(trackToAdd);

    });

    return result;
  }

  union(list1, list2) {
   return list1.filter( a => true === list2.some( b => a.trackId === b.id ) );
  }

  getSumListenedTracks(array){

    const result= [];
    array.reduce((res, value) => {
      if (!res[value.trackId]) {
        res[value.trackId] = { trackId: value.trackId, timesPlayed: 0 };
        result.push(res[value.trackId]);
      }
      res[value.trackId].timesPlayed += value.timesPlayed;
      return res;
    }, {});
    
    return result;
  }

  sortBy(arr, prop) {
    return arr.sort((a, b) => a[prop] - b[prop]);
  }

  // Visado_2
  async getLyrics(trackId){
    const track = this.getTrackById(trackId);
    if( track.getLyrics() === null ){
     var data = await mmCliente.getLyrics(track);
     track.setLyrics(data);
     this.save('data.json');
      return data;
    }
    else {
      return track.getLyrics();
    }
  }


  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }


  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Track, Playlist, User, Album];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }

  getUNQfy(filename = "data.json") {
    let unqfy = new UNQfy();
    if (fs.existsSync(filename)) {
      unqfy = UNQfy.load(filename);
    }
    return unqfy;
  }
}


// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

