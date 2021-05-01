const CommandDoesNotExistsError = require("./errores/CommandDoesNotExistsError");
const CommandIncompleteError = require("./errores/CommandIncompleteError");

class Command {
  constructor() {
    this.commandList = {
      addArtist: this.addArtistFunction,
      addAlbum: this.addAlbumFunction,
      addTrack: this.addTrackFunction,
      getArtistById: this.getArtistByIdFunction,
      getAlbumById: this.getAlbumByIdFunction
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
    if (parameters.length === 3) {
      console.log(
        unqfy.addArtist({ name: parameters[1], country: parameters[2] })
      );
    } else {
      throw new CommandIncompleteError(parameters[0], 2);
    }
  }

  addAlbumFunction(parameters, unqfy) {
    if (parameters.length === 4) {
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
}

module.exports = Command;
