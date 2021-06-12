/* eslint-disable no-unused-vars */
const fs = require('fs'); // para cargar/guarfar unqfy
const path = require('path');
const pathCreds = './src/oAuthService';
const rp = require('request-promise');
const BASE_URL = 'https://api.spotify.com/v1/';

class SpotifyCliente {
    constructor(){
        this.opcions = this.getOptionsRequest();
    }

    // getOptionsRequest(){
    //     return ;
    // }

    // // async getAlbumsArtistByName(artistName){
    // //     return ;
    // // }

    // async searchArtistByName(artistName){
    //     return ;
    // }

    // async getAlbumsByArtistId(artistId){
    //     return ; 
    // }

}

module.exports = {
    SpotifyCliente: SpotifyCliente,
};