import authMiddleware from '../middleware/auth'
import * as Router from 'koa-router'
import authController from '../controllers/auth'

const authRoutes = new Router({prefix: '/auth'});
authRoutes
    .get('/confirm-email/:hash', authController.confirmEmail)
    .post('/registration', authController.registration)
    .post('/refresh-token', authController.refreshToken)
    .post('/forgot-password', authController.forgotPassword)
    .post('/change-password', authMiddleware, authController.changePassword)
    .post('/login', authController.login)
    .post('/logout', authController.logout);
module.exports = authRoutes;
