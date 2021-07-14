module.exports= class ArtistDoesNotExistsError extends Error{
  constructor(){
    super(' This artist doesn\'t exist');
    this.name= 'ArtistDoesNotExistsError';
  }
};