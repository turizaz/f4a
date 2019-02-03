
exports.up = function(knex, Promise) {
  return knex.raw(`
    create table games
    (
      id serial primary key,
      city_id     integer references _cities(city_id),
      author_id integer references users(id),
      additional text,
      address text,
      lat float,
      long float,
      players integer
    );
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    drop table games;
  `);
};
