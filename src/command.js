const CommandDoesNotExistsError = require("./errores/CommandDoesNotExistsError");

class Command {

    constructor() {
        this.commandList = {
            addArtist: this.addArtistFunction,
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

        console.log(unqfy.addArtist({name: parameters[1], country: parameters[2]}));
    }
}


module.exports = Command;
