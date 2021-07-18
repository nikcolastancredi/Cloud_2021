require('dotenv').config()
var winston  = require('winston');
var {Loggly} = require('winston-loggly-bulk');

function setUpLoggly() {
winston.add(new Loggly({
    token: "4660e863-9c43-431a-94a7-7546af5d7225",
    subdomain: "nahuelunq",
    tags: ["Winston-NodeJS"],
    json: true
}));
}

function saveLogLoggly(event) {
    winston.log(event.levelMessage, event.message);
}

module.exports = {
    setUpLoggly,
    saveLogLoggly
};