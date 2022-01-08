const client = require('../dbconnect');

async function getLanguages() {
    try {
        const result = await client.query(`SELECT * FROM languages`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}

module.exports = {getLanguages};
