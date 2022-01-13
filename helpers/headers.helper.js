exports.setHeaders = (response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.setHeader('Access-Control-Expose-Headers', 'token');
  return response;
};

exports.setJsonHeader = (response) => {
  response.setHeader('Content-type', 'application/json');
  return response;
};

exports.setTypeHeader = (response, type) => {
  response.setHeader('Content-type', `${type}`);
  return response;
};
