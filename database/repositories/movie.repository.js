const pgClient = require('../dbconnect');

exports.getMovieById = async (id) => {
  try {
    const movie = await pgClient.query(`SELECT * FROM films WHERE id = ${id} LIMIT 1`);
    return { result: movie.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};
exports.getMovieByFilters = async ({ adult, title, release_date_first, release_date_last, revenue_min, revenue_max, status, budget_min, budget_max, language, page, pre_page }) => {
  try {
    const first = (page * pre_page) - pre_page;
    const movie = await pgClient.query(
    `SELECT * FROM (SELECT * FROM films offset ${first || 0} LIMIT ${pre_page || 1000}) page 
                   WHERE page.adult = '${adult}' ${
                          title ? `AND page.title ILIKE '%${title}%'`: ''} ${
                          release_date_first && release_date_last ?
                              `AND page.release_date BETWEEN '${release_date_first}' AND '${release_date_last}'` : '' }${
                          revenue_min && revenue_max ? 
                             `AND page.revenue BETWEEN ${revenue_min} AND ${revenue_max}` : ''} ${
                          status ? 
                              `AND page.status = '${status}'` : ''}${
                          budget_min && budget_max ?
                              `AND page.budget BETWEEN ${budget_min} AND ${budget_max}` : ''} ${
                          language ? `AND page.original_language = '${language}'` : ''}`);
    
    return { result: { totalCount: movie.rows.length, data: movie.rows, currentPage: page } };
  } catch (e) {
    return { error: e.message };
  }
};