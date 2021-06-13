const badRequest = require('./errorApi/BadRequest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const unq = require("../unqfy"); // importamos el modulo unqfy
const unqfy = new unq.UNQfy();
const artistDoesNotExistsErrorApi = require ('./errorApi/ArtistDoesNotExistsErrorApi');
const artistAlreadyExistsErrorApi = require('./errorApi/ArtistAlreadyExistsErrorApi');
const albumAlreadyExistsErrorApi = require('./errorApi/AlbumAlreadyExistsErrorApi');
const albumDoesNotExistErrorApi = require('./errorApi/AlbumDoesNotExistErrorApi');
const artists = express();
const albums = express();


app.use((req, res, next) => {
    req.unqfy = unqfy.getUNQfy();
    next();
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('/api', artists, albums) ;

const port = process.env.PORT || 8000;


// router.get('/api' , (req,res) => {
//     res.status(201); //puedo cambiar el status code
//     res.send(JSON.stringify({message: 'welcome to the api'}));
// });


app.listen(
    port,
    () => console.log('Esto funciona en puerto : ' + port)
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

artists.post('/artists', (req, res, next) => {

    checkValidInput(req.body, { name: 'string', country: 'string' }, res, next);


    let artist = null;
    try {
        artist = req.unqfy.addArtist(req.body);
        req.unqfy.save();
        res.status(201).json(artist);
    } catch (error) {
        res.status(404).json();
        throw next(artistAlreadyExistsErrorApi);
        
    }
});

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

artists.put('/artists/:artistId', (req, res, next) => {
    const artistId = parseInt(req.params.artistId);
    checkValidInput(req.body, { name: 'string', country: 'string' }, res, next);
    let artist = null;
    try {
        artist = req.unqfy.updateArtist(artistId, req.body);
        req.unqfy.save();
        res.status(200).json(artist);
    } catch (error) {
        throw next(artistDoesNotExistsErrorApi); // poner el error correspondiente
    }

});

artists.delete('/artists/:artistId', (req,res,next) => {
    const artistId = parseInt(req.params.artistId);
    // const artist = req.unqfy.getArtistById(artistId);
    try{
        req.unqfy.deleteArtist(artistId);
        req.unqfy.save();
        res.status(204).json();
    }catch (error){
        throw next(artistDoesNotExistsErrorApi); // poner el error correspondiente
    }
});


albums.post('/albums', (req, res, next) => {
    checkValidInput(req.body, { artistId: 'number', name: 'string', year: 'number' }, res, next);
    const params = req.body;

    const albumParam = { name: params.name, year: params.year };

    const existArtist = req.unqfy.getArtistById(params.artistId);
    const existAlbum = req.unqfy.getAlbumByName(params.name);

    if (!existArtist) {
        throw next(new artistAlreadyExistsErrorApi());
    }
    else if (existAlbum) {
        throw next(new albumAlreadyExistsErrorApi());
    }

    const newAlbum = req.unqfy.addAlbum(params.artistId, albumParam);
    req.unqfy.save();
    res.status(201).json(newAlbum);
});

albums.get('/albums/:albumId', (req, res, next) => {
    const albumId = parseInt(req.params.albumId);
    const album = req.unqfy.getAlbumById(albumId);
    if (!album) {
        throw next(new albumDoesNotExistErrorApi());
    }
    res.status(200).json(album);
});



albums.get('/albums/', (req, res, next) => {
    const name = req.query.name || '';
    if(name){
        const albums = req.unqfy.getAlbumByName(name);
        res.status(200).json(albums);
    }else{
    const albums = req.unqfy.getAllAlbums();
    res.status(200).json(albums);
    }
    
});