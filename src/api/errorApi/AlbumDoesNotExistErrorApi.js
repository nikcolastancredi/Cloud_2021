
class AlbumDoesNotExistErrorApi extends Error {
    constructor() {
        super(" Album Error Not Exist");
        this.status = 409;
        this.errorCode = 'RESOURCE_ALREADY_EXISTS';
    }
}

module.exports = AlbumDoesNotExistErrorApi; 