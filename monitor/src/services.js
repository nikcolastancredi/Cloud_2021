const express = require('express');
const bodyParse = require('body-parser');
const port = process.env.PORT || 8085;
const app = express();
const ClientAPI = require('../client/ClientAPI');
const ClientAPIInstance = new ClientAPI.ClientAPI();
const ClientDiscordHook = require('../client/ClientDiscordHook');
const ClientDiscordHookInstance = new ClientDiscordHook.ClientDiscordHook();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.listen(port, () => console.log('Listening on ' + port));

const services = [
    { name: 'unqfy', uri: process.env.API_UNQFY, state: 'offline', lastState: null, time: new Date().getTime() },
    { name: 'loggin', uri: process.env.API_LOGGIN, state: 'offline', lastState: null, time: new Date().getTime() },
    { name: 'newsletter', uri: process.env.API_NEWSLETTER, state: 'offline', lastState: null, time: new Date().getTime() }
]

// const services = [
//     { name: 'unqfy', uri: 'http://localhost:8000', state: 'offline', lastState: null, time: new Date().getTime() },
//     { name: 'loggin', uri: 'http://localhost:8086', state: 'offline', lastState: null, time: new Date().getTime() },
//     { name: 'newsletter', uri: 'http://localhost:8087', state: 'offline', lastState: null, time: new Date().getTime() }
// ]


console.log('Monitor activado');
let interval = setInterval(checkServicesStatus, 5000)

 function checkServicesStatus() {
    services.forEach(
        service => {
            ClientAPIInstance.check(service.uri).then(
                reponse => service.state = 'online'

            ).catch(
                response => service.state = 'offline'
            ).then(
                response => {
                    service.time = new Date().getTime();
                    notify(service);
                }
            )
        }
    )
}

function notify(service) {
    if (service.lastState !== service.state) {
        console.log(`[${new Date(service.time).toLocaleTimeString()}] 
        El servicio ${service.name} se encuentra ${service.state}`);
        ClientDiscordHookInstance.notify(`[${new Date(service.time).toLocaleTimeString() }] El servicio ${service.name} se encuentra ${service.state}`);
        service.lastState = service.state;
    }
}

function shutdownInterval() {
    console.log('Monitor desactivado');
    clearInterval(interval);
}

function setIntervalOn() {
    console.log('Monitor activado');
    interval = setInterval(checkServicesStatus, 5000)
}

app.get('/api/shutdown', function (req, res) {
    shutdownInterval()
    res.status(200);
    res.json("Monitor desactivado");
});

app.get('/api/poweron', function (req, res) {
    setIntervalOn()
    res.status(200);
    res.json("Monitor activado");
});

app.get('/api/status', function (req, res) {
    res.status(200);
    res.json(services);
});