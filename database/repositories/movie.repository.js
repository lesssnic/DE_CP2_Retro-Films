const pgClient = require('../dbconnect');

exports.getMovieById = async (id) => {
  try {
    const movie = await pgClient.query(`
      SELECT f.*, l.english_name AS language_in_en, g.genres , JSON_AGG(r.reviews) AS reviews 
       FROM films f LEFT JOIN languages l ON f.original_language = l.iso_639_1,
       (
         SELECT f1.id, STRING_AGG(g."name" , ', ') AS genres FROM genres g, films f1, films_genres fg
         WHERE f1.id = ${id}
         AND f1.id = fg.films_id 
         AND g.id = fg.genre_id 
         GROUP BY f1.id 
         LIMIT 1
       ) g LEFT JOIN 
       (
       SELECT f2.id, 
          JSON_BUILD_OBJECT
            (
            'review_id', r.id,
            'login', u.login ,
            'content', r.content_review
            ) AS reviews
          FROM  review r, users u, films f2 
          WHERE r.movie_id = ${id}
          AND f2.id = r.movie_id 
          AND u.id = r.user_id
          GROUP BY r.id, u.login, f2.id
       ) r ON r.id = g.id 
       WHERE f.id = ${id}
       AND l.iso_639_1 = f.original_language
       GROUP BY f.id, l.english_name , g.genres, r.id
       LIMIT 1;
    `);
    return { result: movie.rows };
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
            AND f.status ILIKE '%${params.status}%'
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
    return { result: movie.rows };
  } catch (error) {
    return { error: error.message };
  }
};
