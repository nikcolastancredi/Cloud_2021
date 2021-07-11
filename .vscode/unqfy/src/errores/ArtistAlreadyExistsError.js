
module.exports= class ArtistAlreadyExistsError extends Error{
  constructor(){
    super(' This artist already exists');
    this.name= 'ArtistExistsError';
  }
};