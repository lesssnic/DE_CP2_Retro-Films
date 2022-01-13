exports.userValidator = require('./user.validator').userValidator;
exports.movieValidator = require('./movie.validator').movieValidator;
exports.idValidator = require('./id.validator').idValidator;
exports.movieQueryValidator = require('./movie.validator').movieQueryValidator;
exports.reviewValidator = require('./review.validator').reviewValidator;
exports.reviewUpdateValidator = require('./review-update.validator').reviewUpdateValidator;

exports.validate = (data, schema) => {
  const result = schema.validate(data, { abortEarly: false });
  if (result.error) {
    const error = { status: 400, data: result.error.message };
    return { error, errorValid: error };
  }
  return { value: result.value, valid: result.value };
};
