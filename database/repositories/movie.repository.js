const pgClient = require('../dbconnect');

exports.getMovieById = async (id) => {
  try {
    const movie = await pgClient.query(`
    SELECT f.*, l.english_name as language_in_en, g.genres , JSON_AGG(r.reviews) as reviews 
     FROM films f left join languages l on f.original_language = l.iso_639_1,
     (
     	SELECT f1.id, STRING_AGG(g."name" , ', ') as genres FROM genres g, films f1, films_genres fg 
		WHERE f1.id = ${id}
			and f1.id = fg.films_id 
			AND g.id = fg.genre_id 
			group by f1.id 
		LIMIT 1
     ) g left join 
     (
     select f2.id, 
    JSON_BUILD_OBJECT(
    	'review_id', r.id,
        'login', u.login ,
        'content', r.content_review
        ) as reviews
      from  review r, users u, films f2 
      where r.movie_id = ${id}
      and f2.id = r.movie_id 
            AND u.id = r.user_id
            group by r.id, u.login, f2.id
     ) r on r.id = g.id 
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
