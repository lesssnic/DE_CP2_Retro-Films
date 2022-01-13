const usersRepository = require('../database/repositories/users.repository');
const validators = require('./validation');
const { checkHash, generateHash } = require('./bcrypt/bcrypt');
const { genToken } = require('./jwt/jwt');
const { dataBaseError } = require('../helpers/database-error.helper');
const { getStatus } = require('../helpers/user-status.helper');
const { getStatusAuth } = require('../helpers/auth-status.helper');

const createUser = async (body) => {
  const { valid, errorValid } = validators.validate(body, validators.userValidator);
  if (errorValid) return { error: errorValid };
  valid.password = await generateHash(valid.password);
  const { dbError, result } = await usersRepository.createUser(valid);
  if (dbError) return { error: dataBaseError(dbError) };
  return { result: getStatusAuth(result) };
};

const authenticateUser = async (body) => {
  const { valid, errorValid } = validators.validate(body, validators.userValidator);
  if (errorValid) return { error: errorValid };
  const { dbError, result } = await usersRepository.authenticateUser(valid.login);
  if (dbError) return { error: dataBaseError(dbError) };
  if (result.length) {
    const ifValidate = await checkHash(valid.password, result[0].password);
    if (ifValidate) {
      const { token, errorToken } = genToken(result[0]);
      if (errorToken) return { error: errorToken };
      result.token = token;
    }
  }
  return { result: getStatus(result) };
};

module.exports = { createUser, authenticateUser };
