import * as Router from 'koa-router'
import authController from '../controllers/auth'
import passport from '../libs/passport'
const authRoutes = new Router({prefix: '/auth'})
const googleScope = passport.authenticate('google', {scope: ['openid', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], session: false});
const passportMiddleware = passport.authenticate(['jwt', 'jwt-refresh'], {session: false})

authRoutes
    .get('/confirm-email/:hash', authController.confirmEmail)
    .post('/registration', authController.registration)
    .post('/forgot-password', authController.forgotPassword)
    .post('/change-password', passportMiddleware, authController.changePassword)
    .post('/login', authController.login)
    .post('/logout', authController.logout)
    .get('/google', googleScope)
    .get('/ping', passportMiddleware, authController.ping)
    .get('/google/oauth/callback', googleScope, authController.googleOAuth)
    .get('/gmail/oauth/callback', googleScope, authController.gmailOAuthCallback)

module.exports = authRoutes;
