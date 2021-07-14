module.exports= class PlaylistDoesNotExistsError extends Error{
    constructor(){
      super(' This playlist doesn\'t exist');
      this.name= 'PlaylistDoesNotExistsError';
    }
  };