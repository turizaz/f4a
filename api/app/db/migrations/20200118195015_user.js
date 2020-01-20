
exports.up = function(knex, Promise) {
  return knex.raw(`
    alter table users add verified boolean default false not null;
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    alter table users drop column verified;
  `);
};
