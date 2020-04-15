import authMiddleware from '../middleware/auth'
import * as Router from 'koa-router'
import authController from '../controllers/auth'
import passport from '../libs/passport'
const authRoutes = new Router({prefix: '/auth'})
const googleScope = passport.authenticate('google', {scope: ['openid', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], session: false});
authRoutes
    .get('/confirm-email/:hash', authController.confirmEmail)
    .post('/registration', authController.registration)
    .post('/refresh-token', authController.refreshToken)
    .post('/forgot-password', authController.forgotPassword)
    .post('/change-password', authMiddleware, authController.changePassword)
    .post('/login', authController.login)
    .post('/logout', authController.logout)
    .get('/google', googleScope,  authController.secretRoute)
    .get('/google/oauth/callback', googleScope, authController.googleOAuth)

module.exports = authRoutes;
