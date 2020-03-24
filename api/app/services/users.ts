import * as userModel from '../db/queries/users'
import {IUser, IUserCredentials} from '../db/queries/interfaces/Iusers'
import * as bcrypt from 'bcryptjs'
import mailer from '../libs/mailer'

async function checkUser(userCred: IUserCredentials): Promise<null | IUser> {
    const user: IUser = await userModel.getSingleUserByEmail(userCred.email)
    if(user && bcrypt.compareSync(userCred.password, user.password)) {
        return user
    }
    return null
}
async function changePassword(password: string, id: string) {
    const user = await userModel.getSingleUser(id)
    return userModel.updateUser({...user, password})
}
async function sendNewPassword(email: string) {
    const newPassword = Math.random().toString(36).substring(7)
    const user = await userModel.getSingleUserByEmail(email)

    if (user) {
        mailer.sendMail({
            from: '"Football for everyone 👻" <f4econtacts@gmail.com>',
            to: email,
            subject: 'Your new password',
            text: 'Your new password',
            html: `<div>Your new password is - ${newPassword}</div>`,
        }, console.info)

        return userModel.updateUser({...user, password: newPassword})
    }
}

async function createUser(user: IUser): Promise<IUser> {
    return await userModel.addUser(user)
}

export default {
    createUser,
    checkUser,
    changePassword,
    sendNewPassword
}
