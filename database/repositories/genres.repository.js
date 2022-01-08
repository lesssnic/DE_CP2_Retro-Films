const client = require('../dbconnect');

async function getGenres() {
   try {
        const result = await client.query(`SELECT * FROM genres`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}

module.exports = {getGenres};
