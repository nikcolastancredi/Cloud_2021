const EventListener = require('./EventListener');

class LogObserver extends EventListener {

    
    update(eventType, data){
        console.log(`se agrego el artista ${data.name}`);
        //consumo api rest de loggly + guardado local
    }
}

module.exports = LogObserver;