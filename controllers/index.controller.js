const path = require('path');
const { readFile } = require('fs/promises');
const { getContentType } = require('../helpers/file-type.helper');

const getIndex = async (url) => {
  const file = path.join(`${__dirname}/../swagger/${url}`);
  const extension = getContentType(url);
  if (!extension) {
    try {
      const result = await readFile(`${__dirname}/../swagger/error.html`);
      return { result: { data: result.toString(), status: 404, type: 'text/html' } };
    } catch (err) {
      return { error: { status: 404, error: 'Route not found' } };
    }
  } else {
    try {
      const result = await readFile(file);
      return { result: { data: result, status: 200, type: extension } };
    } catch (err) {
      return { error: { status: 404, error: 'File not found' } };
    }
  }
};

module.exports = {
  getIndex,
};
