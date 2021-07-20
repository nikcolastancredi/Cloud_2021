const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const rp = require('request-promise');

const EventListener = require('./EventListener');

class LogObserver extends EventListener {

    constructor() {
        super();
        this.options = {};
    }

    update(eventType, data) {
        const options = {
            uri: process.env.API_LOGGIN + '/api/log',
            body: null,
            json: true
        };
        this.options = options;
        if(data[0] instanceof  Error){
            this.options.body = {
                message: `Se intento realizar el siguiente evento: ${eventType} con los siguientes datos ${JSON.stringify(data)} y arrojo el error ${JSON.stringify(data[0])}`,
                levelMessage: 'error'};
        } else{
            this.options.body = {
            message: `Se realizo el siguiente evento: ${eventType} con los siguientes datos ${JSON.stringify(data)}`,
            levelMessage: 'info'};
        }
        rp.post(this.options)
        .then(() => console.log('Enviado a LogApi'))
        .catch(() => console.log('error de envio a LogApi'));
    }
}

module.exports = LogObserver;