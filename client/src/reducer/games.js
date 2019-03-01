/* eslint camelcase: 0 */
import {
  LOAD_GAMES,
  SUCCESS,
  GAME_ADDED,
  START,
  PLAYER_JOINED,
} from '../constants';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers/helpers';

const ReducerState = Record({
  loading: false,
  entities: new OrderedMap({}),
});

const GameRecord = Record({
  id: 0,
  city: '',
  city_id: 0,
  address: '',
  date: '',
  players: 0,
  activePlayers: 0,
});

const defaultState = new ReducerState();

export default (gameState = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_GAMES + SUCCESS:
      if (!payload.data) {
        return defaultState;
      }
      return gameState.update('entities', (entities) => {
        return arrToMap(payload.data, GameRecord).sortBy(
            (f) => f.get('date')
        );
      });
    case GAME_ADDED + START:
      return gameState.set('loading', true);
    case PLAYER_JOINED:
      console.log('player join in list', payload);
      const {gameId, activePlayers} = payload;
      return gameState.updateIn(['entities', gameId], (gameRecord) => {
        return gameRecord.set('activePlayers', activePlayers);
      });
    case GAME_ADDED + SUCCESS:
      const {id, city_id} = payload.data;
      if (city_id !== payload.store.location.id) {
        return gameState;
      }
      return gameState
          .setIn(['entities', id], new GameRecord(payload.data))
          .set('loading', false)
          .update('entities', (entities) => {
            return entities.sortBy((f) => f.get('date'));
          });
    default:
      return gameState;
  }
};
