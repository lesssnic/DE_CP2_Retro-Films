const jwt = require("jsonwebtoken");
const secret = 'ryeitooel';
const options = {
    expiresIn: 60 * 60 * 24
}

exports.genToken = ({first_name, last_name, login}) => {return jwt.sign(
    {first_name, last_name, login}, secret, options)};

exports.verifyToken = (token) => {
    let value, error;
    try{
        value = jwt.verify(token, secret);
    }catch(err) {
        error = err;
    }
    return {value, error}};


