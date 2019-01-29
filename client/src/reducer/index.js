import {combineReducers} from 'redux';
import auth from './auth';
import location from './location';
export default combineReducers({
  auth, location,
});
