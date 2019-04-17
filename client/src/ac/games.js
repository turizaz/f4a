import {LOAD_GAMES, GAME_ADDED, LOAD_GAME, PLAYER_JOINED, GAME_CHAT_MESSAGE_HISTORY, GAME_CHAT_MESSAGE_ADDED} from '../constants';
/**
 * Set city action
 * @param {object} city
 * @return {{payload: *, type: string}}
 */
export function loadGames(city) {
  return {
    type: LOAD_GAMES,
    callApi: `/game/city/${city.id}`,
  };
}
/**
 * Load game
 * @param {number} id
 * @return {{type: *, callApi: string}}
 */
export function loadGame(id) {
  return {
    type: LOAD_GAME,
    callApi: `/game/${id}`,
  };
}
/**
 * Game added event
 * @param {number} id
 * @return {{type: string, callApi: string}}
 */
export function gameAdded(id) {
  return {
    type: GAME_ADDED,
    callApi: `/game/${id}`,
  };
}
/**
 * @param {number} gameId
 * @param {number} activePlayers
 * @param {object} info
 * @return {{payload: {gameId: *, playerId: *}, type: string}}
 */
export function playerJoined(gameId, activePlayers, info) {
  return {
    type: PLAYER_JOINED,
    payload: {gameId, activePlayers, info},
  };
}
/**
 * @param {object} message
 * @return {function(*): Promise<{} | never>}
 */
export function addChatMessage(message) {
  return {
    type: GAME_CHAT_MESSAGE_ADDED,
    payload: message,
  };
}
/**
 * @param {object} messages
 * @return {{payload: {gameId: *}, type: string}}
 */
export function loadChatHistory(messages) {
  return {
    type: GAME_CHAT_MESSAGE_HISTORY,
    payload: messages,
  };
}
