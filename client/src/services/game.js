import axios from 'axios';
import io from 'socket.io-client';
const patch = require('socketio-wildcard')(io.Manager);

/**
 * Area of responsibility creating and handling game events
 */
class GameService {
  /**
   * Game char socket
   * @type {null}
   * @private
   */
  _gameSocket = null;
  /**
   * Add game event
   * @param {object} game
   */
  async add(game) {
    return await axios.post(`/game`, game);
  }
  /**
   * Init chat for game
   * @param {number} id
   * @return {*}
   */
  initChat(id) {
    return new Promise((resolve) => {
      this._gameSocket = io(process.env.REACT_APP_API_PATH, {
        path: '/chat/game',
      });
      patch(this._gameSocket);
      this._gameSocket.on('connect', () => {
        this._gameSocket.emit(
            'join',
            process.env.REACT_APP_GAME_CHAT_ROOM_PREFIX + id,
            resolve(this._gameSocket)
        );
      });
    });
  }
  /**
   * @param {object} message
   * @return {AxiosPromise<any>}
   */
  addChatMessage(message) {
    return axios.post(`/game/chat`, message);
  }
  /**
   * Load chat history
   * @param {string} gameId
   */
  async getChatHistory(gameId) {
    return await axios.get(`/game/chat/history/${gameId}`);
  }
  /**
   * @param {number} gameId
   * @return {AxiosPromise<any>}
   */
  joinGame(gameId) {
    return axios.post(`/game/join`, {gameId});
  }
}
export default GameService;
