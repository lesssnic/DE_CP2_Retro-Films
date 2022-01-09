const genresRepository = require('../database/repositories/genres.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {verifyToken} = require('./jwt/jwt');
const {getStatus} = require('./status/dataBase.status');
const {getStatusAuth} = require('./status/auth.status');


const getGenres = async (token) => {
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);
    if (error) return {error: err};
    const {dbError, result} = await genresRepository.getGenres();
    if (dbError) return { error: dataBaseError.dbError(dbError) };
    const data = getStatus(result);
    return { result: data };
};

module.exports = {getGenres};
