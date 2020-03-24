import {LOAD_GAMES, GAME_ADDED, LOAD_GAME, PLAYER_JOINED, GAME_CHAT_MESSAGE_HISTORY, GAME_CHAT_MESSAGE_ADDED} from '../constants'
import {ICallApiAc, ICommonAc} from './IAc'


export function loadGames(city: any): ICallApiAc {
  return {
    type: LOAD_GAMES,
    callApi: `/game/city/${city.id}`,
  };
}

export function loadGame(id: number): ICallApiAc {
  return {
    type: LOAD_GAME,
    callApi: `/game/${id}`,
  };
}

export function gameAdded(id: number): ICallApiAc {
  return {
    type: GAME_ADDED,
    callApi: `/game/${id}`,
  };
}

export function playerJoined(
    gameId: number,
    activePlayers: number,
    info: any): ICommonAc {
  return {
    type: PLAYER_JOINED,
    payload: {gameId, activePlayers, info},
  };
}

export function addChatMessage(message: any) {
  return {
    type: GAME_CHAT_MESSAGE_ADDED,
    payload: message,
  };
}

export function loadChatHistory(messages: any) {
  return {
    type: GAME_CHAT_MESSAGE_HISTORY,
    payload: messages,
  };
}
