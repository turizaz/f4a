const users = require('../queries/users');
exports.seed = function(knex, Promise) {
  return knex('users')
      .then(function() {
        return users.addUser({
          name: 'username0',
          email: 'user-email0',
          password: 'user-password0',
        });
      })
      .then(function() {
        return users.addUser({
          name: 'username',
          email: 'user@email.com',
          password: 'user-password',
        });
      });

  // return knex('users')
  //     .del()
  //     .then(function() {
  //       // Inserts seed entries
  //       return knex('users').insert([
  //         {name: 'test1', email: 'test1@gmail.com', password: '$2a$10$XcX0xUuJOfB47qUGJY/jOOdyZrTL43vBcqPgD1wccXnphzvEPYFiK'},
  //         {name: 'test2', email: 'test2@gmail.com', password: '$2a$10$XcX0xUuJOfB47qUGJY/jOOdyZrTL43vBcqPgD1wccXnphzvEPYFiK'},
  //       ]);
  // });
};
