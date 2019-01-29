import {SET_CURRENT_USER} from '../constants';

const initialState = {
  user: {email: localStorage.user, isAuthenticated: Boolean(localStorage.user)},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const {user} = action;
      state = {user, isAuthenticated: true};
      return state;
    default:
      console.log(state);
      return state;
  }
};
