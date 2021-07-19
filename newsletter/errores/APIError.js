// Error personalizado
class APIErrorAbstract extends Error {
    constructor(statusCode, errorCode, message = null) {
      super(message);
      this.status = statusCode;
      this.errorCode = errorCode;
    }
 }
 
 class RelatedResourceNotFound extends APIErrorAbstract {
    constructor() {
      super( 404, 'RELATED_RESOURCE_NOT_FOUND');
    }  
}

    class ResourceNotFound extends APIErrorAbstract {
        constructor() {
          super(404, 'RESOURCE_NOT_FOUND');
        }  
    
 }

 class BadRequest extends APIErrorAbstract {
    constructor() {
      super(400, 'BAD_REQUEST');
    }  
}


 module.exports = {APIErrorAbstract, RelatedResourceNotFound, ResourceNotFound,BadRequest};