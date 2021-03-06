const express = require('express');
const users = express();
const APIError = require('./APIError');
const api = require('./api');
const filename = 'data.json';

//-------------------------Users-------------------------//


//POST - agrega un nuevo usuario
users.post('/users', (req, res, next) => {    
    
    try {
        api.checkValidInput(req.body, { name: 'string' });
        const newUser = req.unqfy.addUser(req.body);
        req.unqfy.save(filename);
        res.status(201).json(newUser);
    } catch (error) {
        if(error.name === 'UserAlreadyExistsError'){
            next(new APIError.ResourceAlreadyExist());
        }else {
            next(error);
        }   
        
    }
});

//POST : Agregar un track a la lista de escuchados de un usuario
users.post('/users/listenings', (req, res, next) => {

    try {
        api.checkValidInput(req.body, { userId: 'string', trackId: 'string' }, res);
        const iDUser = parseInt(req.body.userId);
        const iDTrack = parseInt (req.body.trackId); 
        req.unqfy.playTrack(iDUser, iDTrack);
        const user = req.unqfy.getUserById(iDUser);
        req.unqfy.save(filename);
        res.status(201).json(user);
    } catch (error) {
        if(error.name === 'UserDoesNotExistsError' || error.name === 'TrackDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }

    }
});


//GET - obtiene un usuario a partir de su ID
users.get('/users/:userId', (req, res, next) => {
    const userId = parseInt(req.params.userId);
    try{
        const userSearch = req.unqfy.getUserById(userId);
        res.json(userSearch);
    } catch(error){

        if(error.name === 'UserDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }
    }
});

//GET - busca usuarios que matchean con param name
users.get('/users', (req, res, next) => {
    const name = req.query.name || '';
    if(name){
        try{

            const usersSearch = req.unqfy.getUsersByName(name);
            res.status(200).json(usersSearch);

        }catch(error){
                
            if(error.name === 'UserDoesNotExistsError'){
               next(new APIError.ResourceNotFound());
            }else {
                next(error);
            }
        }
        
    }else{
        const allUsers = req.unqfy.users;
        res.status(200).json(allUsers);

        }
    
});

//UPDATE - actualiza el artista
users.put('/users/:usersId', (req, res, next) => {
    const usersId = parseInt(req.params.usersId);
    
    try {
        api.checkValidInput(req.body, { name: 'string' });
        const newUser = req.unqfy.updateUser(usersId, req.body);
        req.unqfy.save(filename);
        res.status(200).json(newUser);

    } catch (error) {

        if(error.name === 'UserDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }    

    }

});

//DELETE - borra un usuario
users.delete('/users/:userId', (req,res, next) => {
    const userId = parseInt(req.params.userId);
    
    try{

        req.unqfy.deleteUser(userId);
        req.unqfy.save(filename);
        res.status(204).json();

    } catch (error){

        if(error.name === 'UserDoesNotExistsError'){
            next(new APIError.ResourceNotFound());
        }else {
            next(error);
        }    
    }
});

module.exports = users;