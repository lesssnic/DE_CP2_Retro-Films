const Joi = require('joi');

exports.authValidator = Joi.object().keys({
    user_password: Joi.string()
        .required(),
    email: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'))
        .required()
});
