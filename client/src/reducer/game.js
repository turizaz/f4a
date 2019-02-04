import {LOAD_GAMES, SUCCESS} from '../constants';
import {OrderedMap} from 'immutable';

export default (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case LOAD_GAMES + SUCCESS:
      console.log('s');
      return state;
    default:
      return state;
  }
};
