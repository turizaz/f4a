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
      <div
        onClick={this.click}
        className="game-item"
        title={additional}
      >
        <div>
          <div className={'label'}>
            Район
          </div>
          <div>
            {district}
          </div>
        </div>
        <div className={'address'}>
          <div className={'label'}>
            Адресс
          </div>
          <div>
            {address}
          </div>
        </div>
        <div>
          <div className={'label'}>
            Время
          </div>
          <div>
            {new Date(date).toISOString().slice(0, 16).replace('T', ' ')}
          </div>
        </div>
        <div>
          <div className={'label'}>
            Игроков
          </div>
          <div>
            {activePlayers || 0 } из {players}
          </div>
        </div>
      </div>
    );
  }
}
GameItem.propTypes = {
  item: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default withRouter(GameItem);
