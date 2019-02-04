import {combineReducers} from 'redux';
import auth from './auth';
import location from './location';
import game from './game';
export default combineReducers({
  auth, location, game,
});
