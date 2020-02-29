import {getSingleUserByEmail, addUser} from '../db/queries/users'
import {IUser, IUserCredentials} from '../db/queries/interfaces/Iusers'
import * as bcrypt from 'bcryptjs'

async function checkUser(userCred: IUserCredentials): Promise<null | IUser> {
    const user: IUser = await getSingleUserByEmail(userCred.email)
    if(user && bcrypt.compareSync(userCred.password, user.password)) {
        return user
    }
    return null
}

async function createUser(user: IUser): Promise<IUser> {
    return await addUser(user)
}

export default {
    createUser,
    checkUser
}
