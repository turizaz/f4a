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
};
