const pgClient = require('../dbconnect');

exports.getMovieById = async (id) => {
  try {
    const movie = await pgClient.query(`SELECT * FROM films WHERE id = ${id} LIMIT 1`);
    return { result: movie.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};
exports.getMovieByFilters = async (params) => {
  try {
    const first = (params.page * params.pre_page) - params.pre_page;

    const movie = await pgClient.query(`
      SELECT * FROM films films 
      WHERE films.title ILIKE '%${params.title}%' 
            AND films.release_date BETWEEN '${params.release_date_first}' AND '${params.release_date_last}'
            AND films.revenue BETWEEN ${params.revenue_min} AND ${params.revenue_max}
            AND films.status LIKE '%${params.status}%'
            AND films.adult = '${params.adult}'
            AND films.budget BETWEEN ${params.budget_min} AND ${params.budget_max} 
            AND films.popularity BETWEEN ${params.popularity_min} AND ${params.popularity_max}
      offset ${first} LIMIT ${params.pre_page}
      `);

    return { result: { count: movie.rows.length, data: movie.rows, currentPage: params.page } };
  } catch (e) {
    return { error: e.message };
  }
};