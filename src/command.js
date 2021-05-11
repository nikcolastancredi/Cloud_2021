const CommandDoesNotExistsError = require("./errores/CommandDoesNotExistsError");
const CommandIncompleteError = require("./errores/CommandIncompleteError");

class Command {
  constructor() {
    this.commandList = {
      addArtist: this.addArtistFunction,
      addUser: this.addUserFunction,
      addAlbum: this.addAlbumFunction,
      addTrack: this.addTrackFunction,
      getArtistById: this.getArtistByIdFunction,
      getAlbumById: this.getAlbumByIdFunction,
      getUserById: this.getUserByIdFunction,
      deleteArtist: this.deleteArtistFunction,
      deleteAlbum: this.deleteAlbumFunction,
      deleteTrack: this.deleteTrackFunction,
      searchByName: this.searchByNameFunction,
      createPlaylist : this.createPlaylistFunction,
      getTracksMatchingGenres : this.getTracksMatchingGenresFuncion,
      getPlaylistById : this.getPlaylistByIdFuncion,
      getTrackById : this.getTrackByIdFuncion,
      deletePlaylist : this.deletePlaylistFunction,
      playTrack : this.playTrackFunction,
      getTracksMatchingArtist : this.getTracksMatchingArtistFuncion,
      getPlayedTracks : this.getPlayedTracksFunction,
      getTimesPlayed : this.getTimesPlayedFunction,
      getThisIs : this.getThisIsFunction

    };
  }

  execute(params, unqFy) {
    const cmd = params[0];
    if (cmd in this.commandList) {
      this.commandList[cmd](params, unqFy);
    } else {
      throw new CommandDoesNotExistsError(params[0]);
    }
  }

  addArtistFunction(parameters, unqfy) {
    if (parameters.length >= 3) {
      console.log(
        unqfy.addArtist({ name: parameters[1], country: parameters[2] })
      );
    } else {
      throw new CommandIncompleteError(parameters[0], 2);
    }
  }

  addAlbumFunction(parameters, unqfy) {
    if (parameters.length >= 4) {
      console.log(
        unqfy.addAlbum(parseInt(parameters[1]), {
          name: parameters[2],
          year: parameters[3],
        })
      );
    } else {
      throw new CommandIncompleteError(parameters[0], 3);
    }
  }

  addTrackFunction(parameters, unqfy) {
    if (parameters.length >= 5) {
      console.log(
        unqfy.addTrack(parseInt(parameters[1]), {
          name: parameters[2],
          duration: parseInt(parameters[3]),
          genres: parameters.slice(4),
        })
      );
    } else {
      throw new CommandIncompleteError(parameters[0], 4);
    }
  }

  addUserFunction(parameters, unqfy) {
    if (parameters.length >= 2) {
      console.log(
        unqfy.addUser({ name: parameters[1]})
      );
    } else {
      throw new CommandIncompleteError(parameters[0], 2);
    }
  }

  getArtistByIdFunction(parameters, unqfy) {
    if (parameters.length >= 2) {
      console.log(
        unqfy.getArtistById(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }
  
  getAlbumByIdFunction(parameters, unqfy) {
    if (parameters.length >= 2) {
      console.log(
        unqfy.getAlbumById(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }



  deleteArtistFunction(parameters, unqfy) {
    if (parameters.length >= 2) {
      console.log(
        unqfy.deleteArtist(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }

  deleteAlbumFunction(parameters, unqfy) {
    if (parameters.length >= 2) {
      console.log(
        unqfy.deleteAlbum(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }

  deleteTrackFunction(parameters, unqfy) {
    if (parameters.length >= 2) {
      unqfy.deleteTrack(parseInt(parameters[1]));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }

  deletePlaylistFunction(parameters, unqfy) {
    if (parameters.length >= 2) {
      console.log(
        unqfy.deletePlaylist(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }

  searchByNameFunction(params, unqfy) { 
    if (params.length === 2) {
      console.log(
        unqfy.searchByName(params[1])
      );
    } else {
      throw new CommandIncompleteError(params[0],1); 
    }
  }
  createPlaylistFunction(parameters, unqfy){
    if (parameters.length >= 4) {
      const IndDuration = parameters.length - 1;
       
      console.log(
        unqfy.createPlaylist(parameters[1],parameters.slice(2,IndDuration),parseInt(parameters[IndDuration])));
    } else {
      throw new CommandIncompleteError(parameters[0], 3);
    }
  }
  getTracksMatchingGenresFuncion(parameters, unqfy){
    if (parameters.length >= 1) { 
      console.log(
        unqfy.getTracksMatchingGenres(parameters.slice(1,parameters.length - 1 )));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }

  getTracksMatchingArtistFuncion(parameters, unqfy){
    if (parameters.length >= 1) { 
      console.log(
        unqfy.getTracksMatchingArtist(parameters[1]));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }



  getTrackByIdFuncion(parameters, unqfy){
    if (parameters.length >= 1) {
      console.log(
        unqfy.getTrackById(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }
  
  getUserByIdFunction(parameters, unqfy){
    if (parameters.length >= 1) {
      console.log(
        unqfy.getUserById(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }

  getPlaylistByIdFuncion(parameters, unqfy){
    if (parameters.length >= 1) {
      console.log(
        unqfy.getPlaylistById(parseInt(parameters[1])));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }

    playTrackFunction(parameters, unqfy){
    if (parameters.length >= 2) {
              unqfy.playTrack(parseInt(parameters[1]), parseInt(parameters[2]));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
  }
    getThisIsFunction(parameters, unqfy){
      if (parameters.length >= 2) {
        console.log(unqfy.getThisIs(parseInt(parameters[1]), parseInt(parameters[2])));
      } else {
        throw new CommandIncompleteError(parameters[0], 1);
      }
    }

    getPlayedTracksFunction(parameters, unqfy){
      if (parameters.length >= 2) {
        console.log(
          unqfy.userGetPlayedTracks(parseInt(parameters[1])));
      } else {
        throw new CommandIncompleteError(parameters[0], 1);
      }
  }
  getTimesPlayedFunction(parameters, unqfy){
    if (parameters.length >= 2) {
      console.log(
        unqfy.userGetTimesPlayed(parseInt(parameters[1]), parseInt(parameters[2]) ));
    } else {
      throw new CommandIncompleteError(parameters[0], 1);
    }
}
  
}



module.exports = Command;
