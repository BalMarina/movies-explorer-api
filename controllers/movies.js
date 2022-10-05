const Movie = require('../models/movie');

const InvalidDataError = require('../errors/invalid-data-error');
const NotFoundError = require('../errors/not-found-error');
const UserAccessError = require('../errors/user-access-error');

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const saveMovie = (req, res, next) => {
  const params = Object.fromEntries(Object.entries(req.body).filter(([, v]) => Boolean(v)));
  const ownerId = req.user._id;
  Movie.create({ ...params, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Ошибка сохранения фильма'));
      } else {
        next(err);
      }
    });
};

const delMovie = (req, res, next) => {
  const { moviedId } = req.params;
  Movie.findById(moviedId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new UserAccessError('Вы не можете удалить этот фильм');
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError('Передан невалидный _id фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovie,
  saveMovie,
  delMovie,
};
