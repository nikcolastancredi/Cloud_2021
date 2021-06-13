// Error personalizado
class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
      super(message || name);
      this.name = name;
      this.status = statusCode;
      this.errorCode = errorCode;
    }
 }
 
 class InvalidInputError extends APIError {
    constructor() {
      super('InvalidInputError', 400, 'INVALID_INPUT_DATA');
    }  
 }
 
 class RelatedResourceNotFound extends APIError {
    constructor() {
      super('RelatedResourceNotFound', 404, 'RELATED_RESOURCE_NOT_FOUND');
    }  
}

    class ResourceNotFound extends APIError {
        constructor() {
          super('ResourceNotFound', 404, 'RESOURCE_NOT_FOUND');
        }  
    
 }

 class BadRequest extends APIError {
    constructor() {
      super('BadRequest', 400, 'BAD_REQUEST');
    }  

}



 module.exports = {InvalidInputError, RelatedResourceNotFound, ResourceNotFound,BadRequest};