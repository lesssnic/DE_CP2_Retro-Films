const jwt = require("jsonwebtoken");
const secret = 'ryeitooel';
const options = {
    expiresIn: 60 * 60
}

exports.genToken = ({first_name, last_name, email}) => {return jwt.sign(
    {first_name, last_name, email}, secret, options)};
