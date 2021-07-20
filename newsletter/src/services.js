const express = require('express');
const bodyParser = require('body-parser');
//const { subscribe } = require('../../unqfy/src/app/artistsRoute.js');
const APIError = require('../errores/APIError'); 
const errorHandler = require('./handleErrors');
const  SubscriptionsManager = require( './subscriptionsManager');

const subsManager = new SubscriptionsManager();
const app = express();

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

  


//POST /api/subscribe
app.post('/api/subscribe', bodyParser.json(),async (req,res,next) => {
try {
    checkValidInput(req.body, { artistId: 'number', email: 'string' });
     await subsManager.addSubscriber(req.body.artistId, req.body.email);//
    res.status(200);
    res.send();
} catch (error) {
    if(error.name === 'ArtistDoesNotExistError'){
        next(new APIError.RelatedResourceNotFound());
    }else {
        next(error);
    }
}
});


//POST /api/unsubscribe
app.post('/api/unsubscribe', bodyParser.json(),async (req,res,next) => {
    try {
        checkValidInput(req.body, { artistId: 'number', email: 'string' });
        await subsManager.removeSubscriber(req.body.artistId, req.body.email);//
        res.status(200);
        res.send();
    } catch (error) {
        if(error.name === 'ArtistDoesNotExistError'){
            next(new APIError.RelatedResourceNotFound());
        }else {
            next(error);
        }
    
    }
});


//POST /api/notify
app.post('/api/notify', bodyParser.json(), (req,res,next) => {
    try {
        checkValidInput(req.body, { artistId: 'number', subject: 'string', message:'string' });
        //mandar mail a los suscriptores
         subsManager.sendNotifications(req.body.artistId, req.body.subject, req.body.message );
        res.status(200);
        res.send();
    } catch (error) {
        if(error.name === 'ArtistDoesNotExistError'){
            next(new APIError.RelatedResourceNotFound());
        }else {
            next(error);
        }
    }
});



//GET /api/subscriptions?artistId=<artistID>
//obtiene todos los suscriptores para el artista <artistID> chequea usando API de Unqfy que el artista existe
app.post('/api/subscriptions', bodyParser.json(),async  (req,res,next) => {
    try { 
        checkValidInput(req.query, { artistId: 'string' });
        const artistID = parseInt(req.query.artistId);
        const  subscribers  = await subsManager.getAllSubscribers(artistID);
        res.status(200).json({
            'artistId': artistID,
            'subscribers': subscribers
        });
        res.send();
    } catch (error) {
        if(error.name === 'ArtistDoesNotExistError'){
            next(new APIError.RelatedResourceNotFound());
        }else {
            next(error);
        }
    
    }
});



//DELETE /api/subscriptions

//Elimina todos los emails suscritos a un artista <artistID>// chequea usando API de Unqfy que el artista existe
app.delete('/api/subscriptions', bodyParser.json(),async  (req,res,next) => {
    try { 
        checkValidInput(req.body, { artistId: 'number' });

        const artistID = req.body.artistId;
        await subsManager.removeAllSubscriptions(artistID);
        res.status(200);
        res.send();
    } catch (error) {
        if(error.name === 'ArtistDoesNotExistError'){
            next(new APIError.RelatedResourceNotFound());
        }else {
            next(error);
        }
    
    }
});


app.get('/api/ping', function (req, res) {
    res.status(200);
    res.json("pong");
  });



app.use(bodyParser.json());// Parsea el JSON y deja el resultado en req.body
app.use(bodyParser.urlencoded({ extended:true }));

const port = process.env.PORT || 8087;

app.use(errorHandler); 

app.use((req, res, next) => {
    next(new APIError.ResourceNotFound());
});

app.listen(port, () => 
  console.log('Running on port: ' + port)
);




