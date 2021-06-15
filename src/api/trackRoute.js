const express = require('express');
const APIError = require('./APIError');
const api = require('./api');
const filename = 'data.json';
const track = express();


track.get('/tracks/:trackId/lyrics',  (req, res) => {
    const trackId = parseInt(req.params.trackId);
    req.unqfy.getLyrics(trackId).then(resp=>{
        const track = req.unqfy.getTrackById(trackId);
        if(resp.status_code===200){
            const letra = {
                Name: track.name,
                lyrics: resp.body
            };
        res.status(200).json(letra);
        } else {
            throw new APIError.RelatedResourceNotFound();
        }
        })
        .catch(err=>{
            res.status(404);
            res.json({
                status: 404,
                errorCode: 'RESOURCE_NOT_FOUND'
            });

        });
});


module.exports = track;