// Error personalizado
class APIError extends Error {
    constructor(statusCode, errorCode, message = null) {
      super(message);
      this.status = statusCode;
      this.errorCode = errorCode;
    }
 }
 
 class InvalidInputError extends APIError {
    constructor() {
      super(400, 'INVALID_INPUT_DATA');
    }  
 }
 
 class RelatedResourceNotFound extends APIError {
    constructor() {
      super( 404, 'RELATED_RESOURCE_NOT_FOUND');
    }  
}

    class ResourceNotFound extends APIError {
        constructor() {
          super(404, 'RESOURCE_NOT_FOUND');
        }  
    
 }

 class BadRequest extends APIError {
    constructor() {
      super(400, 'BAD_REQUEST');
    }  
}

class ResourceAlreadyExist extends APIError {
  constructor() {
    super(409, 'RESOURCE_ALREADY_EXISTS');
  }  
}

 module.exports = {InvalidInputError, RelatedResourceNotFound, ResourceNotFound,BadRequest, ResourceAlreadyExist};