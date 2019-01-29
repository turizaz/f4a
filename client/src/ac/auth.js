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
    const _url = process.env.REACT_APP_API_PATH;
    return axios.post(`${_url}/login-jwt`, credentials).then((res) => {
      const {token} = res.data;
      localStorage.setItem('jwt', token);
      setAuthorizationToken(token);
      const info = jwt.decode(token);
      localStorage.setItem('user', info.email);
      dispatch(setCurrentUser(info));
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
