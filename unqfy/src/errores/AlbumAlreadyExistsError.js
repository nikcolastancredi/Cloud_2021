
module.exports= class AlbumAlreadyExistsError extends Error{
  constructor(name){
    super(`The album ${name} already exists`);
    this.name= 'AlbumAlreadyExistsError';
  }
};