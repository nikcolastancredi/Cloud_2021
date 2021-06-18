const express = require('express');
const artists = express();
const APIError = require('./APIError');
const api = require('./api');
const filename = 'data.json';


//-------------------------ARTISTA-------------------------//


//POST - agrega un nuevo artista
artists.post('/artists', (req, res, next) => {    
    
    try {
        api.checkValidInput(req.body, { name: 'string', country: 'string' });
        const newArtist = req.unqfy.addArtist(req.body);
        req.unqfy.save(filename);
        res.status(201).json(newArtist);
    } catch (error) {
        if(error.name === 'ArtistExistsError'){
           next(new APIError.ResourceAlreadyExist());
        }else {
            next(error);
        }   
        
    }
});


//GET - obtiene un artista a partir de su ID
artists.get('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);
    try{
        const artistSearch = req.unqfy.getArtistById(artistId);
        res.json(artistSearch);
    } catch(error){

        if(error.name === 'ArtistDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }
    }

    
});

//GET - busca artistas que matchean con param name
artists.get('/artists', (req, res, next) => {
    const name = req.query.name || '';
    if(name){
        try{

            const artist = req.unqfy.getArtistByName(name);
            res.status(200).json(artist);

        }catch(error){
                
            if(error.name === 'ArtistDoesNotExistsError'){
               next(new APIError.ResourceNotFound());
            }else {
                next(error);
            }
        }
        
    }else{
        const allArtists = req.unqfy.getArtists();
        res.status(200).json(allArtists);

        }
    
});

//UPDATE - actualiza el artista
artists.put('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);
    
    try {
        api.checkValidInput(req.body, { name: 'string', country: 'string' });
        const artist = req.unqfy.updateArtist(artistId, req.body);
        req.unqfy.save(filename);
        res.status(200).json(artist);

    } catch (error) {

        if(error.name === 'ArtistDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }    

    }

});

//DELETE - borra artista
artists.delete('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);
    
    try{

        req.unqfy.deleteArtist(artistId);
        req.unqfy.save(filename);
        res.status(204).json();

    }catch (error){

        if(error.name === 'ArtistDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }
    }
});

module.exports = artists;
