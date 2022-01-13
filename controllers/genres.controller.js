const genresRepository = require('../database/repositories/genres.repository');
const { dataBaseError } = require('../helpers/database-error.helper');
const { getStatus } = require('../helpers/database-status.helper');

const getGenres = async () => {
  const { dbError, result } = await genresRepository.getGenres();
  if (dbError) return { error: dataBaseError(dbError) };
  return { result: getStatus(result) };
};

module.exports = { getGenres };
