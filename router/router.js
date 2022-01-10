const URL = require('url');
const { AUTH_PERSON, CREATE_PERSON, GENRES, LANGUAGES, MOVIE, MOVIES, REVIEW } = require('../constants/route');
const { getIndex, getContentType } = require('../controllers/index.controller');
const { getUser, addUser } = require('../controllers/users.controller');
const { getGenres } = require('../controllers/genres.controller');
const { getLanguages } = require('../controllers/languages.controller');
const { getSingleMovie, getMovies } = require('../controllers/movie.controller');
const { getReview, createReview, updateReview, deleteReview } = require('../controllers/review.controller');

async function routerHandler(req, res, body) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'token');
    let result, error;
    const { method, url, headers } = req;
    const { query, pathname } = URL.parse(url, true);
    const { token } = headers;
    switch (true) {
        case (req.method === "OPTIONS"):
            res.statusCode = 200;
            return res.end();
        case (method === 'POST' && pathname === CREATE_PERSON):
            ({ result, error } = await addUser(body));
            break;
        case (method === 'POST' && pathname === AUTH_PERSON):
            ({ result, error } = await getUser(body));
            if (result) res.setHeader('token', `${result.token}`);
            break;
        case (method === 'GET' && pathname === GENRES):
            ({ result, error } = await getGenres(token));
            break;
        case (method === 'GET' && pathname === LANGUAGES):
            ({ result, error } = await getLanguages(token));
            break;
        case (method === 'GET' && pathname === MOVIE):
            ({ result, error } = await getSingleMovie(query, token));
            break;
        case (method === 'GET' && pathname === MOVIES):
            ({ result, error } = await getMovies(query, token));
            break;
        case (method === 'GET' && pathname === REVIEW):
            ({ result, error } = await getReview(token, query));
            break;
        case (method === 'POST' && pathname === REVIEW):
            ({ result, error } = await createReview(token, body));
            break;
        case (method === 'PUT' && pathname === REVIEW):
            ({ result, error } = await updateReview(token, body));
            break;
        case (method === 'DELETE' && pathname === REVIEW):
            ({ result, error } = await deleteReview(token, query));
            break;
        case (pathname === '/'):
            ({ result, error } = await getIndex('index.html', 'text/html', res));
            if (result) res.setHeader('Content-type', `${result.type}`);
            break;
        default:
            ({ result, error } = await getIndex(pathname, 'text/html', res));
            if (result) res.setHeader('Content-type', `${result.type}`);
    }
    if (error) {
        res.statusCode = error.status;
        return res.end(JSON.stringify({ error: error.data }));
    } else if (result.type) {
        res.statusCode = result.status;
        res.end(result.data);
    } else {
        res.statusCode = result.status;
        res.end(JSON.stringify({ data: result.data }));
    }

}
module.exports = { routerHandler };
