const passport = require('koa-passport');
const knex = require('../../libs/knex');

// паспорт напрямую с базой не работает
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  return knex('users')
      .where({email})
      .first()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
});
