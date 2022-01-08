const URL = require('url');
const { AUTH_PERSON, CREATE_PERSON, GENRES, LANGUAGES } = require('../constants/route');
const { getIndex, getContentType } = require('../controllers/index.controller');
const { getUser, addUser } = require('../controllers/users.controller');
const { getGenres } = require('../controllers/genres.controller');
const { getLanguages } = require('../controllers/languages.controller');
const { getSingleMovie, getMovies } = require('../controllers/movie.controller');

async function routerHandler(req, res, body) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    let result, error;
    const { method, url, headers } = req;
    const { query, pathname } = URL.parse(url, true);
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
            ({ result, error } = await getGenres(headers));
            break;
        case (method === 'GET' && pathname === LANGUAGES):
            ({ result, error } = await getLanguages(query));
            break;
        case (method === 'GET' && pathname === '/movie'):
            const params = Object.keys(query);
            if (params.length === 1 && params[0] === 'id') ({ result, error } = await getSingleMovie(query));
            else ({ result, error } = await getMovies(query));
            break;
        // case (method ==='GET' && pathname === '/movie.json'):
        //     await writeBaseAdd(pathname, 'text/html', res);
        //     break;
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
