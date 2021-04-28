module.exports= class AlbumDoesNotExistsError extends Error{
  constructor(){
    super(' This album does\'t exist');
    this.name= 'AlbumDoesNotExistError';
  }
};