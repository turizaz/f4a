import {Record} from 'immutable';
import {LOAD_GAME, SUCCESS, START, PLAYER_JOINED} from '../constants';

const GameRecord = Record({
  id: null,
  city: null,
  address: null,
  // author: Record({
  //   name: '',
  // }),
  lat: null,
  long: null,
  players: 0,
  city_id: 0,
  active_players: 0,
  date: null,
  additional: null,
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
      const {gameId, activePlayers} = payload;
      if (gameState.get('id') === gameId) {
        return gameState.set('active_players', activePlayers);
      }
      return gameState;
    default:
      return gameState;
  }
};
