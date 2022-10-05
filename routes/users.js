const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validityProfile,
  // validityUser,
} = require('../middlewares/validity-params');

const {
  getUser,
  // getUserById,
  // getCurrentUser,
  updateUser,
} = require('../controllers/users');

userRouter.get('/users/me', auth, getUser);

// userRouter.get('/users/me', auth, getCurrentUser);

// userRouter.get('/users/:userId', auth, validityUser, getUserById);

userRouter.patch('/users/me', auth, validityProfile, updateUser);

module.exports = userRouter;
