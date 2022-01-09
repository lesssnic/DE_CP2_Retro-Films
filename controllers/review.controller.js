const reviewRepository = require('../database/repositories/review.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {verifyToken, decodeToken} = require('./jwt/jwt');
const {getStatus} = require('./status/dataBase.status');
const {getStatusAuth} = require('./status/auth.status');


const getReview = async (token, {id: movieId}) => {
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);
    if (error) return {error: err};
    const {dbError, result} = await reviewRepository.getReview(movieId);
    if (dbError) return { error: dataBaseError.dbError(dbError) };
    const data = getStatus(result);
    return { result: data };
};

const createReview = async (token, {movie_id: movieId, content}) => {
    content = content.replace(/'/g, "`");
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);
    if (value) {
        const {value: {header: {id: userId}}} = decodeToken(token);
        const {dbError, result} = await reviewRepository.createReview(movieId, userId, content);
        if (dbError) return { error: dataBaseError.dbError(dbError) };
        const data = getStatus(result);
        return { result: data };
    }
    return {error: err};
};

const updateReview = async (token, {movie_id: movieId, content}) => {
    content = content.replace(/'/g, "`");
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);
    if (value) {
        const {value: {header: {id: userId}}} = decodeToken(token);
        const {dbError, result} = await reviewRepository.updateReview(movieId, userId, content);
        if (dbError) return { error: dataBaseError.dbError(dbError) };
        const data = getStatus(result);
        return { result: data };
    }
    return {error: err};

};

const deleteReview = async (token, {id: movieId}) => {
    const { value, error } = verifyToken(token);
    const err = getStatusAuth(value, error);
    if (value) {
        const {value: {header: {id: userId}}} = decodeToken(token);
        const {dbError, result} = await reviewRepository.deleteReview(movieId, userId);
        if (dbError) return { error: dataBaseError.dbError(dbError) };
        const data = getStatus(result);
        return { result: data };
    }
    return {error: err};
};

module.exports = {getReview, createReview, updateReview, deleteReview};
