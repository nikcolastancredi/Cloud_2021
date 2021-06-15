const express = require('express');
const playlists = express();
const filename = 'data.json';
const APIError = require('./APIError');


playlists.post('/playlists', (req, res) => {
    
    try{       
        const newPlaylist = req.unqfy.createPlaylist(req.body.name, req.body.genres, req.body.maxDuration);

        req.unqfy.save(filename);
        res.status(201).json(newPlaylist);
    }catch(e){
            res.status(400);
            res.json({errorCode : 'ERROR', errorMessage : e.message});
        }
    }
);

playlists.get('/playlists/:playlistId', (req, res) => {

    try {
        const playlistId = parseInt(req.params.playlistId);
        const playlist = req.unqfy.getPlaylistById(playlistId);
        res.status(200).json(playlist);
    } catch (e) {

        if(e.name === 'PlaylistDoesNotExistsError'){
            const err = new APIError.ResourceNotFound();
            res.status(404);
            res.json(err);
        }else {
            const err = new APIError.BadRequest();
            res.status(err.status).json(err);
        }   
    }
    
});

playlists.delete('/playlists/:playlistId', (req, res) => {

    try {
        const playlistId = parseInt(req.params.playlistId);
        req.unqfy.deletePlaylist(playlistId);
        req.unqfy.save(filename);
        res.status(204).json();
    } catch (e) {
        if(e.name === 'PlaylistDoesNotExistsError'){
            const err = new APIError.ResourceNotFound();
            res.status(404);
            res.json(err);
        }else {
            const err = new APIError.BadRequest();
            res.status(err.status).json(err);
        }
    }
    
});

// playlists.get('/playlists/', (req, res, next) => {
//     const name = req.query.name;
//     const durationLT = req.query.durationLT;
//     const durationGT = req.query.durationGT;
    
//     if (name === undefined | durationLT  === undefined | durationGT === undefined) {
//         const err = new APIError.BadRequest();
//             res.status(400);
//             res.json(err);

//     } else {
//         if (name !== undefined) {
//             const playlists = req.unqfy.searchByName(name).playlists;

//         } else {
            
//         }
//     }

// });

module.exports = playlists;