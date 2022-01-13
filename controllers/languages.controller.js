const languagesRepository = require('../database/repositories/languages.repository');
const { dataBaseError } = require('../helpers/database-error.helper');
const { verifyToken } = require('./jwt/jwt');
const { getStatus } = require('../helpers/dataBase-status.helper');
const { getStatusAuth } = require('../helpers/auth-status.helper');

const getLanguages = async (token) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { dbError, result } = await languagesRepository.getLanguages();
  if (dbError) return { error: dataBaseError.dbError(dbError) };
  return { result: getStatus(result) };
};

module.exports = { getLanguages };
