import axios from 'axios';

/**
 * Area of responsibility creating and handling game events
 */
class GameService {
  /**
   * Api root
   * @type {string}
   * @private
   */
  _url = process.env.REACT_APP_API_PATH;

  /**
   * Add game event
   * @param {object} game
   */
  async add(game) {
    return await axios.post(`${this._url}/game`, game);
  }
}
export default GameService;
