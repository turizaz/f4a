
exports.up = function(knex, Promise) {
  return knex.raw(`
    create type games_status as 
    enum('forming', 'active', 'finished', 'cancelled');
    
    create table games
    (
      id serial primary key,
      city_id     integer references _cities(city_id),
      author_id integer references users(id),
      additional text,
      address text,
      lat float,
      long float,
      players integer,
      date timestamp,
      date_created timestamp default now(),
      status games_status default 'forming'
    );
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    drop table if exists games;
    drop type if exists games_status;
  `);
};
