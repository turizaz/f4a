export interface IUser {
    id?: number,
    email: string,
    name: string,
    password: string
    verified?: boolean | null
}
export interface IUserCredentials {
    email: string,
    password: string
}
