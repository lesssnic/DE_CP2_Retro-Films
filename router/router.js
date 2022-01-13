const URL = require('url');
const {
  AUTH_USER, CREATE_USER, GENRES, LANGUAGES, MOVIE, MOVIES, REVIEW,
} = require('../constants/route');
const { getIndex } = require('../controllers/index.controller');
const { authenticateUser, createUser } = require('../controllers/users.controller');
const { getGenres } = require('../controllers/genres.controller');
const { getLanguages } = require('../controllers/languages.controller');
const { getSingleMovie, getMovies } = require('../controllers/movie.controller');
const {
  getReview, createReview, updateReview, deleteReview,
} = require('../controllers/review.controller');
const { setJsonHeader, setHeaders, setTypeHeader } = require('../helpers/headers.helper');

async function routerHandler(req, res, body) {
  res = setHeaders(res);
  let result, error;
  const { method, url, headers } = req;
  const { query, pathname } = URL.parse(url, true);
  const { authorization: token } = headers;
  switch (true) {
    case (req.method === 'OPTIONS'):
      res.statusCode = 200;
      return res.end();
    case (method === 'POST' && pathname === CREATE_USER):
      ({ result, error } = await createUser(body));
      break;
    case (method === 'POST' && pathname === AUTH_USER):
      ({ result, error } = await authenticateUser(body));
      if (result) res.setHeader('token', `${result.token}`);
      break;
    case (method === 'GET' && pathname === GENRES):
      ({ result, error } = await getGenres());
      break;
    case (method === 'GET' && pathname === LANGUAGES):
      ({ result, error } = await getLanguages());
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
      ({ result, error } = await getIndex('index.html'));
      break;
    default:
      ({ result, error } = await getIndex(pathname, 'text/html', res));
  }
  if (error) {
    res.statusCode = error.status;
    return res.end(JSON.stringify({ error: error.data }));
  } if (result.type) {
    res = setTypeHeader(res, result.type);
    res.statusCode = result.status;
    res.end(result.data);
  } else {
    res = setJsonHeader(res);
    res.statusCode = result.status;
    res.end(JSON.stringify(result));
  }
}
module.exports = { routerHandler };
