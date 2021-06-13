class ArtistDoesNotExistsErrorApi extends Error {
    constructor() {
        super(" Artist Does Not Exists Error");
        this.status = 404;
        this.errorCode = 'RESOURCE_NOT_FOUND';
    }

    error(){
        return { status: 404, errorCode: 'RESOURCE_NOT_FOUND' }
    }
}

module.exports = ArtistDoesNotExistsErrorApi; 