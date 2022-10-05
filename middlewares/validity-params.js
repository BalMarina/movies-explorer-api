const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const checkId = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (ObjectId.isValid(value)) return value;
    return helpers.message('Некорректный _id пользователя');
  });

const checkEmail = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (validator.isEmail(value)) return value;
    return helpers.message('Проверьте, соответствует ли введенная почта параметрам email');
  });

const checkLink = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (validator.isURL(value)) return value;
    return helpers.message('Проверьте, есть ли у ссылки на изображение все параметры url');
  });

const validityUser = celebrate({
  params: Joi.object().keys({
    userId: checkId,
  }),
});

const validitySavedMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: checkLink,
    trailerLink: checkLink,
    thumbnail: checkLink,
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validityMovies = celebrate({
  params: Joi.object().keys({
    moviedId: checkId,
  }),
});

const validityProfile = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    name: Joi.string().min(2).max(30),
  }),
});

const validitySignup = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validitySignin = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required(),
  }),
});

module.exports = {
  validityUser,
  validitySavedMovies,
  validityMovies,
  validityProfile,
  validitySignup,
  validitySignin,
};
