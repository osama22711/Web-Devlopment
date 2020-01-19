// Requiring Section <--------
const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

// Defining Section <---------
const app = express();
const db = monk('localhost/meower');
const mews = db.get('mews');
const filter = new Filter();

// Using Section <----------
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Meower!'
  });
});

app.get('/mews', (req, res) => {
  mews.find().then(mews => {
    res.json(mews);
  });
});

function isValidMew(mew) {
  return (
    mew.name &&
    mew.name.toString().trim() !== '' &&
    mew.content &&
    mew.content.toString().trim() !== ''
  );
}

// Rate limiting the requests
app.use(
  rateLimit({
    windowMs: 30 * 1000,
    max: 1
  })
);

app.post('/mews', (req, res) => {
  if (isValidMew(req.body)) {
    const mew = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
      created: new Date()
    };
    mews.insert(mew).then(createdMew => {
      res.json(createdMew);
    });
  } else {
    res.status(422);
    res.json({
      message: 'Hey! Name and Content are requiired!'
    });
  }
});

app.listen(5000, () => {
  console.log('Listenening on http://localhost:5000');
});
