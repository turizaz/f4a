import {SET_CURRENT_USER} from '../constants'
import axios from '../libs/axios'
export function setCurrentUser(user: any) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function login(credentials: any) {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`/auth/login`, credentials)
      dispatch(setCurrentUser(response.data))
      return {...response.data, status: response.status}
    } catch (e) {
      return e.response
    }
  }
}

export function forgotPassword(email: string) {
  return async (dispatch: any) => {
    try{
      const response = await axios.post(`/auth/forgot-password`, {email})
      return {...response.data, status: response.status}
    } catch (e) {
      return e.response
    }
  }
}

export function registration(user: any) {
  return (dispatch: any) => {
    return new Promise((resolve, reject)=> {
      axios
          .post(`/auth/registration`, user)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            dispatch(setCurrentUser({}))
            reject(err.response)
          });
    });
  };
}

export function logout() {
  return async (dispatch: any) => {
    await axios.post(`/auth/logout`, {})
    localStorage.removeItem('user')
    dispatch(setCurrentUser({}))
  };
}

export function setUser(user: any) {
  return (dispatch: any) => {
    dispatch(setCurrentUser(user))
  };
}

