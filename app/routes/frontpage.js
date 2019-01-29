'use strict';

const Router = require('koa-router');
const frontpage = require('../controllers/frontpage');
const frontPageRoutes = new Router({});

frontPageRoutes
    .get('/', frontpage.get)
    .get('/registration', frontpage.registration)
    .post('/registration', frontpage.registrationPost)
    .post('/login', frontpage.login)
    .post('/login-jwt', frontpage.loginJwt)
    .post('/logout', frontpage.logout);

module.exports = frontPageRoutes;
