const moviesRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getMovie,
  saveMovie,
  delMovie,
} = require('../controllers/movies');
const { validityMovies, validitySavedMovies } = require('../middlewares/validity-params');

moviesRouter.get('/movies', auth, getMovie);

moviesRouter.post('/movies', auth, validitySavedMovies, saveMovie);

moviesRouter.delete('/movies/_id', auth, validityMovies, delMovie);

module.exports = moviesRouter;
