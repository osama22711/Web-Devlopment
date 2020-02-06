const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const db = require('../db/connection');

const users = db.get('users');
const router = express.Router();

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30),
  password: Joi.string()
    .trim()
    .min(10),
  roles: Joi.string().valid('user', 'admin'),

  active: Joi.bool(),
});

router.get('/', async (req, res, next) => {
  try {
    //-------------------------------------------
    // async and await is the async alternative for
    // promises and then but to catch an error of it
    // we must do try and catch
    //-------------------------------------------
    // good thing to point is: if an error happened
    // and we don't have the try and catch
    // the user would wait forever for response
    //-------------------------------------------
    const result = await users.find({}, '-password');
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { id: _id } = req.params;
  // validate id params
  try {
    // validate req body
    const result = schema.validate(req.body);
    if (!result.error) {
      //  find the user with the given id
      const query = { _id };
      const user = await users.findOne(query);
      if (user) {
        //  update user in db
        const updatedUser = req.body;
        if (updatedUser.password) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
        }
        const result = await users.findOneAndUpdate(query, {
          $set: updatedUser,
        });
        // respond with user
        delete result.password;
        res.json(result);
      } else {
        // if not exists: send 404
        next();
      }
    } else {
      // if  not valid: send an error with reason
      res.status(422);
      throw new Error(result.error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
