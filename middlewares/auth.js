const { NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const JwtError = require('../errors/jwt-error');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new JwtError('Ошибка токена'));
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(new JwtError('Ошибка токена'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? process.env.JWT_SECRET : JWT_SECRET);
  } catch (err) {
    next(new JwtError('Ошибка токена'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
