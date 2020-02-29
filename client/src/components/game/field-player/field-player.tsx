/* eslint-disable no-invalid-this */
import React, {Component} from 'react'

import './field-player.scss'
import {withGameService} from '../../../hoc-helpers'
import {connect} from 'react-redux'
interface Props {
  gameService: any,
  game: any,
  index: any,
  gameRedux: any,
  teem: any
}
/**
 * Player ui on football field
 */
class FieldPlayer extends Component<Props> {
  applyGame = () => {
    const {gameService, game, index} = this.props
    gameService.joinGame(game.id, index).catch((e: any) => {
      if (e.response.status === 403) {
        alert('Залогинтесь сначала')
      }
    })
  };
  /**
   * @return {JSX} html
   */
  render() {
    const {teem, index, gameRedux} = this.props;
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

export default (withGameService)(
    connect((state: any)=> {
      return {
        gameRedux: state.game,
      };
    }, null)(FieldPlayer)
);
