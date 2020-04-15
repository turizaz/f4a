export interface IUser {
    id?: number,
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
