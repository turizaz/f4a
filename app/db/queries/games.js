const knex = require('../../libs/knex');

/**
 * Add game event
 * @param {{city_id, author_id, additional, address, lat, long}} game
 * @return {Bluebird<any>}
 */
function addGame(game) {
  return knex.transaction(async function(trx) {
    const id = await trx.insert(game)
        .into('games')
        .returning('id')
        .then((res) => res[0]);
    await trx.insert([{player_id: game.author_id, game_id: id}])
        .into('games_players');
    return id;
  });
}

/**
 * @param {number} cityId
 * @return {Knex.Raw}
 */
function gamesForCity(cityId) {
  return knex.raw(
      `
    select g.id,
           c.title_ru as city,
           g.address,
           g.players,
           g.date
    from games as g
    join _cities c on g.city_id = c.city_id
    where c.city_id = ?
    and g.status = 'forming'
    and g.date > CURRENT_TIMESTAMP + interval '2h'
  `,
      [cityId]
  );
}

/**
 * Getter for games
 * @param {number} id
 * @return {Knex.Raw}
 */
function get(id) {
  return knex.raw(
      `select *,
            c.title_ru as city,
            case when gp.active_players
              is null then 0 else gp.active_players end as active_players
            from games g
              join _cities c on g.city_id = c.city_id
              left join (
                select count(*)::int as active_players, game_id
                from games_players where game_id = :id
                group by game_id) gp on gp.game_id = g.id where g.id = :id
                  `, {id}
  ).then((res) => res.rows[0]);
}
/**
 * Join game event
 * @param {number} playerId
 * @param {number} gameId
 * @return {Knex.QueryBuilder}
 */
async function join(playerId, gameId) {
  const playsGames = await knex('games_players')
      .where({game_id: gameId, player_id: playerId})
      .then((res)=> res[0]);
  playsGames ?
    await knex('games_players').where({game_id: gameId, player_id: playerId})
        .del() :
    await knex('games_players').insert({game_id: gameId, player_id: playerId});
  return !Boolean(playsGames);
}

module.exports = {
  addGame,
  get,
  join,
  gamesForCity,
};


