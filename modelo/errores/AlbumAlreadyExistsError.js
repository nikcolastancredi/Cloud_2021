
module.exports= class AlbumAlreadyExistsError extends Error{
  constructor(){
    super(' This album already exists');
    this.name= 'ArtistExistsError';
  }
};