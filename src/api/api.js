const badRequest = require('./badRequest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const unq = require("../unqfy"); // importamos el modulo unqfy
const unqfy = new unq.UNQfy();
const artistDoesNotExistsError = require ('../errores/ArtistDoesNotExistError');

app.use((req, res, next) => {
    req.unqfy = unqfy.getUNQfy();
    next();
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


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





