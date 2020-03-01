import {SET_CURRENT_USER} from '../constants'
import _ from 'lodash'
let user
try {
  user = JSON.parse(localStorage.user)
} catch (e) {
  user = null
}
const initialState = {
  user,
  isAuthenticated: !_.isEmpty(user),
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const {user} = action
      localStorage.setItem('user', JSON.stringify(user))
      return {
        user: pickUser(user), isAuthenticated: !_.isEmpty(user)
      }
    default:
      return state
  }
};

function pickUser(user: any) {
  return _.pick(user, ['name'])
}
