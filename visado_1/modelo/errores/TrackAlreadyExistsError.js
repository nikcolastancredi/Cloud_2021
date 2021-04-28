module.exports= class TrackAlreadyExistsError extends Error{
    constructor(){
      super(' This artist doesn\'t exist');
      this.name= 'TrackAlreadyExistsError';
    }
  };