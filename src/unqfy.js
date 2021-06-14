
const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy

const Artist = require('./artist');
const Album = require('./album');
const Track = require('./track');
const Playlist = require('./playlist');
const ArtistExistError= require('./errores/ArtistAlreadyExistsError');
const ArtistDoesNotExistError=require('./errores/ArtistDoesNotExistError');
const AlbumDoesNotExistError= require('./errores/AlbumDoesNotExistError');
const TrackDoesNotExistsError = require('./errores/TrackDoesNotExistsError');
const UserAlreadyExistsError = require('./errores/UserAlreadyExistsError');
const UserDoesNotExistError = require('./errores/UserDoesNotExistsError');
const PlaylistDoesNotExistError = require('./errores/PlaylistDoesNotExistsError');
const User = require('./user');
const MusixMatchCliente =  require('./clientApi/MusixMatchCliente');
const mmCliente = new MusixMatchCliente();
const filename = 'data.json';
const spotifyClient = require('./clientApi/spotifyClient');
const spotify = new spotifyClient.SpotifyClient();




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
      const newArtist= new Artist(artistData.name, artistData.country, this.getUniqueId());
      this._artists.push(newArtist);
      return newArtist;

    }
  }

  artistExists(artistData){
    return (this._artists.some(
      artist => artist.getName() === artistData.name)
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
    // const newAlbum = new Album (albumData.name, albumData.year, this.getUniqueId());
    const artist = this.getArtistById(artistId);
    if(artist === undefined){
      throw new ArtistDoesNotExistError();
    }
    else {
      const newAlbum = new Album (albumData.name, albumData.year, this.getUniqueId());
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

  getArtists(){
    return this._artists;
  }
  
  getArtistByName(name){
    const all = this.searchByName(name);
    return all.artists;
  }

  updateArtist(id, data){
    const artistSearch = this.getArtistById(id);
    artistSearch.setName(data.name);
    artistSearch.setCountry(data.country);
    const index = this._artists.findIndex(a => a.id === id);
    this._artists.splice(index, 1,artistSearch);

    return (artistSearch);
  }

  getAlbumById(id) {
    const album = this.getArtistAlbum(id);
    if(album===undefined){
      throw new AlbumDoesNotExistError();
    }
   return album;
  }

  getAllAlbums(){
    const albums = this._artists.flatMap(artist => artist.albums);
    return albums;
  }

  getAlbumByName(name){
    const all = this.searchByName(name);
    return all.albums;
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
    return albums.filter(album => album.getId() === id);
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

    return tracks.filter(t => t.genres.some(g => genres.includes(g)));
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    const artistNameValue = artistName.toLowerCase();
    
    const artist = this._artists.filter(artist => artist.getName().toLowerCase() === artistNameValue)[0];

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
    const artists = this._artists.filter(artist => artist.getName().toLowerCase().includes(nameValue));
    const albums = this._artists.flatMap(artist => artist.getAlbums().filter(album => album.getName().toLowerCase().includes(nameValue)));
    const tracks = this._artists.flatMap(artist => artist.getAlbums().flatMap(album => album.getTracks().filter(track => track.getName().toLowerCase().includes(nameValue))));
    const playlists = this.playlists.filter(playlist => playlist.getName().toLowerCase().includes(nameValue));
    
    return { artists, albums, tracks, playlists };
  }


  deleteArtist(artistId){
    //si el artista existe elimina primero los tracks (si existen) de todas las playlists, y elimina al artista.
    const artista = this.getArtistById(artistId);
    
    if(this.artistExists(artista)){
     this.deleteTracksFromPlaylists(artista.getTracks());
     this.deleteTracksFromUsers(artista.getTracks());///
     const index = this._artists.indexOf(artista);
     if (index > -1) {
      this._artists.splice(index, 1);
    }else{
      throw new ArtistDoesNotExistError;
    }
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
    
    if(artist === undefined){
      throw new AlbumDoesNotExistError;
    } else{
      this.deleteTracksFromPlaylists(album.getTracks());//
      this.deleteTracksFromUsers(album.getTracks());///
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
    const playlist = this.playlists.find(p=>p.id === playlistId);
    
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
      const trackToAdd = new Track(track.getName(), track.getDuration(), track.getGenres(), track.getId());
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
     this.save(filename);
      return data;
    }
    else {
      return track.getLyrics();
    }
  }



  async fillAlbumsForArtist(artistId) {
    const artist = this.getArtistById(artistId);
    const albumsFromSpotify = await spotify.getAlbums(artist.getName());

    albumsFromSpotify.forEach(album =>this.addAlbum(artist.id, {name : album.name, year : album.release_date.substr(0,4)}));
    
    return albumsFromSpotify;
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

