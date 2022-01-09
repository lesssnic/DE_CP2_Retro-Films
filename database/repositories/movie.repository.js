const pgClient = require('../dbconnect');

exports.getMovieById = async (id) => {
  try {
    const movie = await pgClient.query(`SELECT * FROM films WHERE id = ${id} LIMIT 1`);
    return { result: movie.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};
exports.getMovieByFilters = async ({ adult, title, release_date_first, release_date_last, revenue_min, revenue_max, status, budget_min, budget_max, popularity_min, popularity_max, page, pre_page }) => {
  try {
    const first = (page * pre_page) - pre_page;

    const movie = await pgClient.query(`
      SELECT * FROM films films 
      WHERE films.title ILIKE '%${title}%' 
            AND films.release_date BETWEEN '${release_date_first}' AND '${release_date_last}'
            AND films.revenue BETWEEN ${revenue_min} AND ${revenue_max}
            AND films.status LIKE '%${status}%'
            AND films.adult = '${adult}'
            AND films.budget BETWEEN ${budget_min} AND ${budget_max} 
            AND films.popularity BETWEEN ${popularity_min} AND ${popularity_max}
      offset ${first} LIMIT ${pre_page}
      `);

    return { result: { totalCount: movie.rows.length, data: movie.rows, currentPage: page } };
  } catch (e) {
    return { error: e.message };
  }
};