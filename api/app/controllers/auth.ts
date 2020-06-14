import * as authService from '../services/auth'
import userService from '../services/users'
import { _ } from 'lodash'
import {EMAIL_NOT_VERIFIED, WRONG_PASSWORD} from '../templates/errors';

const authController = {

  async forgotPassword(ctx)
  {
    const {email} = ctx.request.body;
    await userService.sendNewPassword(email);
    ctx.status = 200
  },

  async changePassword(ctx)
  {
    const {id} = ctx.req.user;
    await userService.changePassword(ctx.request.body.password, id);
    ctx.status = 200
  },

  async registration(ctx)
  {
    const {name, email, password} = ctx.request.body
    await userService.createLocalUser({name, email, password});
    ctx.status = 200;
  },

  async login(ctx)
  {
    const {email, password} = ctx.request.body;
    const user = await userService.checkUser({email, password});
    if (!user) { throw WRONG_PASSWORD }
    if (!user.local.verified) { throw EMAIL_NOT_VERIFIED }
    await authService.authenticateUser(user, ctx);
    ctx.body = {name: user.local.name};
  },

  async logout(ctx)
  {
    ctx.cookies.set('token', null);
    ctx.cookies.set('refreshToken', null);
    ctx.status = 200
  },

  async confirmEmail(ctx)
  {
    const user = await authService.confirmEmail(ctx.params.hash);
    if(!user) {return ctx.redirect('/')}
    const base64data = authService.hashObject({name: user.local.name, type: 'local'});
    await authService.authenticateUser(user, ctx);
    return ctx.redirect(`/#${base64data}`)
  },

  async googleOAuth(ctx)
  {
    const email: string = ctx.req.user.emails[0].value;
    const name : string = ctx.req.user.displayName;
    let user = await userService.getGoogleUserByEmail(email)
    if (!user) {
      user = await userService.storeGoogleUser({name, email});
    }
    await authService.authenticateUser(user, ctx);
    const base64data = authService.hashObject({name, type: 'google'});
    return ctx.redirect(`/#${base64data}`)
  },
  async ping(ctx)
  {
    ctx.status = 200
  }
};
export default authController
