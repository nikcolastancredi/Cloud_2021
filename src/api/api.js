const badRequest = require('./badRequest');
const express = require('express');
const bodyParser = require('body-parser');
const unq = require("../unqfy"); // importamos el modulo unqfy
const artistDoesNotExistsError = require ('../errores/ArtistDoesNotExistError');
const TrackDoesNotExistsError = require('../errores/TrackDoesNotExistsError');

const APIError = require('./APIError');

const unqfy = new unq.UNQfy();
const app = express();


app.use((req, res, next) => {
    req.unqfy = unqfy.getUNQfy();
    next();
});

//middleware que parsea los body de los request y agrega el atributo body al request con el json parseado
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


const port = process.env.PORT || 8000;
const router = express.Router();



router.get('/' , (req,res) => {
    res.status(201); //puedo cambiar el status code
    res.send(JSON.stringify({message: 'welcome to the api'}));
});

app.use('/', router) ;

app.listen(
    port,
    () => console.log('Esto funciona en puerto : '+ port)
);


function valid(data, expectedKeys) {
    console.log(data);
    return Object.keys(expectedKeys).every(key => {
        return (typeof data[key]) === expectedKeys[key];
    });

}

function checkValidInput(data, expectedKeys, res, next) {
    if (!valid(data, expectedKeys)) {
        throw next(new badRequest());
    }
}

app.post('/artists', (req, res, next) => {

    checkValidInput(req.body, { name: 'string', country: 'string' }, res, next);

    let artist = null;
    try {
        artist = req.unqfy.addArtist(req.body);
        req.unqfy.save('data.json');
        res.status(201).json(artist);
    } catch (error) {
        throw next(error);
    }
});

app.get('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);

    const artist = req.unqfy.getArtistById(artistId);

    if (!artist) {
        throw next(new artistDoesNotExistsError());
    }
    res.status(200).json(artist);
});


app.get('/tracks/:trackId/lyrics',  (req, res, next) => {
    const trackId = parseInt(req.params.trackId);

    req.unqfy.getLyrics(trackId).then(data=>{
        res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404);
            res.json({
                msg: 'RESOURCE_NOT_FOUND',
                error: err,
            });
            
        });
});


