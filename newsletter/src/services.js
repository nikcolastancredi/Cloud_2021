const express = require('express');
const newsletter = express();
//const APIError = require('../../unqfy/src/api/APIError');  TODO CAMBIAR MANEJO  DE ERRORES
//const api = require('../../unqfy/src/api/api');

const subsContainer = require('./subscriptionsContainer');



//POST /api/subscribe
newsletter.post('/subscribe', (req,res,next) => {
try {
    api.checkValidInput(req.body, { name: 'string' });
    subsContainer.addSubscriber(req.body);//
    res.status(200);
} catch (error) {
    if(error.name === 'ArtistDoesNotExistError'){
        next(new APIError.ResourceNotFound());
    }else {
        next(error);
    }   
    
}
});


//POST /api/unsubscribe
newsletter.post('/unsubscribe', (req,res,next) => {

});


//POST /api/notify
newsletter.post('/notify', (req,res,next) => {

});