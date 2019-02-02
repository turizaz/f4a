import axios from 'axios';
/**
 * Set bearer token
 * @param {string} token
 */
export default function setAuthorizationToken(token) {
  if (token) {
    console.log(token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
