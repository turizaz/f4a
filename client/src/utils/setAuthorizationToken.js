import axios from 'axios';
axios.defaults.baseURL = '/api';
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
