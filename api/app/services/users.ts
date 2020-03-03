import * as userModel from '../db/queries/users'
import {IUser, IUserCredentials} from '../db/queries/interfaces/Iusers'
import * as bcrypt from 'bcryptjs'

async function checkUser(userCred: IUserCredentials): Promise<null | IUser> {
    const user: IUser = await userModel.getSingleUserByEmail(userCred.email)
    if(user && bcrypt.compareSync(userCred.password, user.password)) {
        return user
    }
    return null
}
async function sendNewPassword(email: string) {
    const newPassword = '222'
    const user = await userModel.getSingleUserByEmail(email)
    const res = await userModel.updateUser({...user, password: newPassword})
    console.log(res)
    return res
}

async function createUser(user: IUser): Promise<IUser> {
    return await userModel.addUser(user)
}

export default {
    createUser,
    checkUser,
    sendNewPassword
}
