/**
 * Football teem service
 */
class FootballTeem {
  players: number;

  /**
   * Init amount of players
   */
  constructor(players: number) {
    if (isNaN(players) || players < 0) {
      throw Error('Invalid parameter, should be number and > 0');
    }
    this.players = players;
  }

  /**
   * Calculate number of player for each teem
   */
  splitOnTeems(): Array<number> {
    if (this.players % 2) {
      const oddPlayers = (this.players - 1) / 2;
      return [oddPlayers + 1, oddPlayers];
    } else {
      const evenPlayers = this.players/2;
      return [evenPlayers, evenPlayers];
    }
  }
}
export default FootballTeem
