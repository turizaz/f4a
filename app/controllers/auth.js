require('dotenv').load();
const users = require('../db/queries/users');

const {JWT_SECRET} = process.env;
/**
 * @type {{authenticate}}
 */
const passport = require('koa-passport');
/**
 * @type {{sign}}
 */
const jwt = require('jsonwebtoken');
const jwtSecret = JWT_SECRET;

module.exports = {
  async registration(ctx) {
    const {name, email, password} = ctx.request.body;
    const user = await users.addUser({
      name, email, password,
    });
    ctx.status = 201;
    ctx.body = {email: user[0].email};
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
        ctx.status = 401;
        ctx.body = 'Login failed';
      } else {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, jwtSecret);
        ctx.body = {token};
      }
    })(ctx, next);
  },
  async logout(ctx, next) {
    ctx.session = null;
    ctx.redirect('/');
  },
};
