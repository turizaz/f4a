exports.up = function(knex, Promise) {
  return knex.raw(`
    create table messages
    ( 
      id serial primary key,
      game_id  integer references games(id),
      user_id integer references users(id),
      date timestamp  not null default now(),
      text text
    );
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    drop table messages
  `);
};
