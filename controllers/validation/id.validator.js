const Joi = require('joi');

exports.idValidator = Joi.object().keys({
  id: Joi.number().integer().min(0).required(),
});
