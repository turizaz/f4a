const users = require('../queries/users');
exports.seed = function(knex, Promise) {
  return knex('users')
      .del()
      .then(function() {
        return users.addUser({
          name: 'username',
          email: 'user-email',
          password: 'user-password',
        });
      });
};
