import {Record} from 'immutable';
import {LOAD_GAME, SUCCESS, START, PLAYER_JOINED} from '../constants';

const GameRecord = Record({
  id: null,
  city: null,
  address: null,
  lat: null,
  district: null,
  long: null,
  players: 0,
  city_id: 0,
  active_players: 1,
  date: null,
  additional: null,
  loading: false,
  fieldNumbersInGame: [],
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
      const {gameId, activePlayers, info} = payload;
      if (gameState.get('id') === gameId) {
        if (info.event === 'joined') {
          return joinGame(gameState, info);
        }
        if (info.event === 'leaved') {
          return leaveGame(gameState, info);
        }
        return gameState
            .set('active_players', activePlayers)
            .set('fieldNumbersInGame', info.fieldNumbersInGame);
      }
      return gameState;
    default:
      return gameState;
  }
};
/**
 * @param {object} gameState
 * @param {number} playerFieldNumber
 * @return {object}
 */
function leaveGame(gameState, {fieldNumbersInGame}) {
  return gameState.set('fieldNumbersInGame', fieldNumbersInGame);
}
/**
 * @param {object} gameState
 * @param {number} playerFieldNumber
 * @return {*}
 */
function joinGame(gameState, {fieldNumbersInGame}) {
  return gameState.set('fieldNumbersInGame', fieldNumbersInGame);
}
