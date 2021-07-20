const util = require('util'); 
const loggly  = require('./Loggly');
const fs = require('fs');
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);


class Logger {

    constructor() {
        this.logs = [];
        loggly.setUpLoggly();
    }

    addLog(event) {
        this.logs.push(event);
    }
    
    async saveLogLocally(event) {
        this.addLog(event);
        const data = await readFilePromise('logs.txt', 'utf-8');
       
        const result = data +` ${new Date().toLocaleString()} MENSAJE: ${event.message} NIVEL: ${event.levelMessage} \n`;
        return writeFilePromise('logs.txt', result);
    }

    saveLogLoggly(event) {
        loggly.saveLogLoggly(event);
    }

}

module.exports = Logger;