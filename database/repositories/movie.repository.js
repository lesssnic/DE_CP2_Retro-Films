const pgClient = require('../dbconnect');

exports.getMovieById = async (id) => {
  try {
    const movie = await pgClient.query(`
    SELECT f.*, l.english_name as language_in_en, STRING_AGG(g."name" , ', ') as genres, array [r.content_review] as reviews 
     FROM films f, genres g, films_genres fg, users u, languages l, review r 
     WHERE f.id = ${id}
            AND g.id = fg.genre_id
            AND f.id = fg.films_id
            AND l.iso_639_1 = f.original_language
            AND u.id =r.user_id 
            and f.id = r.movie_id 
      group by f.id, l.english_name, r.content_review
      LIMIT 1;
    `);
    return { result: movie.rows[0] };
  } catch (error) {
    return { error: error.message };
  }
};
exports.getMovieByFilters = async (params) => {
  try {
    const first = (params.page * params.pre_page) - params.pre_page;
    const movie = await pgClient.query(`
    SELECT * FROM (SELECT f.*, STRING_AGG(g."name" , ', ') as genres FROM films f, genres g, films_genres fg
      WHERE f.title ILIKE '%${params.title}%' 
            AND f.release_date BETWEEN '${params.release_date_first}' AND '${params.release_date_last}'
            AND f.revenue BETWEEN ${params.revenue_min} AND ${params.revenue_max}
            AND f.status LIKE '%${params.status}%'
            AND f.adult = '${params.adult}'
            AND f.budget BETWEEN ${params.budget_min} AND ${params.budget_max} 
            AND f.popularity BETWEEN ${params.popularity_min} AND ${params.popularity_max}
            AND f.original_language LIKE '%${params.language}%'
            AND g.id = fg.genre_id
            AND f.id = fg.films_id
      group by f.id
      offset ${first} LIMIT ${params.pre_page}) filters
      WHERE genres ILIKE '%${params.genre}%'
      `);

    return { result: { count: movie.rows.length, data: movie.rows, currentPage: params.page } };
  } catch (e) {
    return { error: e.message };
  }
};
