const languagesRepository = require('../database/repositories/languages.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {verifyToken} = require('./jwt/jwt');
const {getStatus} = require('./status/dataBase.status');
const {getStatusAuth} = require('./status/auth.status');


const getLanguages = async (headers) => {
    const { value, error } = verifyToken(headers.token);
    const err = getStatusAuth(value, error);
    if (error) return {error: err};
    const {dbError, result} = await languagesRepository.getLanguages();
    const data = getStatus(result);
    if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: data };
};

module.exports = {getLanguages};
