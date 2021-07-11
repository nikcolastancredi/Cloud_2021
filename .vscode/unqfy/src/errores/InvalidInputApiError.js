
module.exports= class InvalidInputApiError extends Error{
  constructor(){
    super(`Invalid Input Api Error`);
    this.name= 'InvalidInputApiError';
  }
};