const URL = require('url');
const {AUTH_PERSON, CREATE_PERSON} = require('../constants/route');
const {getIndex, getContentType} = require('../controllers/index.controller');

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
        case (method ==='POST' && pathname === CREATE_PERSON):
            ({result, error} = await createPerson(body));
            break;
        case (method ==='POST' && pathname === AUTH_PERSON):
            ({result, error} = await authPerson(body));
            console.log(result);
            break;
        // case (method ==='GET' && pathname === '/movie.json'):
        //     await writeBaseAdd(pathname, 'text/html', res);
        //     break;
        case (pathname === '/'):
            ({result, error} = await getIndex('index.html', 'text/html', res));
            break;
        default:
            ({result, error} = await getIndex(pathname, 'text/html', res));
    }
    if (error) {
        res.statusCode = error.status;
        return res.end(JSON.stringify({ error }));
    } else if(result.type) {
        res.statusCode = result.status;
        res.end(result.data);
    }
    else {
        res.statusCode = result.status;
        res.end(JSON.stringify(result.data));

    }

}
module.exports = {routerHandler};
