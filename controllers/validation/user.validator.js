const Joi = require('joi');

exports.userValidator = Joi.object().keys({
  first_name: Joi.string().alphanum().trim().max(100)
    .allow(''),
  last_name: Joi.string().alphanum().trim().max(100)
    .allow(''),
  password: Joi.string().max(250).required(),
  login: Joi.string().alphanum().trim().max(100)
    .required(),
});
