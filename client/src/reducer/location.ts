// @ts-nocheck
import {SET_CITY} from '../constants'
import {Record} from 'immutable'

const initialState = new Record({
  name: '',
  country: '',
  id: null,
})();

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY:
      return action.payload ? state.merge(action.payload) : initialState
    default:
      return state
  }
};
