const usersController = require('./user');
const passport = require('koa-passport');

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
  async logout(ctx, next) {
    ctx.session = null;
    ctx.redirect('/');
  },
};
