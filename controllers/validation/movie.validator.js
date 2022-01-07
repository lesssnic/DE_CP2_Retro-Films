const Joi = require('joi');

exports.movieValidator = Joi.object().keys({
    adult: Joi.string().alphanum().allow(null, ''),
    backdrop_path: Joi.string().alphanum().allow(null, ''),
    budget: Joi.number().integer().min(0),
    homepage: Joi.string().alphanum().allow(null, ''),
    imdb_id: Joi.string().alphanum().allow(null, ''),
    original_language: Joi.number().integer().min(0),
    original_title: Joi.string().alphanum().allow(null, ''),
    overview: Joi.string().alphanum().allow(null, ''),
    popularity: Joi.number().integer().min(0),
    poster_path: Joi.string().alphanum().allow(null, ''),
    release_date: Joi.string().alphanum().allow(null, ''),
    revenue: Joi.number().integer().min(0),
    runtime: Joi.number().integer().min(0),
    status: Joi.string().alphanum().allow(null, ''),
    tagline: Joi.string().alphanum().allow(null, ''),
    title: Joi.string().alphanum().allow(null, ''),
});

exports.movieQuweryValidator = Joi.object().keys({
    adult: Joi.string().alphanum().required(),
    title: Joi.string().alphanum().allow(null, ''),
    page: Joi.number().integer().min(0),
    pre_page: Joi.number().integer().min(0),
    budget_min: Joi.number().integer().min(0),
    budget_max: Joi.number().integer().min(0),
    language: Joi.string().alphanum().allow(null, ''),
    title: Joi.string().alphanum().allow(null, ''),
    popularity_min: Joi.number().integer().min(0),
    popularity_max: Joi.number().integer().min(0),
    release_date_first: Joi.string().allow(null, ''),
    release_date_last: Joi.string().allow(null, ''),
    revenue_min: Joi.number().integer().min(0),
    revenue_max: Joi.number().integer().min(0),
    status: Joi.string().alphanum().allow(null, ''),
});