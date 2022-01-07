require('./database/dbconnect')
const {routerHandler} = require('./router/router');
const http = require('http');


function requestListener(req, res) {
  const bodyBuffer = [];
  req.on('data', (chunk) => {
    bodyBuffer.push(chunk)
  })
  req.on('end', async () => {
    // let temp = Buffer.concat(bodyBuffer).toString();
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