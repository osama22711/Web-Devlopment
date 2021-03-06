const express = require('express');
const Joi = require('joi');

const db = require('../db/connection');

const notes = db.get('notes');

const schema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100)
    .required(),
  note: Joi.string()
    .trim()
    .required(),
});

const router = express.Router();

router.get('/', (req, res) => {
  notes
    .find({
      user_id: req.user._id,
    })
    .then((results) => {
      res.json(results);
    });
});

router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // insert into db [[ No Error ]]
    const note = {
      ...req.body,
      user_id: req.user._id,
    };
    notes.insert(note).then((createdNote) => {
      res.json(createdNote);
    });
  } else {
    const error = new Error(result.error);
    res.status(422);
    next(error);
  }
});

module.exports = router;
