const jwt = require('jsonwebtoken');

const secret = 'ryeitooel';

exports.genToken = ({
  first_name, last_name, login, id,
}) => {
  let token, errorToken;
  try {
    token = jwt.sign(
      { first_name, last_name, login }, secret, {
        expiresIn: 60 * 60 * 24,
        header: { id },
      },
    );
  } catch (err) {
    errorToken = err;
  }
  return { token, errorToken };
};

exports.verifyToken = (token) => {
  let value, error;
  try {
    value = jwt.verify(token, secret);
  } catch (err) {
    error = err;
  }
  return { value, error };
};

exports.decodeToken = (token) => {
  let value, error;
  try {
    value = jwt.decode(token, { complete: true });
  } catch (err) {
    error = err;
  }
  return { value, error };
};
