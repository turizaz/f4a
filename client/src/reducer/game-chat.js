import {OrderedMap, Record} from 'immutable';
import {GAME_CHAT_MESSAGE_ADDED, GAME_CHAT_MESSAGE_HISTORY} from '../constants';
import {arrToMap} from '../helpers/helpers';

const ReducerState = Record({
  loading: false,
  entities: new OrderedMap({}),
});

const MessageRecord = Record({
  id: null,
  text: null,
  username: null,
  date: null,
});

const defaultState = new ReducerState();

export default (gameChatState = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GAME_CHAT_MESSAGE_HISTORY:
      return gameChatState.update('entities', (entities) => {
        return arrToMap(payload, MessageRecord);
      });
    case GAME_CHAT_MESSAGE_ADDED:
      // add message
      const messages = gameChatState.setIn(
          ['entities', payload.id],
          new MessageRecord(payload));
      // sort by date
      return messages.update('entities', (entities)=> {
        return messages.entities.sortBy((it)=>it.get('date')).reverse();
      });
    default:
      return gameChatState;
  }
};

