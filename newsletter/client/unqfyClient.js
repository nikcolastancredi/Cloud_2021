const { request } = require('express');
const rp = require('request-promise');
const BASE_URL = 'http://localhost:8000';
const artistError = require('../errores/ArtistDoesNotExistError');

class UnqfyClient {
    
    constructor() {
    }
        
      getArtist(artistId) {
        let options = {

            uri: BASE_URL + `/artists/${artistId}`,
            json: true,

        }

        return  rp.get(
            options)
            .then( request=>{
                return request }
            ).catch(err=>{
                throw new artistError;}
        )

    }




}

module.exports =  UnqfyClient ;