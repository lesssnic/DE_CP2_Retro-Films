const reviewRepository = require('../database/repositories/review.repository');
const dataBaseError = require('../controllers/errors/db.error');
const validators = require('./validation');
const {verifyToken, decodeToken} = require('./jwt/jwt');
const {getStatus} = require('./status/dataBase.status');
const {getStatusAuth} = require('./status/auth.status');


const getReview = async (token, query) => {
    const { valid, error } = validators.validate(query, validators.idValidator);
    if (valid) {
        const {id: movieId} = valid;
        const { value, error } = verifyToken(token);
        const err = getStatusAuth(value, error);
        if (error) return {error: err};
        const {dbError, result} = await reviewRepository.getReview(movieId);
        if (dbError) return { error: dataBaseError.dbError(dbError) };
        const data = getStatus(result);
        return { result: data };
    }
    return { error };
};

const createReview = async (token, body) => {
    const { valid, error } = validators.validate(body, validators.reviewValidator);
    if (valid) {
        const {movie_id: movieId, content} = valid;
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
    }
    return { error };
};

const updateReview = async (token, body) => {
    const { valid, error } = validators.validate(body, validators.reviewUpdateValidator);
    if (valid) {
        const {movie_id: reviewId, content} = body;
        const { value, error } = verifyToken(token);
        const err = getStatusAuth(value, error);
        if (value) {
            const {value: {header: {id: userId}}} = decodeToken(token);
            const {dbError, result} = await reviewRepository.updateReview(reviewId, userId, content);
            if (dbError) return { error: dataBaseError.dbError(dbError) };
            const data = getStatus(result);
            return { result: data };
        }
        return {error: err};
    }
    return { error };
};

const deleteReview = async (token, query) => {
    const { valid, error } = validators.validate(query, validators.reviewUpdateValidator);
    if (valid) {
        const {id: reviewId} = query;
        const { value, error } = verifyToken(token);
        const err = getStatusAuth(value, error);
        if (value) {
            const {value: {header: {id: userId}}} = decodeToken(token);
            const {dbError, result} = await reviewRepository.deleteReview(reviewId, userId);
            if (dbError) return { error: dataBaseError.dbError(dbError) };
            const data = getStatus(result);
            return { result: data };
        }
        return {error: err};
    }
    return { error };
};

module.exports = {getReview, createReview, updateReview, deleteReview};
