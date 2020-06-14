import {SET_CURRENT_USER} from '../constants'
import axios from '../libs/axios'

export function setCurrentUser(user: any) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}
export function checkIfLogged() {
  return async (dispatch: any) => {
    let response;
    try {
      response = await axios.get(`/auth/ping`);
    } catch (e) {
      if (e.message.indexOf('code 401') !== -1) {
        dispatch(setCurrentUser(null))
      }
      response = e.message
    }
    return response
  }
}
export function login(credentials: any): any {
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

export function changePassword(password: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`/auth/change-password`, {password})
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
            console.log(err.response.data)
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
  console.log(`set user`)
  return (dispatch: any) => {
    dispatch(setCurrentUser(user))
  };
}
