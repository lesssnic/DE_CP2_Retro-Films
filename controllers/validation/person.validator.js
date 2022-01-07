const Joi = require('joi');

exports.personValidator = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    user_password: Joi.string()
        .required(),
    email: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'))
        .required()
});
