exports.up = function(knex, Promise) {
  return knex.raw(`
    create table users
    (
      id serial primary key,
      name     varchar(40),
      email    varchar(40) unique,
      verified boolean not null default false,
      password text
    );
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    drop table if exists users;
  `);
};
