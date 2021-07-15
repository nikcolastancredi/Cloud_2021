const rp = require('request-promise');

class ClientDiscordHook {
    constructor() {
        this.options = this.getOptionsRequest();
    }

    getOptionsRequest() {
        const options = {
            uri: 'https://discord.com/api/webhooks/862705748886421506/hXOz5FgVT9cd-LqgMQ3bnwu7vyjQZSBkHL1MkXFLkkiHVn6naQJYXzkTBnsXAE7--1it',
            json: true,
            body: null
        };
        return options;
    }

    notify(message) {
        this.options.body = { content: message};
        rp.post(this.options)
    }
}

module.exports = {
    ClientDiscordHook: ClientDiscordHook,
};