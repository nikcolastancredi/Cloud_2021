const rp = require('request-promise');

class ClientDiscordHook {
    constructor() {
        this.options = this.getOptionsRequest();
    }

    getOptionsRequest() {
        const options = {
            uri: 'https://discord.com/api/webhooks/866861852381675550/aAXXKPzRFd-bmE-WkM948GB3-BXr4OtbPEUwIRIcxSkn9_NFATteu2lWiUPQG139hYAs',
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