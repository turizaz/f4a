class GameService {
  /**
   * Api root
   * @type {string}
   * @private
   */
  _url = process.env.REACT_APP_API_PATH;

  add(game) {
    console.log(game);
  }
}
export default GameService;
