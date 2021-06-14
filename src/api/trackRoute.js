const express = require('express');
const APIError = require('./APIError');
const api = require('./api');
const filename = 'data.json';
const track = express();


track.get('/tracks/:trackId/lyrics',  (req, res) => {
    const trackId = parseInt(req.params.trackId);

    req.unqfy.getLyrics(trackId).then(resp=>{
        if(resp.status_code===200){
        res.status(200).json(resp.body);
        } else {
            throw new Error("LyricsNotFound","LyricsNotFound");
        }
        })
        .catch(err=>{
            res.status(404);
            res.json({
                msg: 'RESOURCE_NOT_FOUND',
                error: err.message,
            });

        });
});


module.exports =  track;