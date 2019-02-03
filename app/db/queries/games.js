const knex = require('../../libs/knex');

/**
 * Add game event
 * @param {{city_id, author_id, additional, address, lat, long}} game
 * @return {Knex.QueryBuilder}
 */
function addGame(game) {
  return knex('games')
      .insert(game)
      .returning('*');
}
module.exports = {
  addGame,
};


