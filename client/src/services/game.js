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
    game.date = game.date.format().split('+')[0]+'+0000'
    //game.date = game.date.getTime() + (game.date.getTimezoneOffset() * 60000);
    return await axios.post(`/game`, game);
  }
  /**
   * Init chat for game
   * @param {number} id
   * @return {*}
   */
  initChat(id) {
    console.log('init chat')
    return new Promise((resolve) => {
      this._gameSocket = io({
        path: '/chat/game',
      });
      patch(this._gameSocket);
      this._gameSocket.on('connect', () => {
        console.log('game soket c');
        this._gameSocket.emit(
            'join',
            'game' + id,
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
   * @param {number} playerNumber
   * @return {AxiosPromise<any>}
   */
  joinGame(gameId, playerNumber) {
    return axios.post(`/game/join`, {gameId, playerNumber});
  }
}
export default GameService;
