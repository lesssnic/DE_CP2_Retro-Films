const usersRepository = require('../database/repositories/users.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {checkHash, generateHash} = require('./bcrypt/bcrypt');
const {genToken} = require('./jwt/jwt');

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
    let token = '';
    if(result.length) {
        const ifValidate = await checkHash(value.password, result[0].password);
        if (ifValidate) token = await genToken(result);
    }

    if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: { data: result, status: 200, token: token} };
};

module.exports = {addUser, getUser};
