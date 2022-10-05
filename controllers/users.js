const { NODE_ENV } = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');

const InvalidDataError = require('../errors/invalid-data-error');
const NotFoundError = require('../errors/not-found-error');
const SignupEmailError = require('../errors/signup-email-error');

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { password } = req.body;
  const params = Object.fromEntries(Object.entries(req.body).filter(([, v]) => Boolean(v)));
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ ...params, password: hash }))
    .then((user) => {
      const { password: p, ...data } = JSON.parse(JSON.stringify(user));
      return res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new SignupEmailError(`Пользователь с email ${req.body.email} уже зарегистрирован`));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate(
    { _id: userId },
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((r) => {
      const token = jwt.sign(
        { _id: r._id },
        NODE_ENV === 'production' ? process.env.JWT_SECRET : JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
};
