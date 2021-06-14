const express = require('express');
const bodyParser = require('body-parser');
const unq = require("../unqfy"); // importamos el modulo unqfy
const artistDoesNotExistsError = require ('../errores/ArtistDoesNotExistError');
const TrackDoesNotExistsError = require('../errores/TrackDoesNotExistsError');
const artistDoesNotExistsErrorApi = require ('./errorApi/ArtistDoesNotExistsErrorApi');
const artistAlreadyExistsErrorApi = require('./errorApi/ArtistAlreadyExistsErrorApi');
const albumAlreadyExistsErrorApi = require('./errorApi/AlbumAlreadyExistsErrorApi');
const albumDoesNotExistErrorApi = require('./errorApi/AlbumDoesNotExistErrorApi');
const APIError = require('./APIError');
const { Router } = require('express');

const app = express();
const artists = express();
const albums = require('./albumsRoute');
const filename = 'data.json';
const playlists = require('./playlistsRoute');

const unqfy = new unq.UNQfy();


app.use((req, res, next) => {
    req.unqfy = unqfy.getUNQfy();
    next();
});

//middleware que parsea los body de los request y agrega el atributo body al request con el json parseado
app.use(bodyParser.json());// Parsea el JSON y deja el resultado en req.body
app.use(bodyParser.urlencoded({ extended:true }));
app.use(errorHandler); // Registro de un manejador de errores
app.use('/api', artists, albums, playlists) ;

const port = process.env.PORT || 8000;


// router.get('/api' , (req,res) => {
//     res.status(201); //puedo cambiar el status code
//     res.send(JSON.stringify({message: 'welcome to the api'}));
// });

app.listen(
    port,
    () => console.log('Running on port: ' + port)
);


function valid(data, expectedKeys) {
    console.log(data);
    return Object.keys(expectedKeys).every(key => {
        return (typeof data[key]) === expectedKeys[key];
    });

}

function checkValidInput(data, expectedKeys, res, next) {
    if (!valid(data, expectedKeys)) {
        throw next(new APIError.BadRequest());
    }
}


function errorHandler(err, req, res, next) {

    console.error(err); // imprimimos el error en consola
   if (err.type === 'entity.parse.failed'){
      // body-parser error para JSON invalido
      res.status(err.status);
      res.json({status: err.status, errorCode:"BAD_REQUEST"});
    }
    //else if (req.baseUrl!=='/api'){
    //    res.status(err.status);
     //res.json({status: err.status, errorCode: "RESOURCE_NOT_FOUND"});
    //   }
    else {
      next(err); // continua con el manejador de errores por defecto
    }
 }




//------------------------ARTISTAS------------------------//

//POST - agrega un nuevo artista
artists.post('/artists', (req, res, next) => {

    checkValidInput(req.body, { name: 'string', country: 'string' }, res, next);


    let artist = null;
    try {
        artist = req.unqfy.addArtist(req.body);
        req.unqfy.save(filename);
        res.status(201).json(artist);
    } catch (error) {
        if(error.name === 'ArtistExistsError'){
            const err = new APIError.ResourceAlreadyExist();
            res.status(err.status).json(err);
        }else {
            const err = new APIError.BadRequest();
            res.status(err.status).json(err);
        }   
        
    }
});

//GET - obtiene un artista a partir de su ID
artists.get('/artists/:artistId', (req, res, next) => {
    // const artistId = parseInt(req.params.artistId);
    // const artist = req.unqfy.getArtistById(artistId);
    // if (!artist) {
    //     throw next(new artistDoesNotExistsErrorApi());
    // }
    // res.status(200).json(artist);

    const artistId = parseInt(req.params.artistId);
    let artist = null;
    try{
        artist = req.unqfy.getArtistById(artistId);
        res.json(artist);
    } catch(error){
        res.status(404).json( { status: 404, errorCode: 'RESOURCE_NOT_FOUND' });
        // throw next (new artistDoesNotExistsErrorApi().error());
    }

    
});

// artists.get('/artists', (req, res, next) => {
//     const artist = req.unqfy.getArtists();
//         res.status(200).json(artist);
// });



//GET - busca artistas que matchean con param name
artists.get('/artists', (req, res, next) => {
    const name = req.query.name || '';
    if(name){
        const artist = req.unqfy.getArtistByName(name);
        res.status(200).json(artist);
    }else{
    const artist = req.unqfy.getArtists();
    res.status(200).json(artist);
    }
    
});

//UPDATE - actualiza el artista
artists.put('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);
    checkValidInput(req.body, { name: 'string', country: 'string' }, res, next);
    let artist = null;
    try {
        artist = req.unqfy.updateArtist(artistId, req.body);
        req.unqfy.save(filename);
        res.status(200).json(artist);
    } catch (error) {
        throw next(artistDoesNotExistsErrorApi); // poner el error correspondiente
    }

});

//DELETE - borra artista
artists.delete('/artists/:artistId', (req,res,next) => {
    const artistId = parseInt(req.params.artistId);
    // const artist = req.unqfy.getArtistById(artistId);
    try{
        req.unqfy.deleteArtist(artistId);
        req.unqfy.save(filename);
        res.status(204).json();
    }catch (error){
        throw next(artistDoesNotExistsErrorApi); // poner el error correspondiente
    }
});

//GET /api/tracks/:trackId/lyrics
app.get('/api/tracks/:trackId/lyrics',  (req, res, next) => {
    const trackId = parseInt(req.params.trackId);

    req.unqfy.getLyrics(trackId).then(data=>{
        
        if(data.status_code!==200){
            res.status(data.status_code);
        }
        res.status(200).json(JSON.parse(data.message));
        })
        .catch(err=>{
            res.status(404);
            res.json({
                msg: 'RESOURCE_NOT_FOUND',
                error: err,
            });
            
        });
});


exports.checkValidInput = checkValidInput;


