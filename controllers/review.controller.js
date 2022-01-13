const reviewRepository = require('../database/repositories/review.repository');
const validators = require('./validation');
const { dataBaseError } = require('../helpers/database-error.helper');
const { verifyToken, decodeToken } = require('./jwt/jwt');
const { getStatus } = require('../helpers/dataBase-status.helper');
const { getStatusAuth } = require('../helpers/auth-status.helper');

const getReview = async (token, query) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { valid, errorValid } = validators.validate(query, validators.idValidator);
  if (errorValid) return { error: errorValid };
  const { id: movieId } = valid;
  const { dbError, result } = await reviewRepository.getReview(movieId);
  if (dbError) return { error: dataBaseError(dbError) };
  return { result: getStatus(result) };
};

const createReview = async (token, body) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { valid, errorValid } = validators.validate(body, validators.reviewValidator);
  if (errorValid) return { error: errorValid };
  const { movie_id: movieId, content } = valid;
  const { value: { header: { id: userId } } } = decodeToken(token);
  const { dbError, result } = await reviewRepository.createReview(movieId, userId, content);
  if (dbError) return { error: dataBaseError(dbError) };
  return { result: getStatus(result) };
};

const updateReview = async (token, body) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { valid, errorValid } = validators.validate(body, validators.reviewUpdateValidator);
  if (errorValid) return { error: errorValid };
  const { review_id: reviewId, content } = valid;
  const { value: { header: { id: userId } } } = decodeToken(token);
  const { dbError, result } = await reviewRepository.updateReview(reviewId, userId, content);
  if (dbError) return { error: dataBaseError(dbError) };
  return { result: getStatus(result) };
};

const deleteReview = async (token, query) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { valid, errorValid } = validators.validate(query, validators.idValidator);
  if (errorValid) return { error: errorValid };
  const { id: reviewId } = valid;
  const { value: { header: { id: userId } } } = decodeToken(token);
  const { dbError, result } = await reviewRepository.deleteReview(reviewId, userId);
  if (dbError) return { error: dataBaseError(dbError) };
  return { result: getStatus(result) };
};

module.exports = {
  getReview, createReview, updateReview, deleteReview,
};
