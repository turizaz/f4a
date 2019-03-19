/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import './game-item.scss';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

/**
 * Game in list
 */
class GameItem extends Component {
  click = () => {
    this.props.history.push(`/game/${this.props.item.id}`);
  };

  /**
   * Render game in list
   * @return {*}
   */
  render() {
    const {address, additional, district, date, players, activePlayers}
    = this.props.item;
    console.log(this.props.item);
    return (
      <tr
        onClick={this.click}
        className="game-item"
        title={additional}
      >
        <td>{district}</td>
        <td>{address}</td>
        <td>{new Date(date).toISOString().slice(0, 16).replace('T', ' ')}</td>
        <td>{activePlayers || 0 } из {players}</td>
        <td>{additional && additional.length > 40 ? additional.slice(0, 40)
            + '...' : additional}</td>
      </tr>
    );
  }
}
GameItem.propTypes = {
  item: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default withRouter(GameItem);
