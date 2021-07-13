const express = require('express');
const bodyParser = require('body-parser');
const unq = require("../unqfy"); // importamos el modulo unqfy
const APIError = require('./APIError');
const errorHandler = require('./handleErrors');

// const { Router } = require('express');

const app = express();
const artists = require('./artistsRoute');
const albums = require('./albumsRoute');
const playlists = require('./playlistsRoute');
const tracks = require('./trackRoute');
const users = require('./usersRoute');
const newsletter = require('./newsletterRoute');

const unqfy = new unq.UNQfy();


app.use((req, res, next) => {
    req.unqfy = unqfy.getUNQfy();
    next();
});

//middleware que parsea los body de los request y agrega el atributo body al request con el json parseado
app.use(bodyParser.json());// Parsea el JSON y deja el resultado en req.body
app.use(bodyParser.urlencoded({ extended:true }));
app.use('/api', artists, albums, playlists,tracks,users,newsletter ) ;

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    next(new APIError.ResourceNotFound());
});

app.use(errorHandler); // Registro de un manejador de errores

app.listen(port, () => 
  console.log('Running on port: ' + port)
);



function valid(data, expectedKeys) {
  console.log(data);
  return Object.keys(expectedKeys).every(key => {
      return (typeof data[key]) === expectedKeys[key];
  });

}

function checkValidInput(data, expectedKeys) {
  if (!valid(data, expectedKeys)) {
    throw new APIError.BadRequest();
  }
}

 
exports.checkValidInput = checkValidInput;


