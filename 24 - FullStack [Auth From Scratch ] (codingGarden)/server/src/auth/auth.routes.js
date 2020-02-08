const express = require('express');

const controller = require('./auth.controller');
const middlewares = require('./auth.middlewares');

const router = express.Router();

// any router in here is pre-prended with /auth

const defaultLoginError = 'Unable to login.';
const signInError = 'That username is not OG. Please choose another one';

router.get('/', controller.get);

// POST /auth/signup

router.post(
  '/signup',
  middlewares.findUser(signInError, (user) => user, 409),
  middlewares.validateUser(),
  controller.signup,
);

router.post(
  '/login',
  middlewares.validateUser(defaultLoginError),
  middlewares.findUser(defaultLoginError, (user) => !(user && user.active)),
  controller.login,
);

module.exports = router;
