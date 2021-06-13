class BadRequest extends Error {
    constructor() {
        super("Bad Request Error");
        this.status = 400;
        this.errorCode = 'BAD_REQUEST';
    } 
}

module.exports = BadRequest;