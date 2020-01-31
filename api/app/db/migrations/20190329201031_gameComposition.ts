exports.up = function(knex, Promise) {
  return knex.raw(`
    create table games_composition
    (
      game_id  integer references games(id),
      player_id integer references users(id),
      player_field_number integer,
      primary key (game_id, player_id, player_field_number)
    );
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    drop table games_composition
  `);
};
