// Error personalizado
class APIErrorAbstract extends Error {
    constructor(statusCode, errorCode, message = null) {
      super(message);
      this.status = statusCode;
      this.errorCode = errorCode;
    }
 }
 
 class InvalidInputError extends APIErrorAbstract {
    constructor() {
      super(400, 'INVALID_INPUT_DATA');
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

class ResourceAlreadyExist extends APIErrorAbstract {
  constructor() {
    super(409, 'RESOURCE_ALREADY_EXISTS');
  }  
}

 module.exports = {APIErrorAbstract, InvalidInputError, RelatedResourceNotFound, ResourceNotFound,BadRequest, ResourceAlreadyExist};