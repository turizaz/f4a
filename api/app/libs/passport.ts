import * as passport from 'koa-passport'
import config from '../config'
import * as passportCustom from 'passport-custom';
import {IUser} from '../db/queries/interfaces/Iusers';
import * as authService from '../services/auth';
import * as GoogleStrategy from 'passport-google-oauth20'
const CustomStrategy = passportCustom.Strategy;
passport.use('google', new GoogleStrategy.Strategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_REDIRECT_URI
    },
    (accessToken , refreshToken, profile, done) => {
        return done(null, profile, accessToken);
    }
));

localStrategies()

function localStrategies() {
    const opts: any = {};
    const cookieExtractor = (ctx) => {
        try {
            return ctx.cookies.request.headers.cookie.split(';')[0].split('token=Bearer ')[1]
        } catch (e) {
            return false
        }
    };
    opts.secretOrKey = config.JWT_SECRET;
    opts.jwtFromRequest = cookieExtractor;

    passport.use('jwt', new CustomStrategy(
        async (req, cb) => {
            try {
                const token = req.ctx.cookie.token.replace('Bearer ', '');
                const user = authService.verifyToken(token);
                return cb(null, {id: user.id, name: user.name});
            } catch (e) {
                return cb(null, false);
            }
        }
    ));
    passport.use('jwt-refresh', new CustomStrategy(
        async (req, cb) => {
            try {
                const refreshToken = req.ctx.cookie.refreshToken;
                const user: IUser = await authService.getUserByRefreshToken(refreshToken);
                if(!user) {
                    return cb(null, false)
                }
                const newRefreshToken = await authService.createJWTRefreshToken(user.id);
                const userPayload = {
                    id: user.id,
                    name: user[user.type].name
                };
                const token = authService.createJWTToken(userPayload);
                authService.setAuthTokens(token, newRefreshToken, req.ctx)
                return cb(null, userPayload);
            } catch (e) {
                return cb(null, false);
            }
        }
    ));
}

export default passport
