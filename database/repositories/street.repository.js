const client = require('../dbconnect');

async function getStreet(id) {
    try {
        const result = await client.query(`SELECT name FROM streets WHERE id=${id}`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}

module.exports = {getStreet};
