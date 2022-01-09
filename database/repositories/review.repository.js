const client = require('../dbconnect');

async function getReview(movieId) {
    try {
        const result = await client.query(`SELECT * FROM review WHERE movie_id = '${movieId}'`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}

async function createReview(movieId, userId, content) {
    try {
        const result = await client.query(`INSERT INTO review (movie_id, user_id, content_review)
                                           VALUES ('${movieId}', '${userId}','${content}')
                                               RETURNING id;`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}

async function updateReview(movieId, userId, content) {
    try {
        const result = await client.query(`UPDATE review SET content_review = '${content}'
                                           WHERE movie_id = '${movieId}' AND user_id = '${userId}'
                                           RETURNING movie_id;`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}
async function deleteReview(movieId, userId) {
    try {
        const result = await client.query(`DELETE
                                           FROM review
                                           WHERE movie_id = '${movieId}' AND user_id = '${userId}'
                                           RETURNING id;`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}

module.exports = {getReview, createReview, updateReview, deleteReview};
