const usersController = require('./user');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const jwtsecret = 'mysecretkey'; // ключ для подписи JWT

module.exports = {
  async get(ctx) {
    if (ctx.isAuthenticated()) {
      ctx.body = ctx.render('welcome');
    } else {
      ctx.body = ctx.render('login');
    }
  },
  async registration(ctx) {
    ctx.body = ctx.render('registration');
  },

  async registrationPost(ctx) {
    await usersController.post(ctx);
    ctx.redirect('/');
  },
  async login(ctx, next) {
    await passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: true,
    })(ctx, next);
  },

  async loginJwt(ctx, next) {
    await passport.authenticate('local', function(err, user) {
      if (user === false) {
        ctx.body = 'Login failed';
      } else {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, jwtsecret);
        ctx.body = {token};
      }
    })(ctx, next);
  },

  async logout(ctx, next) {
    ctx.session = null;
    ctx.redirect('/');
  },
};
