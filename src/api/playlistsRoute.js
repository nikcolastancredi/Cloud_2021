const express = require('express');
const playlists = express();
const filename = 'data.json';

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
            res.status(404);
            res.json({status: 404, errorCode: 'RESOURCE_NOT_FOUND', errorMessage : e.message});
        }
        
    }
    
});

module.exports = playlists;