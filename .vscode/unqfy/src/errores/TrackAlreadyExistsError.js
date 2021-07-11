module.exports= class TrackAlreadyExistsError extends Error{
    constructor(){
      super(' This track already exists');
      this.name= 'TrackAlreadyExistsError';
    }
  };