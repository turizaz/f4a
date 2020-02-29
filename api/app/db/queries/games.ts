import knex from '../../libs/knex'
import {IGame} from './interfaces/Igames'
import * as Knex from 'knex';

/**
 * Add game to game list for city, return if of a game
 */
function addGame(game: IGame.IGame): Promise<number> {
  return knex.transaction(async function(trx) {
    const id: number = await trx.insert(game)
        .into('games')
        .returning('id')
        .then((res) => res[0]);
    await trx.insert(
        {
          player_id: game.author_id,
          player_field_number: 1,
          game_id: id
        })
        .into('games_composition');
    return id;
  });
}

/**
 * Get games for city not not earlier then 2 hours from current time
 */
function gamesForCity(cityId: number): Knex.QueryBuilder {
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
 */
function get(id: number) {
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

function playerInGame(gameId: number) {
  return knex.raw(`
        select array_agg(player_field_number) 
        from games_composition where game_id = :gameId`, {gameId})
      .then((res)=> res.rows[0].array_agg);
}
/**
 * Joining or leaving the game
 */
async function join(
    playerId: number,
    gameId: number,
    playerFieldNumber: number) {
  if (await checkIfPositionOccupied(playerFieldNumber, gameId, playerId)) {
    console.log('position already taken');
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

function checkIfPositionOccupied(
    playerFieldNumber: number,
    gameId: number,
    playerId: number) {
  return knex('games_composition').where({
    player_field_number: playerFieldNumber,
    game_id: gameId,
  }).andWhereNot({player_id: playerId}).then((res)=>res[0]);
}

function checkIfAlreadyJoin(
    playerFieldNumber: number,
    gameId: number,
    playerId: number) {
  return knex('games_composition').where(
      {
        game_id: gameId,
        player_id: playerId,
        player_field_number: playerFieldNumber,
      }).then((res) => res[0]);
}

function leaveGame(
    playerFieldNumber: number,
    gameId: number,
    playerId: number) {
  return knex('games_composition').where({
    game_id: gameId,
    player_id: playerId,
    player_field_number: playerFieldNumber,
  }).del();
}

function joinGame(
    playerFieldNumber: number,
    gameId: number,
    playerId: number) {
  return knex('games_composition').insert({
    game_id: gameId,
    player_id: playerId,
    player_field_number: playerFieldNumber,
  });
}

function cleanPrevPosition(gameId: number, playerId: number) {
  return knex('games_composition').where({
    game_id: gameId,
    player_id: playerId,
  }).del();
}
function countPlayersInGame(gameId: number) {
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
