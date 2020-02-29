import {IUser} from './Iusers'

export interface IRefreshToken {
    id: string,
    user_id: string,
    user: IUser
}

export interface IUserInfo {
    id: string
    user: IUser
}
