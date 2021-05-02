module.exports= class AlbumDoesNotExistError extends Error{
  constructor(){
    super(' This album does\'t exist');
    this.name= 'AlbumDoesNotExistError';
  }
};