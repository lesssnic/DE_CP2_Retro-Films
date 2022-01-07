const URL = require('url');
const {GET_STREET, GET_EXECUTIONTIME} = require('../constants/route');
const {getStreet} = require('../controllers/street.controller');
const {getIndex, writeBase, writeBaseAdd} = require('../controllers/index.controller');
const {getFactorial} = require('../controllers/factorial.controller');

async function routerHandler(req, res, body) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    let result, error;
    const { method, url } = req;
    const { query, pathname } = URL.parse(url, true);
    switch (true) {
        case (req.method === "OPTIONS"):
            res.statusCode = 200;
            return res.end();
        case (pathname === '/'):
                await getIndex('index.html', 'text/html', res);
            //res.end();
            break;
        case (method ==='GET' && pathname === GET_STREET):
            ({result, error} = await getStreet(query));
            break;
        case (method ==='GET' && pathname === GET_EXECUTIONTIME):
            ({result, error} = await getFactorial(query));
            break;
        // case (method ==='GET' && pathname === '/movie.json'):
        //     await writeBaseAdd(pathname, 'text/html', res);
        //     break;
        default:
            await getIndex(pathname, 'text/html', res);
            return ;
    }
    if (error) {
        res.statusCode = error.status;
        return res.end(JSON.stringify({ error }));
    } else if(result) {
        res.statusCode = result.status;
        res.end(JSON.stringify(result.data));
    }

}
module.exports = {routerHandler};
