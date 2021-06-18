const express = require('express');
const albums = express();
const APIError = require('./APIError');
const api = require('./api');
const filename = 'data.json';

//-------------------------ALBUMS-------------------------//

//POST - agrega un album a un artista
albums.post('/albums', (req, res, next) => {
    
    const params = req.body;

    const albumParam = { name: params.name, year: params.year };

    try {
        api.checkValidInput(req.body, { artistId: 'number', name: 'string', year: 'number' });
        const album = req.unqfy.addAlbum(params.artistId, albumParam);
        req.unqfy.save(filename);
        res.status(201).json(album);
    } catch (error) {
        if(error.name === 'ArtistDoesNotExistsError'){
           next(new APIError.RelatedResourceNotFound());
        }else if(error.name === 'AlbumAlreadyExistsError'){
            next(new APIError.ResourceAlreadyExist());
        }else {
            next(error);
        }   
        
    }
});


//GET - Obtiene un album a partir de un Id
albums.get('/albums/:albumId', (req, res, next) => {
      try {
        const album = req.unqfy.getAlbumById(parseInt(req.params.albumId));
        req.unqfy.save(filename);
        res.status(200).json(album);
    } catch (error) {
        if(error.name === 'AlbumDoesNotExistError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }   
        
    }
});


//GET - Busca albums a partir de param Name
albums.get('/albums/', (req, res) => {
    const name = req.query.name || '';
    if(name){
        const albums = req.unqfy.getAlbumByName(name);
        res.status(200).json(albums);
    }else{
    const albums = req.unqfy.getAllAlbums();
    res.status(200).json(albums);
    }

});


//DELETE - borra un album por id
albums.delete('/albums/:albumId', (req, res, next) => {
    try {
        const album = req.unqfy.deleteAlbum(parseInt(req.params.albumId));
        req.unqfy.save(filename);
        res.status(204).json(album);
    } catch (error) {
        if(error.name === 'AlbumDoesNotExistError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }  
        
    }
});

//actualiza el año de un album
albums.patch('/albums/:albumId', (req, res, next) => {

    const albumId = parseInt(req.params.albumId);
    const newYear = req.body.year;

    try{
        const albumSearch = req.unqfy.getAlbumById(albumId);
        albumSearch.setYear(newYear);
        req.unqfy.save(filename);
        res.status(200).json(albumSearch);
    }catch (error){

        if(error.name === 'AlbumDoesNotExistError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }    
            }

});

module.exports = albums;