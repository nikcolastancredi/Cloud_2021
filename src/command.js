const CommandDoesNotExistsError = require("./errores/CommandDoesNotExistsError");
const CommandIncompleteError = require("./errores/CommandDoesNotExistsError");

class Command {

    constructor() {
        this.commandList = {
            addArtist: this.addArtistFunction,
            addAlbum: this.addAlbumFunction,
        };
    }

    execute(params, unqFy) {
        const cmd = params[0];
        if ((cmd in this.commandList)) {
            this.commandList[cmd](params, unqFy);
        } else {

			throw new CommandDoesNotExistsError(params[0]);
        }

    }

    addArtistFunction(parameters, unqfy) {

		//TODO aca habria que validar tambien la longitud de campos. Ver posibilidades de extraer a una funcion auxiliar si es necesario
        console.log(unqfy.addArtist({name: parameters[1], country: parameters[2]}));
    }

    addAlbumFunction(parameters, unqfy) {
		if (parameters.length === 4) {
			
			console.log(unqfy.addAlbum(parseInt(parameters[1]), {name: parameters[2], year: parameters[3]}));
		} else {
			
			throw new CommandIncompleteError(parameters[0], 3);
		}
        
    }
}


module.exports = Command;
