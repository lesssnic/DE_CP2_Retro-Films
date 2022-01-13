const languagesRepository = require('../database/repositories/languages.repository');
const { dataBaseError } = require('../helpers/database-error.helper');
const { getStatus } = require('../helpers/dataBase-status.helper');

const getLanguages = async () => {
  const { dbError, result } = await languagesRepository.getLanguages();
  if (dbError) return { error: dataBaseError.dbError(dbError) };
  return { result: getStatus(result) };
};

module.exports = { getLanguages };
