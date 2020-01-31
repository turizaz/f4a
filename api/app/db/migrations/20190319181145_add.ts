
exports.up = function(knex, Promise) {
  return knex.raw('alter table games add column district text');
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table games drop column if exists district');
};
