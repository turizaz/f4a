import {combineReducers} from 'redux';
import auth from './auth';
import location from './location';
import games from './games';
import game from './game';
import gameChat from './game-chat';
export default combineReducers({
  auth, location, games, game, gameChat,
});
