export const JWT_TTL = '1s';
export const JWT_REFRESH_TTL = '7d';
import {_} from 'lodash'
const {JWT_SECRET} = process.env;
import {encrypt, decrypt} from './crypto'
import * as userModel from '../db/queries/users'
import mailer from '../libs/mailer'
import * as jwt from 'jsonwebtoken'
import authModel from '../db/queries/auth'
import {IUser} from '../db/queries/interfaces/Iusers'
import { v1 as uuidv1 } from 'uuid'

export function sendConfirmationEmail(email: string) {
  const template = `<b>To confirm your account</b>
  <a href="${process.env.HOST}/api/auth/confirm-email/${encrypt(email)}">
      Click here
  </a>`;
  mailer.sendMail({
    from: '"Football for everyone 👻" <f4econtacts@gmail.com>',
    to: email,
    subject: 'Confirm email account ✔',
    text: 'Confirm your email account?',
    html: template,
  })
}
async function storeJWTRefreshToken(data) {
  return await authModel.storeRefreshToken(data)
}
export function createJWTToken({id, name}) {
  return jwt.sign({id, name}, JWT_SECRET, { expiresIn: JWT_TTL })
}
export function removeRefreshToken(token: string) {
  return authModel.removeRefreshToken(token)
}
// tslint:disable-next-line
export async function createJWTRefreshToken(user_id: number): Promise<string> {
  const id = uuidv1();
  const token = jwt.sign({id, user_id}, JWT_SECRET, { expiresIn: JWT_REFRESH_TTL });
  await storeJWTRefreshToken({id: token, user_id});
  return token
}

export async function confirmEmail(hash: string): Promise<any> {
  const email = decrypt(hash);
  return await userModel.confirmEmail(email)
}

export async function getUserByRefreshToken(token: string): Promise<IUser> {
  const {user_id} = await authModel.checkRefreshToken(token);
  return await userModel.getSingleUser(user_id)
}


export async function tokenVerification(
    token: string,
    refreshTokenString: string): Promise<IUser & {refreshToken?: string}>{
  try {
    const u: IUser = jwt.verify(token.split(' ')[1], JWT_SECRET);
    return _.pick(u, ['name', 'id'])
  }
  catch (e) {
    const user: IUser = await getUserByRefreshToken(refreshTokenString);
    const refreshToken = await createJWTRefreshToken(user.id);
    await authModel.removeRefreshToken(refreshToken);
    return {... user, refreshToken}
  }
}
