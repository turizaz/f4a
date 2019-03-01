'use strict';

const Router = require('koa-router');
const authRoutes = new Router({
  prefix: '/auth',
});
const authController = require('../controllers/auth');

authRoutes
    .post('/registration', authController.registration)
    .post('/login', authController.login)
    .post('/login-jwt', authController.loginJwt)
    .post('/logout', authController.logout);
module.exports = authRoutes;
