const { SIGNUP_EMAIL_ERROR_CODE } = require('./errors-constants');

class SignupEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SIGNUP_EMAIL_ERROR_CODE;
  }
}

module.exports = SignupEmailError;
