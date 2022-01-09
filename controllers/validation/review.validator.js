const Joi = require('joi');

exports.reviewValidator = Joi.object().keys({
    movie_id: Joi.number().integer().min(0).required(),
    content: Joi.string().replace(/'/g, "`").required()
});
