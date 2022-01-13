require('./database/dbconnect');
const http = require('http');
const { routerHandler } = require('./router/router');

function requestListener(req, res) {
  const bodyBuffer = [];
  req.on('data', (chunk) => {
    bodyBuffer.push(chunk);
  });
  req.on('end', async () => {
    const body = bodyBuffer.length ? JSON.parse(bodyBuffer) : null;
    await routerHandler(req, res, body);
  });
  res.on('error', (err) => {
    res.statusCode = 500;
    res.end(JSON.stringify(err));
  });
}
const server = http.createServer(requestListener);
server.listen(3001);
