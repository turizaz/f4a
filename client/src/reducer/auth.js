import {SET_CURRENT_USER} from '../constants';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

const initialState = {
  user: pickUser(jwt.decode(localStorage.jwt)),
  isAuthenticated: !_.isEmpty(localStorage.jwt),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const {user} = action;
      return {
        user: pickUser(user), isAuthenticated: !_.isEmpty(user)};
    default:
      return state;
  }
};

/**
 * Pick needed fields from user
 * @param {object} user
 * @return {object}
 */
function pickUser(user) {
  return _.pick(user, ['email', 'id']);
}
