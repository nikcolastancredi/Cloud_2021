
module.exports= class UserAlreadyExistsError extends Error{
  constructor(){
    super(' This user already exists');
    this.name= this.constructor.name;
  }
};