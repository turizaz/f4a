export const JWT_TTL = '5m'
export const JWT_REFRESH_TTL = '7d'
import {_} from 'lodash'
import config from '../config'
import {decrypt} from './crypto'
import * as userModel from '../db/queries/users'
import * as jwt from 'jsonwebtoken'
import authModel from '../db/queries/auth'
import {IUser} from '../db/queries/interfaces/Iusers'
import { v1 as uuidv1 } from 'uuid'
import mailer from '../services/mailer'

export function sendConfirmationEmail(email: string) {
  return mailer.sendConfirmationEmail(email)
}
async function storeJWTRefreshToken(data) {
  return await authModel.storeRefreshToken(data)
}
export function createJWTToken({id, name}) {
  return jwt.sign({id, name}, config.JWT_SECRET, { expiresIn: JWT_TTL })
}
export async function createJWTRefreshToken(userId: number): Promise<string> {
  const id = uuidv1();
  const token = jwt.sign({id, user_id: userId}, config.JWT_SECRET, { expiresIn: JWT_REFRESH_TTL });
  await storeJWTRefreshToken({id: token, user_id: userId});
  return token
}
export async function confirmEmail(hash: string): Promise<IUser> {
  const email = decrypt(hash);
  return await userModel.confirmEmail(email)
}
export async function getUserByRefreshToken(token: string): Promise<IUser> {
  const {user_id} = await authModel.checkRefreshToken(token);
  return await userModel.getSingleUser(user_id)
}
export function setAuthTokens(token, refreshToken, ctx) {
  ctx.cookies.set('date', Date.now());
  ctx.cookies.set('token', `Bearer ${token}`);
  ctx.cookies.set('refreshToken', refreshToken);
}
export function hashObject(obj: any): string {
  const buff = new Buffer(JSON.stringify({...obj}));
  return buff.toString('base64');
}
export async function authenticateUser(user: IUser, ctx): Promise<void> {
  const token = createJWTToken({id: user.id, name: user[user.type].name});
  const refreshToken = await createJWTRefreshToken(user.id);
  setAuthTokens(token, refreshToken, ctx);
}
export function verifyToken(hash): {id: string, name: string} {
  return jwt.verify(hash, config.JWT_SECRET);
}

