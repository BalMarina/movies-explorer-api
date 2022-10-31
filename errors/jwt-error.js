const { JWT_ERROR_CODE } = require('./errors-constants');

class JwtError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = JWT_ERROR_CODE;
  }
}

module.exports = JwtError;
