const express = require('express');
const log = express();

let active = true;

log.post('/log', (req, res) => {

  if (active) {
    req.logging.saveLogLocally(req.body);
    req.logging.saveLogLoggly(req.body);
    res.status(200);
    res.json(req.body);
  } else{
    res.status(200);
    res.json("El servicio se encuentra desactivado");
  }

});

log.get('/ping', (req, res) => {
  res.status(200).json('ok');
});

log.post('/power', function (req, res) {
  active = !active;
  res.status(200);
  res.json({"status": `active : ${active}`});
});

module.exports = log;