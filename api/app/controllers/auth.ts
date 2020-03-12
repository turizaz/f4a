import {sendConfirmationEmail, confirmEmail} from '../services/auth'
import * as authService from '../services/auth'
import userService from '../services/users'
import { _ } from 'lodash'
import {IUser} from '../db/queries/interfaces/Iusers'

const authController = {

  async refreshToken(ctx) {
    const {refreshToken} = ctx.request.body
    try {
      const user = await authService.getUserByRefreshToken(refreshToken)
      await authService.removeRefreshToken(refreshToken)
      ctx.cookies.set('token', `Bearer ${authService.createJWTToken({id: user.id, name: user.name})}`)
      ctx.cookies.set('refreshToken', await authService.createJWTRefreshToken(user.id))
      ctx.status = 200
    } catch (e) {
      ctx.status = 403
    }
  },

  async forgotPassword(ctx) {
    const {email} = ctx.request.body
    await userService.sendNewPassword(email)
    ctx.status = 200
  },

  async registration(ctx) {
    const {name, email, password} = ctx.request.body
    const user: IUser = await userService.createUser({name, email, password})
    const token = authService.createJWTToken(_.pick(user, ['id', 'name']))
    await sendConfirmationEmail(email);
    ctx.body = {name: user.name, token}
  },

  async login(ctx) {

    const {email, password} = ctx.request.body
    const user = await userService.checkUser({email, password})

    if (!user) {
      ctx.status = 403
      ctx.body = 'Wrong email or password'
      return
    }

    if (user && !user.verified) {
      ctx.body = 'Email not verified'
      ctx.status = 401
      return
    }

    ctx.cookies.set('token', `Bearer ${authService.createJWTToken({id: user.id, name: user.name})}`)
    const refreshToken = await authService.createJWTRefreshToken(user.id)

    ctx.cookies.set('refreshToken', refreshToken)
    ctx.body = {name: user.name}
    ctx.status = 200
  },

  async confirmEmail(ctx) {
    const {hash} = ctx.params;
    const user = await confirmEmail(hash)
    if (user) {
      const buff = new Buffer(user.name)
      const base64data = buff.toString('base64')
      return ctx.redirect(`/#${base64data}`)
    }
    return ctx.redirect('/')
  },

  async logout(ctx) {
    ctx.cookies.set('token', null)
    ctx.cookies.set('refreshToken', null)
    ctx.status = 200
    // ctx.redirect('/')
  },
};
export default authController


