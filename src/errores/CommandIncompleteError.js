module.exports= class CommandIncompleteError extends Error {
  constructor(command, size) {
    super(`'${command}' needs at least ${size} parameters`);
    this.name = this.constructor.name;
  }
};