import {SET_CURRENT_USER} from '../constants';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from 'utils/setAuthorizationToken';

/**
 * Login action
 * @param {object} user
 * @return {object} action
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

/**
 * @param {object} credentials
 * @return {function(*): Promise<AxiosResponse<any> | never>}
 */
export function login(credentials) {
  return (dispatch) => {
    return axios.post(`/auth/login-jwt`, credentials).then((res) => {
      const {token} = res.data;
      localStorage.setItem('jwt', token);
      setAuthorizationToken(token);
      const info = jwt.decode(token);
      console.log(info);
      dispatch(setCurrentUser(info));
    });
  };
}
/**
 * @param {object} user
 * @return {function(*): Promise<AxiosResponse<any> | never>}
 */
export function registration(user) {
  return (dispatch) => {
    return new Promise((resolve, reject)=> {
      axios
          .post(`/auth/registration`, user)
          .then((res) => {
            dispatch(setCurrentUser(res.data));
            resolve(res);
          })
          .catch((err) => {
            reject(err.response);
            dispatch(setCurrentUser({}));
          });
    });
  };
}
/**
 * Logout action
 * @return {Function}
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwt');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
