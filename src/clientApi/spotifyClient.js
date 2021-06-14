const rp = require('request-promise');
const API_URL = 'https://api.spotify.com/v1/';
const spotifyCredentials = require('../../spotifyCreds.json');

class SpotifyClient {
    constructor() {
        this.options = this.reqOptions();
    }

    reqOptions() {
        const credentials = spotifyCredentials.access_token;
        const options = {
            url: null, 
            headers: { Authorization: 'Bearer ' + credentials }, 
            json: true
        };
        return options;
    }

    async getAlbums(artistName) {
        const artist = await this.getArtistIdByName(artistName);
        const albums = await this.getAlbumsByArtistId(artist.id);
        return albums;
    }

    getArtistIdByName(artistName) {
        this.options.url = API_URL + `search?query=${artistName}&type=artist`;
        return rp.get(this.options).then(response => response.artists.items.shift());
    }

    getAlbumsByArtistId(artistId) {
        this.options.url = API_URL + `artists/${artistId}/albums`;
        return rp.get(this.options).then(response => response.items);
    }
}

module.exports = {
    SpotifyClient: SpotifyClient,
};