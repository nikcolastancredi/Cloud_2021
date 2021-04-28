
module.exports= class CommandDoesNotExistsError extends Error{
  constructor(command){
    super(`'${command}' is not implemented`);
    this.name= 'CommandDoesNotExistsError';
  }
};