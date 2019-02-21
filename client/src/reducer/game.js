import {Record} from 'immutable';
import {LOAD_GAME, SUCCESS, START, PLAYER_JOINED} from '../constants';

const GameRecord = Record({
  id: '',
  city: '',
  address: '',
  // author: Record({
  //   name: '',
  // }),
  lat: '',
  long: '',
  players: 0,
  city_id: 0,
  active_players: 0,
  date: '',
  additional: '',
  loading: false,
});

const defaultState = new GameRecord();

export default (gameState = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_GAME + START:
      return gameState.set('loading', true);
    case LOAD_GAME + SUCCESS:
      return gameState.merge(payload.data).set('loading', false);
    case PLAYER_JOINED:
      return gameState;
    default:
      return gameState;
  }
};
