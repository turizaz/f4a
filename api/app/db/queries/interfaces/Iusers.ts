export interface IUser {
    id?: number,
    method: string,
    local: {
        email: string,
        name: string,
        password: string
        verified?: boolean | null
    }
    google: {
        name: string,
    }
}
export interface IUserCredentials {
    email: string,
    password: string
}
export interface IGoogleUser {
    email: string,
    name: string
}
