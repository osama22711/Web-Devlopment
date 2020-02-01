const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db/connection');
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
    .required(),
});

// any router in here is pre-prended with /auth

router.get('/', (req, res) => {
  res.json({
    message: 'Locked!',
  });
});

// POST /auth/signup

router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // make sure username is unique
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        // if user is undefined, username is not in the db, otherwise duplicate user
        if (user) {
          // there is already a user in the db with this username...
          const error = new Error(
            'That username is not OG. Please choose another one',
          );
          res.status(409);
          next(error);
        } else {
          // hash the password
          bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
            // insert the user with the hashed password
            const newUser = {
              username: req.body.username,
              password: hashedPassword,
            };

            users.insert(newUser).then((insertedUser) => {
              delete insertedUser.password;
              res.json(insertedUser);
            });
          });
        }
        // res.json({ user });
      });
  } else {
    res.status(422);
    next(result.error); // send it to the error handler
  }
});

function respondError422(res, next) {
  res.status(422);
  const error = new Error('Unable to login.');
  next(error);
}

router.post('/login', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          // found the user in the db ... so it exists
          // now we compare the password
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) {
              // if matches - they sent the right paswword
              const payload = {
                _id: user._id,
                username: user.username,
              };
              jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {
                  expiresIn: '1d',
                },
                (err, token) => {
                  if (err) {
                    respondError422(res, next);
                  } else {
                    res.json({
                      token,
                    });
                  }
                },
              );
            } else {
              // throw error - user not found
              respondError422(res, next);
            }
          });
        } else {
          // throw error - user not found
          respondError422(res, next);
        }
      });
  } else {
    respondError422(res, next);
  }
});

module.exports = router;
