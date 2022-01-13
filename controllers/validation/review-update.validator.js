const Joi = require('joi');

exports.reviewUpdateValidator = Joi.object().keys({
  review_id: Joi.number().integer().min(0).required(),
  content: Joi.string().replace(/'/g, '`').required(),
});
