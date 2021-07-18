const express = require('express');
const log = express();

log.post('/log', (req, res) => {
  req.logging.saveLogLocally(req.body);
  req.logging.saveLogLoggly(req.body);
  res.status(200);
  res.json(req.body);
});

log.get('/ping', (req, res) => {
  res.status(200).json('ok');
});

module.exports = log;