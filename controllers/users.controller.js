const usersRepository = require('../database/repositories/users.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {checkHash, generateHash} = require('./bcrypt/bcrypt');
const {genToken} = require('./jwt/jwt');
const {getStatus} = require('./status/user.status')

const addUser = async (body) => {
    const { value, error } = validators.validate(body, validators.userValidator);
    if (error) return { error };
    value.password = await generateHash(value.password);
    const {dbError, result} = await usersRepository.addUser(value);
    if (dbError) return { error: dataBaseError.dbError(dbError) };
    return { result: { data: result, status: 200 }};
};

const getUser = async (body) => {
    const { value, error } = validators.validate(body, validators.userValidator);
    if (error) return { error };
    const {dbError, result} = await usersRepository.getUser(value.login);
    if(result.length) {
        const ifValidate = await checkHash(value.password, result[0].password);
        if (ifValidate) result.token = await genToken(result);
    }
    const data = getStatus(result);
    if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: data };
};

module.exports = {addUser, getUser};
