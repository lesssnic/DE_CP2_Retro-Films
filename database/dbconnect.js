const {connectionString} = require('../constants/dataBaseConfig');
const { Client } = require('pg');

client = new Client({
    connectionString,
  })
client.connect();

module.exports = client;