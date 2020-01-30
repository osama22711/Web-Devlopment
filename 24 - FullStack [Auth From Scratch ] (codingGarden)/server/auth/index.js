const express = require('express');
const Joi = require('joi');
const db = require('../db/connection');
const bcrypt = require('bcryptjs');

const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .min(10)
    .required()
});

// any router in here is pre-prended with /auth

router.get('/', (req, res) => {
  res.json({
    message: 'Locked!'
  });
});

// POST /auth/signup

router.post('/signup', (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // make sure username is unique
    users
      .findOne({
        username: req.body.username
      })
      .then(user => {
        // if user is undefined, username is not in the db, otherwise duplicate user
        if (user) {
          // there is already a user in the db with this username...
          const error = new Error(
            'That username is not OG. Please choose another one'
          );
          next(error);
        } else {
          // hash the password
          bcrypt.hash(req.body.password, 12).then(hashedPassword => {
            // insert the user with the hashed password
            const newUser = {
              username: req.body.username,
              password: hashedPassword
            };

            users.insert(newUser).then(insertedUser => {
              delete insertedUser.password;
              res.json(insertedUser);
            });
          });
        }
        // res.json({ user });
      });
  } else {
    next(result.error); // send it to the error handler
  }
});

module.exports = router;
