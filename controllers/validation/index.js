exports.personValidator = require('./person.validator').personValidator;
exports.authValidator = require('./auth_person.validator').authValidator;

exports.validate = (data, schema) => {
    const result = schema.validate(data, { abortEarly: false });

    if (result.error) {
        const error = { status: 400, data: result.error.message };
        return { error };
    }
    return { value: result.value };
};
