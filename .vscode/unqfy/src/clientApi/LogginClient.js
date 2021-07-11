const rp = require('request-promise');

class LogginClient {
    constructor() {
        this.options = this.getOptionsRequest();
    }

}

module.exports = LogginClient;