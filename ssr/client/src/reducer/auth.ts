import {SET_CURRENT_USER} from '../constants'
import * as _ from 'lodash'
import { Base64 } from 'js-base64'
let user: {name: string, type?: string} | null

user = assignUser()

const initialState = {
  user,
  isAuthenticated: !_.isEmpty(user),
}

export default (state = initialState, action: any) => {
  console.log('initial state, auth', action)
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

function assignUser(): {name: string} | null {
  return null;
  // let user;
  // if (window && window.location.hash) {
  //   user = JSON.parse(Base64.decode(window.location.hash))
  //   localStorage.setItem('user', JSON.stringify(user))
  //   return user
  // } else {
  //   try {
  //     user = JSON.parse(localStorage.user)
  //   } catch (e) {
  //     user = null
  //   }
  // }
  // return user
}
