const pgClient = require('../database/dbconnect');
const axios = require('axios');
const { link } = require('../constants/link');

const getMovies = async (page) => {
    try {
        const movies = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params:
            {
                api_key: link.API_KEY,
                page: page
            }
        });
        return movies;
    } catch (e) {
        return { error: e.message };
    }
}

const getGenresForFilms = async () => {
    let data = [];
    for (let i = 1; i <= 61; i++) {
        const films = await getMovies(i);
        for (let value of films.data.results) {
            data.push({ id: value.id, genres: [...new Set(value.genre_ids)] });
            console.log(value.id, ', ', value.genre_ids);
        }
    }
    return data;
}

const vriteDataToBD = async () => {
    const data = await getGenresForFilms();
    for (let value of data) {
        value.genres.forEach(async (genres) => {
            await pgClient.query(`INSERT INTO films_genres (films_id, genre_id) select f.id, g.id from films as f, genres as g where f.id = ${value.id} and g.id = ${genres};`);
        })
    }
}