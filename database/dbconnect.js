const { Client } = require('pg');
const { connectionString } = require('../constants/data-base-config');

const client = new Client({
  connectionString,
});
client.connect();

module.exports = client;
