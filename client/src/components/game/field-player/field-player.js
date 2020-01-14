/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './field-player.scss';
import {withGameService} from 'hoc-helpers';
import {connect} from 'react-redux';

/**
 * Player ui on football field
 */
class FieldPlayer extends Component {
  applyGame = () => {
    const {gameService, game, index} = this.props;
    gameService.joinGame(game.id, index);
  };
  /**
   * @return {JSX} html
   */
  render() {
    const {teem, index, gameRedux} = this.props;
    console.log(gameRedux);
    const isActive = gameRedux.fieldNumbersInGame
      && gameRedux.fieldNumbersInGame.length > 0
      && gameRedux.fieldNumbersInGame.indexOf(index) !== -1;
    const activeShirt = '/img/'+teem+'-shirt.png';
    return (
      <div className={'relative player'} onClick={this.applyGame}>
        <div className={'number'}>{index}</div>
        {isActive ?
          <img alt={'active-shirt'} src={activeShirt}/>
          : <img
            alt={'grey-shirt'}
            className={'t-shirt-grey'}
            src='/img/grey-shirt.png' />}
      </div>
    );
  }
}
FieldPlayer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  teem: PropTypes.string.isRequired,
  game: PropTypes.object.isRequired,
  gameRedux: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  gameService: PropTypes.object.isRequired,
};
export default (withGameService)(
    connect((state)=> {
      return {
        gameRedux: state.game,
      };
    }, null)(FieldPlayer)
);
