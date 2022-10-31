const SERVER_ERROR_CODE = require('../errors/errors-constants');

const errorsHandler = ((err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  console.log(err);
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

module.exports = errorsHandler;
