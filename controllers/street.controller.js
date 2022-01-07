const streetRepository = require('../database/repositories/street.repository');

const streetValidator = require('./validation/street.validator').streetValidator;

const getStreet = async (body) => {
    const { value, error } = streetValidator(body); // My Class Error
    if (error) return { error };
    const id = body.id;
    const {dbError ,result} = await streetRepository.getStreet(id);
    if (dbError) return { error: { status: 500, data: { dbError } } };
    return { result: { data: result, status: 200 } };
};

module.exports = {getStreet};
