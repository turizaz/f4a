import {sendConfirmationEmail, confirmEmail} from '../services/auth'
import * as authService from '../services/auth'
import userService from '../services/users'
import { _ } from 'lodash'
import {IUser} from '../db/queries/interfaces/Iusers'

const authController = {

  // async refreshToken(ctx) {
  //   const {refreshToken} = ctx.request.body;
  //   try {
  //     const user = await authService.getUserByRefreshToken(refreshToken);
  //     await authService.removeRefreshToken(refreshToken);
  //     ctx.cookies.set('token', `Bearer ${authService.createJWTToken({id: user.id, name: user.local.name || user.google.name})}`);
  //     ctx.cookies.set('refreshToken', await authService.createJWTRefreshToken(user.id));
  //     ctx.status = 200
  //   } catch (e) {
  //     ctx.status = 403
  //   }
  // },

  async forgotPassword(ctx) {
    const {email} = ctx.request.body;
    await userService.sendNewPassword(email);
    ctx.status = 200
  },

  async changePassword(ctx) {
    const {password} = ctx.request.body;
    try {
      await userService.changePassword(password, ctx.user.id);
      ctx.status = 200
    } catch (e) {
      ctx.status = 500
    }
  },

  async registration(ctx) {
    const {name, email, password} = ctx.request.body
    const user: IUser = await userService.createLocalUser({name, email, password});
    const token = authService.createJWTToken({id: user.id, name: user.local.name});
    await sendConfirmationEmail(email);
    ctx.body = {name: user.local.name, token}
  },

  async login(ctx) {
    const {email, password} = ctx.request.body;
    const user = await userService.checkUser({email, password});
    if (!user) {
      ctx.status = 403;
      ctx.body = 'Wrong email or password';
      return
    }
    if (user && !user.local.verified) {
      ctx.body = 'Email not verified';
      ctx.status = 401;
      return
    }
    const token = authService.createJWTToken({id: user.id, name: user.local.name});
    const refreshToken = await authService.createJWTRefreshToken(user.id);
    authService.setAuthTokens(token, refreshToken, ctx);
    ctx.body = {name: user.local.name};
    ctx.status = 200
  },
  async confirmEmail(ctx) {
    const {hash} = ctx.params;
    const user = await confirmEmail(hash);
    if (user) {
      const buff = new Buffer(JSON.stringify({name: user.local.name, type: 'local'}));
      const base64data = buff.toString('base64');

      const token = authService.createJWTToken({id: user.id, name: user.local.name});
      const refreshToken = await authService.createJWTRefreshToken(user.id);
      authService.setAuthTokens(token, refreshToken, ctx);
      return ctx.redirect(`/#${base64data}`)
    }
    return ctx.redirect('/')
  },

  async logout(ctx) {
    ctx.cookies.set('token', null);
    ctx.cookies.set('refreshToken', null);
    ctx.status = 200
  },
  secretRoute(ctx) {
    ctx.status = 200;
  },
  async googleOAuth(ctx) {
    try {
      const email: string = ctx.req.user.emails[0].value;
      const name : string = ctx.req.user.displayName;
      const user = await userService.getGoogleUserByEmail(email)
      if (!user) {
        await userService.storeGoogleUser({
          name,
          email: ctx.req.user.emails[0].value
        });
      }
      const token = authService.createJWTToken({id: user.id, name});
      const refreshToken = await authService.createJWTRefreshToken(user.id);
      authService.setAuthTokens(token, refreshToken, ctx);
      const buff = new Buffer(JSON.stringify({name, type: 'google'}));
      const base64data = buff.toString('base64');
      return ctx.redirect(`/#${base64data}`)
    } catch (e) {
      return ctx.redirect(`/`)
    }
  }
};
export default authController
