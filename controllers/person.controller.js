const personRepository = require('../database/repositories/person.repository');
const validators = require('./validation');
const {checkHash, generateHash} = require('./bcrypt/bcrypt');
const {genToken} = require('./jwt/jwt');


const createPerson = async (body) => {
    const { value, error } = validators.validate(body, validators.personValidator);
    if (error) return { error };
    body.user_password = await generateHash(body.user_password);
    const {dbError ,result} = await personRepository.createPerson(body.first_name,body.last_name, body.email, body.user_password);
    if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: { data: result, status: 200 } };
};
const authPerson = async (body) => {
    const { value, error } = validators.validate(body, validators.authValidator);
    if (error) return { error };
    const {dbError ,result} = await personRepository.authPerson(body.email);
    const ifValidate = await checkHash(body.user_password, result[0]?.user_password);
    let token = '';
    if (ifValidate) token = await genToken(result);
    if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: { data: result, status: 201, token: token } };
};

module.exports = {createPerson, authPerson};
