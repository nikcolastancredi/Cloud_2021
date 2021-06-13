class AlbumAlreadyExistsErrorApi extends Error {
    constructor() {
        super("Duplicate Album Error");
        this.status = 409;
        this.errorCode = 'RESOURCE_ALREADY_EXISTS';
    }
}

module.exports = AlbumAlreadyExistsErrorApi; 