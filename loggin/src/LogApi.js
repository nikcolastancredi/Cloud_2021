require('dotenv').config()
const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const port = process.env.PORT || 5002;
const Logger = require('./Logger');
const loggerInstance = new Logger();
const LogRoute = require('./LogRoute')

app.use((req, res, next) => {
    req.logging = loggerInstance;
    next();
});

function invalidJson(err, req, res, next) {
    if (err) {
        res.status(400);
        res.json({ status: 400, errorCode: "BAD_REQUEST" });
    }
}

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use('/api', LogRoute);
app.use(invalidJson);

app.listen(port, () => console.log('Listening on ' + port));