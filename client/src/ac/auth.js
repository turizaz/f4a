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
 * @return {function(*=): Promise<any>}
 */
export function login(credentials) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post(`/auth/login-jwt`, credentials).then((res) => {
        const {token} = res.data;
        const info = loginViaToken(token);
        dispatch(setCurrentUser(info));
        resolve(info);
      }).catch((err)=> {
        reject(err.response);
      });
    });
  };
}
/**
 * @param {object} user
 * @return {function(*=): Promise<any>}
 */
export function registration(user) {
  return (dispatch) => {
    return new Promise((resolve, reject)=> {
      axios
          .post(`/auth/registration`, user)
          .then((res) => {
            const {token} = res.data;
            const info = loginViaToken(token);
            dispatch(setCurrentUser(info));
            resolve(res);
          })
          .catch((err) => {
            dispatch(setCurrentUser({}));
            reject(err.response);
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

/**
 * Set token to local storage, return user info data
 * @param {string} token
 * @return {Promise<void> | string}
 */
function loginViaToken(token) {
  localStorage.setItem('jwt', token);
  setAuthorizationToken(token);
  return jwt.decode(token);
}
