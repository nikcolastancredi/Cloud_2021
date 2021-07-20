
module.exports = class EventManager {

    constructor() {
        const operations = ["addAlbum", "addTrack", "addArtist", "deleteAlbum", "deleteTrack", "deleteArtist"];
        this.listeners = {};
        operations.forEach(o => this.listeners[o] = []);
        
    }

    subscribe(eventType, listener) {
        this.listeners[eventType].push(listener);
    }

    notify(eventType, ...data) {
        this.listeners[eventType].forEach(observer => observer.update(eventType, data));
    }
};

