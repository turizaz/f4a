exports.up = function(knex, Promise) {
  return knex.raw(`
    create table games_players
    (
      game_id  integer references games(id),
      player_id integer references users(id),
      primary key (game_id, player_id)
    );
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
     drop table if exists games_players;
  `);
};
