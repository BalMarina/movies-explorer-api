const { USER_ACCESS_ERROR_CODE } = require('./errors-constants');

class UserAccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = USER_ACCESS_ERROR_CODE;
  }
}

module.exports = UserAccessError;
