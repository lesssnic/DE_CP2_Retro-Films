const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.generateHash = (password) => bcrypt.hash(password, saltRounds);

exports.checkHash = (password = '', hash = '') => bcrypt.compare(password, hash);
