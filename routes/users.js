const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const { validityProfile } = require('../middlewares/validity-params');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

userRouter.get('/users/me', auth, getUser);

userRouter.patch('/users/me', auth, validityProfile, updateUser);

module.exports = userRouter;
