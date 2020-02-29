import {SET_CURRENT_USER} from '../constants'
import _ from 'lodash'

const initialState = {
  user: JSON.parse(localStorage.user),
  isAuthenticated: !_.isEmpty(JSON.parse(localStorage.user)),
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
