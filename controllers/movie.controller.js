const validators = require('./validation');
const { getMovieById, getMovieByFilters } = require('../database/repositories/movie.repository');
const { dataBaseError } = require('../helpers/database-error.helper');
const { verifyToken } = require('./jwt/jwt');
const { getStatusAuth } = require('../helpers/auth-status.helper');
const { getStatusMovies, getStatusMovie } = require('../helpers/movie-status.helper');

const getSingleMovie = async (query, token) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { valid, errorValid } = validators.validate(query, validators.idValidator);
  if (errorValid) return { error: errorValid };
  const { error: dbError, result } = await getMovieById(valid.id);
  if (dbError) return { error: dataBaseError.dbError(dbError) };
  return { result: getStatusMovie(result) };
};

const getMovies = async (query, token) => {
  const { value, error } = verifyToken(token);
  if (error) return { error: getStatusAuth(value) };
  const { valid, errorValid } = validators.validate(query, validators.movieQueryValidator);
  if (errorValid) return { error: errorValid };
  const { error: dbError, result } = await getMovieByFilters(valid);
  if (dbError) return { error: dataBaseError.dbError(dbError) };
  return { result: getStatusMovies(result) };
};

module.exports = { getMovies, getSingleMovie };
