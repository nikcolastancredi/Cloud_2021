
module.exports= class CommandDoesNotExistsError extends Error{
  constructor(command){
    super(`'${command}' is not implemented`);
    this.name= 'CommandDoesNotExistsError';
  }
};

module.exports= class CommandIncompleteError extends Error{
  constructor(command, size){
    super(`'${command}' needs at least ${size} parameters`);
    this.name= 'CommandIncompleteError';
  }
};