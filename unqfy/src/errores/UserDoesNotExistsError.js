
module.exports= class UserDoesNotExistsError extends Error{
    constructor(){
        super(' This user doesn\'t exists');
        this.name= 'UserDoesNotExistsError';
    }
  };