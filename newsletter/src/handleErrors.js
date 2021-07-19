const { APIErrorAbstract } = require('../errores/APIError');
const APIError = require('../errores/APIError');



const handleErrors = (err, req, res, next) => {
  if (err instanceof APIErrorAbstract) {
    return res.status(err.status).json(err);
  }
  
  if (err.type==='entity.parse.failed') {
    const error = new APIError.BadRequest();
    return res.status(error.status).json(error);
  }
  

  return res.status(500).json({
    status: 'error',
    message: err.message
  });
}


module.exports = handleErrors;