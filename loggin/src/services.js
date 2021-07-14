// imports
const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
var methodOverride = require('method-override');
const port = process.env.PORT || 8086;
const app = express();


let serviceEnable = true;

var winston  = require('winston');
var {Loggly} = require('winston-loggly-bulk');
winston.add(new Loggly({
    token: "2477b6db-48a6-46e7-924e-3afaf74e79e3",
    subdomain: "nikcolas",
    tags: ["Winston-NodeJS"],
    json: true
}));
winston.log('info', "Hello World from Node.js!");

var log4js = require("log4js");