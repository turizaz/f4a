'use strict';

const Router = require('koa-router');
const usersController = require('../controllers/user');

const userRouter = new Router({
  prefix: '/users',
});

userRouter.post('/', usersController.post).
    get('/:userById', usersController.loadUserById, usersController.get).
    patch('/:userById', usersController.loadUserById, usersController.patch).
    delete('/:userById', usersController.loadUserById, usersController.delete).
    get('/', usersController.list);

module.exports = userRouter;
