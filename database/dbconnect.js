const {connectionString} = require('../constants/dataBaseConfig');
const { Client } = require('pg');

client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'IDK',
  password: '1111',
  port: 5432,
  })
client.connect();

module.exports = client;