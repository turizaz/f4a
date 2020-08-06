import axios from 'axios'
import {setCurrentUser} from '../ac/auth'
import store from '../store'
axios.defaults.baseURL = '/api'
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 403) {
        store.dispatch(setCurrentUser({}))
    }
    return Promise.reject(error)
})
export default axios
