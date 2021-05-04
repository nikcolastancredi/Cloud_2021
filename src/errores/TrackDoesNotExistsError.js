module.exports= class TrackDoesNotExistsError extends Error{
    constructor(){
      super(' This track doesn\'t exist');
      this.name= 'TrackDoesNotExistsError';
    }
  };