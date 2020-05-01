import * as users from '../queries/users'
exports.seed = (knex, Promise) => {
  return knex('users')
      .then(() => {
        return users.addLocalUser({
          name: 'username0',
          email: 'user-email0',
          password: 'user-password0',
          verified: true
        });
      })
      .then(() => {
        return users.addLocalUser({
          name: 'username',
          email: 'user@email.com',
          password: 'user-password',
          verified: true
        });
      });
};
