const path = require('path');

exports.getContentType = (url) => {
  switch (path.extname(url)) {
    case '':
      return '';
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    default:
      return 'application/octate-stream';
  }
};
