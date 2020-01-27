const knex = require('../../libs/knex');
import {IGame} from './Igames';
/**
 * Add game event
 * @param {{city_id, author_id, additional, address, lat, long}} game
 * @return {Bluebird<any>}
 */
function addGame(game) {
  console.log(game);
  return knex.transaction(async function(trx) {
    const id = await trx.insert(game)
        .into('games')
        .returning('id')
        .then((res) => res[0]);
    await trx.insert(
        {player_id: game.author_id, player_field_number: 1, game_id: id}
    )
        .into('games_composition');
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
           g.district,
           g.additional,
           g.date,
           gp.active_players as "activePlayers"
    from games as g
    join _cities c on g.city_id = c.city_id
    left join 
      (
        select
          coalesce(count(game_id), 0) as active_players,
          game_id
        from games_composition group by game_id
      ) 
    gp on gp.game_id = g.id 
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
                from games_composition where game_id = :id
                group by game_id) gp on gp.game_id = g.id where g.id = :id
                  `, {id}
  ).then((res) => res.rows[0]);
}
/**
 * @param {number} gameId
 * @return {*}
 */
function playerInGame(gameId) {
  return knex.raw(`
        select array_agg(player_field_number) 
        from games_composition where game_id = :gameId`, {gameId})
      .then((res)=> res.rows[0].array_agg);
}
/**
 * Joining or leaving the game
 * @param {number} playerId
 * @param {number} gameId
 * @param {number} playerFieldNumber
 * @return {Promise<{gameId: *, players}> | boolean}
 */
async function join(playerId, gameId, playerFieldNumber) {
  if (await checkIfPositionOccupied(playerFieldNumber, gameId, playerId)) {
    console.log('position occ');
    return;
  }

  let info:IGame.IInfo = {
    playerFieldNumber,
    gameId,
    playerId
  };
  if (await checkIfAlreadyJoin(playerFieldNumber, gameId, playerId)) {
    await leaveGame(playerFieldNumber, gameId, playerId);
    info.event = 'leaved';
  } else {
    await cleanPrevPosition(gameId, playerId);
    await joinGame(playerFieldNumber, gameId, playerId);
    info.event = 'joined';
  }
  info.fieldNumbersInGame =
    await knex.raw(`
    select array_agg(player_field_number)
    from games_composition where game_id = ?`, gameId)
        .then((res)=> res.rows[0]['array_agg']);
  const {count} = await countPlayersInGame(gameId);
  return {gameId, players: count, info};
}

/**
 * @param {number} playerFieldNumber
 * @param {number} gameId
 * @param {number} playerId
 * @return {Promise[]}
 */
function checkIfPositionOccupied(
    playerFieldNumber,
    gameId,
    playerId) {
  return knex('games_composition').where({
    player_field_number: playerFieldNumber,
    game_id: gameId,
  }).andWhereNot({player_id: playerId}).then((res)=>res[0]);
}
/**
 * @param {number} playerFieldNumber
 * @param {number} gameId
 * @param {number} playerId
 * @return {Promise[]}
 */
function checkIfAlreadyJoin(
    playerFieldNumber,
    gameId,
    playerId) {
  return knex('games_composition').where(
      {
        game_id: gameId,
        player_id: playerId,
        player_field_number: playerFieldNumber,
      }).then((res) => res[0]);
}
/**
 * @param {number} playerFieldNumber
 * @param {number} gameId
 * @param {number} playerId
 * @return {Promise[]}
 */
function leaveGame(playerFieldNumber, gameId, playerId) {
  return knex('games_composition').where({
    game_id: gameId,
    player_id: playerId,
    player_field_number: playerFieldNumber,
  }).del();
}
/**
 * @param {number} playerFieldNumber
 * @param {number} gameId
 * @param {number} playerId
 * @return {Promise[]}
 */
function joinGame(playerFieldNumber, gameId, playerId) {
  return knex('games_composition').insert({
    game_id: gameId,
    player_id: playerId,
    player_field_number: playerFieldNumber,
  });
}
/**
 * @param {number} gameId
 * @param {number} playerId
 * @return {Promise}
 */
function cleanPrevPosition(gameId, playerId) {
  return knex('games_composition').where({
    game_id: gameId,
    player_id: playerId,
  }).del();
}
/**
 * @param {number} gameId
 * @return {Promise[]}
 */
function countPlayersInGame(gameId) {
  return knex('games_composition').
      where({game_id: gameId}).
      count().
      then((res) => res[0]);
}
export {
  addGame,
  get,
  join,
  gamesForCity,
  playerInGame,
};
