const express = require('express');
const playlists = express();
const filename = 'data.json';
const APIError = require('./APIError');
const api = require('./api');

playlists.post('/playlists', (req, res, next) => {
    
    if (req.body.tracks === undefined){
        try{       
            api.checkValidInput(req.body, { name: 'string', genres: 'object', maxDuration: 'number' });
            const newPlaylist = req.unqfy.createPlaylist(req.body.name, req.body.genres, req.body.maxDuration);
            req.unqfy.save(filename);
            res.status(201).json(newPlaylist);
        }catch(error){
            next(error);
        }   
    } else {
        
        try{       
            api.checkValidInput(req.body, { name: 'string', tracks: 'object' });
            const newPlaylist = req.unqfy.createPlaylistWithTracks(req.body.name, req.body.tracks);
            req.unqfy.save(filename);
            res.status(201).json(newPlaylist);
        }catch(error){
            if(error.name === 'TrackDoesNotExistsError'){
                next(new APIError.ResourceNotFound());
            }else {
                next(error);
            }   
        }

    }
});

playlists.get('/playlists/:playlistId', (req, res, next) => {

    try {
        const playlistId = parseInt(req.params.playlistId);
        const playlist = req.unqfy.getPlaylistById(playlistId);
        res.status(200).json(playlist);
    } catch (error) {

        if(error.name === 'PlaylistDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }   
    }
    
});

playlists.delete('/playlists/:playlistId', (req, res, next) => {

    try {
        const playlistId = parseInt(req.params.playlistId);
        req.unqfy.deletePlaylist(playlistId);
        req.unqfy.save(filename);
        res.status(204).json();
    } catch (error) {
        if(error.name === 'PlaylistDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }
    }
    
});

playlists.get('/playlists/', (req, res) => {
    const name = req.query.name;
    const durationLT = req.query.durationLT;
    const durationGT = req.query.durationGT;
    
    const playlists = req.unqfy.getPlaylists();
    let filterByName;
    let filterByGT;
    let filterByLT;
    let listToReturn;

    if (name === undefined & durationLT === undefined & durationGT === undefined) {
        res.status(200).json(playlists);
    } else{
        if (playlists.lenght === 0) {
            res.status(200).json(playlists);
        } else{
            listToReturn = playlists;
            if (name !== undefined) {
                filterByName = playlists.filter((playlist) => playlist.getName().toLowerCase().includes(name));
                listToReturn = filterByName;
            }
            if (durationLT !== undefined) {
                filterByLT = listToReturn.filter((playlist) => playlist.getDuration() < durationLT);
                listToReturn = filterByLT;
            }
            if (durationGT !== undefined) {
                filterByGT = listToReturn.filter((playlist) => playlist.getDuration() > durationGT);
                listToReturn = filterByGT;
            }
            res.status(200).json(listToReturn);
        }

    }

});

module.exports = playlists;