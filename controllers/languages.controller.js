const usersRepository = require('../database/repositories/users.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {genToken} = require('./jwt/jwt');
const {getStatus} = require('./status/user.status')

const getLanguages = async (body) => {
    const { value, error } = verifyToken(headers.token);
    const data = getStatusAuth(value, error);
    if (error) return {error: data};
    // const { value, error } = validators.validate(body, validators.userValidator);
    // if (error) return { error };
    // const {dbError, result} = await usersRepository.getUser(value.login);
    // if(result.length) {
    //     const ifValidate = await checkHash(value.password, result[0].password);
    //     if (ifValidate) result.token = await genToken(result);
    // }
    // const data = getStatus(result);
    // if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: data };
};

module.exports = {getLanguages};
