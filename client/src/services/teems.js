/**
 * Football teem service
 */
class Teems {
  /**
   * Get a random integer between `min` and `max`.
   *
   * @param {number} min - min number
   * @param {number} max - max number
   * @return {number} a random integer
   */
  randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  tacticOrders = {
    2: [1, 1],
    3: [1, 2],
    4: [1, 2, 1],
    5: [1, 3, 1],
    6: [1, 3, 2],
    7: [1, 3, 2, 1],
    8: [1, 3, 3, 1],
    9: [1, 3, 1, 3, 1],
    10: [1, 3, 2, 3, 1],
    11: [[1, 4, 4, 2], [1, 4, 3, 3]],
  };
  /**
   * Init amount of players
   * @param {number} players
   */
  constructor(players) {
    if (isNaN(players) || players < 0) {
      throw Error('Invalid parameter, should be number and > 0');
    }
    this.players = players;
  }
  /**
   * Calculate number of player for each teem
   * @return {number[]}
   */
  splitOnTeems() {
    if (this.players % 2) {
      const oddPlayers = (this.players - 1) / 2;
      return [oddPlayers + 1, oddPlayers];
    } else {
      const evenPlayers = this.players / 2;
      return [evenPlayers, evenPlayers];
    }
  }

  /**
   * Form tactic orders
   * @return {Array}
   */
  formGameOrder() {
    const teems = this.splitOnTeems();
    const orders = [];
    teems.forEach((it, index) => {
      const order = Array.isArray(this.tacticOrders[it][0]) ?
        this.tacticOrders[it][
            this.randomInt(0, this.tacticOrders[it].length - 1)
        ] : this.tacticOrders[it];
      orders.push(order);
    });
    return orders;
  }
}

export default Teems;
