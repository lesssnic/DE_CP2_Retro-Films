const client = require('../dbconnect');

async function createUser(value) {
  try {
    const result = await client.query(`INSERT INTO users (first_name, last_name, login, password)
                       VALUES ('${value.first_name}', '${value.last_name}','${value.login}', '${value.password}')
                       RETURNING login;`);
    return { result: result.rows };
  } catch (error) {
    return { dbError: error };
  }
}

async function authenticateUser(login) {
  try {
    const result = await client.query(`SELECT password, first_name, last_name, login, id FROM users 
                                           WHERE login = '${login}';`);
    return { result: result.rows };
  } catch (error) {
    return { dbError: error };
  }
}

module.exports = { createUser, authenticateUser };
