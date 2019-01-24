'use strict';

const Router = require('koa-router');
const frontpage = require('../controllers/frontpage');
const frontPageRoutes = new Router({});

frontPageRoutes.get('/', frontpage.get)
    .get('/registration', frontpage.registration)
    .post('/registration', frontpage.registrationPost)
    .post('/login', frontpage.login)
    .post('/logout', frontpage.logout);

module.exports = frontPageRoutes;
