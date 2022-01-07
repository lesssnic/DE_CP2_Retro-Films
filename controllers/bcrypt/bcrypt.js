const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.generateHash = (password)=>{
    return bcrypt.hash(password, saltRounds);
}

exports.checkHash = (password='', hash='')=>{
    return bcrypt.compare(password, hash);
}
