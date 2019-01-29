import {SET_CITY} from '../constants';

const initialState = {
  name: '',
  country: '',
  id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
