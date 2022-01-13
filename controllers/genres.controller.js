const genresRepository = require('../database/repositories/genres.repository');
const { dataBaseError } = require('../helpers/database-error.helper');
const { verifyToken } = require('./jwt/jwt');
const { getStatus } = require('../helpers/database-status.helper');
const { getStatusAuth } = require('../helpers/auth-status.helper');

const getGenres = async (token) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { dbError, result } = await genresRepository.getGenres();
  if (dbError) return { error: dataBaseError(dbError) };
  return { result: getStatus(result) };
};

module.exports = { getGenres };
