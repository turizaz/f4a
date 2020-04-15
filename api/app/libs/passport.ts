import * as Jwt from 'passport-jwt'
import * as passport from 'koa-passport'
import {_} from 'lodash'
import  * as userModel from '../db/queries/users'
import config from '../config'
import * as passportCustom from 'passport-custom';
import {IUser} from '../db/queries/interfaces/Iusers';
import * as authService from '../services/auth';
import authModel from '../db/queries/auth';
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
    passport.use(new Jwt.Strategy(opts, async (payload, done) => {
        const {id} = payload;
        const user: IUser = await userModel.getSingleUser(id);
        if(!user) {
            return done(null, false)
        }
        if (user) {
            const userPayload = {
                id: user.id,
                name: user.local.name || user.google.name
            };
            return done(null, userPayload)
        }
    }));
    passport.use('jwt-refresh', new CustomStrategy(
        async (req, cb) => {
            try {
                const refreshToken = req.header.cookie.split('refreshToken=')[1].split(';')[0];
                const user: IUser = await authService.getUserByRefreshToken(refreshToken);
                if(!user) {
                    return cb(null, false)
                }
                const newRefreshToken = await authService.createJWTRefreshToken(user.id);
                await authModel.removeRefreshToken(refreshToken);
                const userPayload = {
                    id: user.id,
                    name: user.local.name || user.google.name
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
