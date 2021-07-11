let express = require('express');
let app = express(); //definicion de la app usando express
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;
let router = express.Router();      
//----------------------------------------------------------------//

router.get('/' , (req,res) => {
    res.status(201); //puedo cambiar el status code
res.send(JSON.stringify({message: 'welcome to the api'}));
});

//Registro de rutas

app.use('/api', router) ;

app.listen(
    port,
    () => console.log('esto funciona en puerto : '+port)
);


//