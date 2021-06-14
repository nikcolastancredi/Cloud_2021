const express = require('express');
const bodyParser = require('body-parser');
const unq = require("../unqfy"); // importamos el modulo unqfy
const APIError = require('./APIError');
const invalidInput = require('../errores/InvalidInputApiError');
// const { Router } = require('express');

const app = express();
const artists = require('./artistsRoute');
const albums = require('./albumsRoute');
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

function checkValidInput(data, expectedKeys, res) {
  if (!valid(data, expectedKeys)) {
      const err = new APIError.BadRequest();
      res.status(err.status).json(err);
      throw new invalidInput();
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
 
exports.checkValidInput = checkValidInput;


