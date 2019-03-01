import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_PATH+'/api';
/**
 * Set bearer token
 * @param {string} token
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
