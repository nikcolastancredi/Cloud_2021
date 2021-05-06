
class Playlist {

    constructor(id, name, genres) {
      this.id = id;
      this.name = name;
      this.genres = genres;
      this.tracks = [];
    }
  
    getId() {
      return this.id;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getName() {
      return this.name;
    }
  
    setName(name) {
      this.name = name;
    }
  
    getDuration() {
      return this.duration;
    }
  
    setDuration(duration) {
      this.duration = duration;
    }
  
    addTrack(track) {
      this.tracks.push(track);
      this.setDuration(this.calculateDuration());
    }
  
    getTracks() {
      return this.tracks;
    }
  
    setTracks(tracks) {
      this.tracks = tracks;
    }
  
    hasTrack(aTrack) {
      return this.tracks.some(t => t.id === aTrack.id);
    }
  
    calculateDuration() {
      return this.tracks.reduce(this.getSumDuration, 0);
    }
  
    getSumDuration(total, track) {
      return total + track.duration;
    }
  
    generateListByTracks(tracks, maxDuration) {
      let tracksInGenres = tracks;
      while (this.canAddTrack(tracksInGenres, maxDuration)) {
        const randomTrack = this.getRandomTrack(tracksInGenres);
        if (!this.exceedsDuration(randomTrack, maxDuration)) {
          this.addTrack(randomTrack);
          tracksInGenres = this.removeTrackIfInList(tracksInGenres);
        } else {
          tracksInGenres = tracksInGenres.filter(track => track.id !== randomTrack.id);
        }
        
      }
    }
  
    canAddTrack(tracks, maxDuration) {
      return this.calculateDuration() < maxDuration && tracks.length > 0;
    }
  
    getRandomTrack(tracks) {
      return tracks[Math.floor(Math.random() * tracks.length)];
    }
  
    exceedsDuration(randomTrack, maxDuration) {
      return (this.calculateDuration() + randomTrack.duration) > maxDuration;
    }
  
    removeTrackIfInList(tracks) {
      return tracks.filter(t => !this.hasTrack(t));
    }

    removeTrack(trackId){
      const index = this.tracks.findIndex(t=>t.id===trackId);
      if (index > -1) {
        return this.tracks.splice(index, 1);
    }
  }
    
    removeTracks(trackArray){//recibe una lista de tracks a eliminar si existen en la playlist
      trackArray.forEach(t => {
        if(this.hasTrack(t)){
          this.removeTrack(t.id);
          console.log(`track eliminado de playlist : ${t.name}`);
        }
      });
  }
  






}
  module.exports = Playlist;