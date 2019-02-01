exports.up = function(knex, Promise) {
  return knex.raw(`
    create table users
    (
      id serial primary key,
      name     varchar(40) unique,
      email    varchar(40) unique,
      password text
    );
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    drop table users;
  `);
};
