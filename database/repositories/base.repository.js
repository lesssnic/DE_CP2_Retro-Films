const client = require('../dbconnect');

async function writeBase(body) {
    body.adult = body.adult ? body.adult : false;
    body.original_title = body.original_title ? body.original_title.replace(/'/g, "`") : null;
    body.popularity = body.popularity ? body.popularity : 0;
    body.video = body.video ? body.video : false;
    try {
        const result = await client.query(`INSERT INTO films (id, original_title, adult, video, popularity)
             VALUES  ('${body.id}', '${body.original_title}', '${body.adult}', '${body.video}', '${body.popularity}')`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}
async function updateBase(body) {
    body.backdrop_path = body.backdrop_path ? body.backdrop_path : null;
    body.budget = body.budget ? body.budget : 0;
    body.homepage = body.homepage ? body.homepage : null;
    body.original_language = body.original_language ? body.original_language : null;
    body.overview = body.overview ? body.overview.replace(/'/g, "`") : null;
    body.poster_path = body.poster_path ? body.poster_path : null;
    body.release_date = body.release_date ? body.release_date : null;
    body.revenue = body.revenue ? body.revenue : 0;
    body.runtime = body.runtime ? body.runtime : 0;
    body.status = body.status ? body.status : null;
    body.tagline = body.tagline ? body.tagline : null;
    body.title = body.title ? body.title : null;
    body.imdb_id = body.imdb_id ? body.imdb_id : null;
    try {
        const result = await client.query(`UPDATE films SET backdrop_path='${body.backdrop_path}', budget='${body.budget}', homepage='${body.homepage}', imdb_id='${body.imdb_id}', original_language='${body.original_language}', overview='${body.overview}', poster_path='${body.poster_path}', release_date='${body.release_date}', revenue='${body.revenue}', runtime='${body.runtime}', status='${body.status}', tagline='${body.tagline}', title='${body.title}'
        WHERE id = '${body.id}';`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}
async function getBase() {
    try {
        const result = await client.query(`SELECT id FROM films WHERE status IS NULL`);
        return {result: result.rows}
    }catch (error) {
        return {dbError: error}
    }
}

module.exports = {writeBase, updateBase, getBase};
