const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('./auth.model');

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role,
    active: user.active,
  };
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
    (err, token) => {
      if (err) {
        res.status(422);
        const error = new Error('Unable to login.');
        next(error);
      } else {
        res.json({
          token,
        });
      }
    },
  );
}

const get = (req, res) => {
  res.json({
    message: 'Hello Auth! 🔐',
  });
};

const signup = async (req, res, next) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 12);
    // insert the user with the hashed password
    const newUser = {
      username: req.body.username,
      password: hashed,
      role: 'user',
      active: true,
    };

    const insertedUser = await users.insert(newUser);
    createTokenSendResponse(insertedUser, res, next);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.loggingInUser.password,
    );
    if (result) {
      // if matches - they sent the right paswword
      createTokenSendResponse(req.loggingInUser, res, next);
    } else {
      // throw error - user not found
      res.status(422);
      throw new Error('Unable to login.');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    next(error);
  }
};

module.exports = {
  signup,
  login,
  get,
};
