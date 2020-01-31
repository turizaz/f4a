import * as Router from 'koa-router'
// const usersController = require('../controllers/user')
import usersController from '../controllers/user'
const userRouter = new Router({
  prefix: '/users',
});

userRouter.get('/:userById', usersController.get).
    patch('/:userById', usersController.patch).
    delete('/:userById', usersController.delete).
    get('/', usersController.list);

module.exports = userRouter