import {_} from 'lodash'
import * as authService from '../services/auth'
export default async (ctx, next) => {
  try {
    const data = await authService.tokenVerification(ctx.cookies.get('token'), ctx.cookies.get('refreshToken'))
    if (!data) {
      ctx.throw(403)
    }
    ctx.user = _.pick(data, ['id', 'name'])
  } catch (e) {
    ctx.throw(403)
  }
  await next()
}
