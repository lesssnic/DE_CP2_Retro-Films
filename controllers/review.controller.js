const languagesRepository = require('../database/repositories/languages.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {verifyToken, decodeToken} = require('./jwt/jwt');
const {getStatus} = require('./status/dataBase.status');
const {getStatusAuth} = require('./status/auth.status');


const getReview = async (token) => {
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);
    if (value) {
        const {value: {header}} = decodeToken(token);
        console.log(header.id);
    }
    if (error) return {error: err};
    const {dbError, result} = await languagesRepository.getLanguages();
    const data = getStatus(result);
    if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: data };
};

module.exports = {getReview};
