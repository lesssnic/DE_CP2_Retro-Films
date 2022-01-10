const validators = require('./validation');
const dataBaseError = require('../controllers/errors/db.error');
const { getMovieById, getMovieByFilters } = require('../database/repositories/movie.repository');
const {verifyToken, decodeToken} = require('./jwt/jwt');
const {getStatus} = require('./status/dataBase.status');
const {getStatusAuth} = require('./status/auth.status');

exports.getSingleMovie = async (query, token) => {
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);

    if (value) {
        const { value, error } = validators.validate(query, validators.idValidator);
        if (error) return { error };
        const { error: dbError, result } = await getMovieById(value.id);
        if (dbError) return { error: dataBaseError.dbError(dbError) };
        return { result: getStatus(result) };
    }
    return { error: err };
};

exports.getMovies = async (query, token) => {
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);
    if (value) {
        const { value, error } = validators.validate(query, validators.movieQuweryValidator);
        if (error) return { error };
        const { error: dbError, result } = await getMovieByFilters(value);
        if (dbError) return { error: dataBaseError.dbError(dbError) };
        return { result: getStatus(result) };
    }
    return { error: err };
};
