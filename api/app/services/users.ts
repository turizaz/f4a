import * as userModel from '../db/queries/users'
import {IGoogleUser, IUser, IUserCredentials} from '../db/queries/interfaces/Iusers'
import * as bcrypt from 'bcryptjs'
import mailer from '../services/mailer'
import * as authService from '../services/auth'
async function checkUser(userCred: IUserCredentials): Promise<null | IUser> {
    const user: IUser = await userModel.getSingleUserByEmail(userCred.email)
    if(user && bcrypt.compareSync(userCred.password, user.local.password)) {
        return user
    }
    return null
}
async function changePassword(password: string, id: string) {
    return await userModel.updateLocalPassword(id, password)
}
async function gerUserByEmail(email: string): Promise<IUser> {
    return userModel.getSingleUserByEmail(email)
}
async function storeGoogleUser(user: IGoogleUser) {
    return userModel.storeGoogleUser(user);
}
async function getGoogleUserByEmail(email: string): Promise<IUser> {
    return userModel.getGoogleUserByEmail(email)
}
async function sendNewPassword(email: string) {
    const newPassword = Math.random().toString(36).substring(7)
    const user = await userModel.getSingleUserByEmail(email)
    if(!user) {
        return
    }
    await mailer.sendNewPassword(email, newPassword)
    return await userModel.updateLocalPassword(user.id, newPassword)
}

async function createLocalUser(user: {name: string, email: string, password: string}): Promise<IUser> {
    console.log('before created')
    const u: IUser = await userModel.addLocalUser(user)
    // console.log('user created')
    // await authService.sendConfirmationEmail(user.email)
    // console.log('email sent')
    return u
}

export default {
    createLocalUser,
    checkUser,
    getGoogleUserByEmail,
    storeGoogleUser,
    gerUserByEmail,
    changePassword,
    sendNewPassword
}
