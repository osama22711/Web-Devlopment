const monk = require('monk');
const db = monk('localhost/auth-forNoobs');

module.exports = db;
