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
    const {address, date, players, activePlayers} = this.props.item;
    return (
      <tr onClick={this.click}>
        <td>{address}</td>
        <td>{new Date(date).toISOString().slice(0, 19).replace('T', ' ')}</td>
        <td>{players} ({activePlayers || 0 })</td>
      </tr>
    );
  }
}
GameItem.propTypes = {
  item: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default withRouter(GameItem);
