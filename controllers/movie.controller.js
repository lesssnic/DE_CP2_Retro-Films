const validators = require('./validation');
const { getMovieById, getMovieByFilters } = require('../database/repositories/movie.repository')

exports.getSingleMovie = async (query) => {
    const { value, error } = validators.validate(query, validators.idValidator);
    if (error) return { error };
    
    const { error: dbError, result } = await getMovieById(value.id);

    if (dbError) return { error: { status: 500, data: { error } } };
    return { result: { data: result, status: 200 } };
};

exports.getMovies = async (query) => {
    const { value, error } = validators.validate(query, validators.movieQuweryValidator);
    if (error) return { error };

    const { error: dbError, result } = await getMovieByFilters(value);

    if (dbError) return { error: { status: 500, data: { error } } };
    return { result: { data: result, status: 200 } };
};