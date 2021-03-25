  /* eslint-disable no-invalid-this */
import * as React from 'react'

import './field-player.scss'
import {withGameService} from '../../../HOCs'
import {connect} from 'react-redux'
import {loaded, loading} from "../../../ac/loader";
interface Props {
  gameService: any,
  game: any,
  index: any,
  gameRedux: any,
  teem: any,
  loading: any,
  loaded: any
}
/**
 * Player ui on football field
 */
class FieldPlayer extends React.Component<Props> {
  applyGame = () => {
    const {gameService, game, index, loading, loaded} = this.props
    loading()
    gameService.joinGame(game.id, index).catch((e: any) => {
      if (e.response.status > 400 && e.response.status < 500) {
        alert('Залогинтесь сначала')
      }
    }).finally(loaded)
  };
  /**
   * @return {JSX} html
   */
  render() {
    const {teem, index, gameRedux} = this.props;
    const isActive = gameRedux.fieldNumbersInGame
      && gameRedux.fieldNumbersInGame.length > 0
      && gameRedux.fieldNumbersInGame.indexOf(index) !== -1;
    const activeShirt = '/img/'+teem+'-shirt.svg';
    return (
      <div className={'relative player'} onClick={this.applyGame}>
        <div className={'number teem-' + (isActive ? teem: 'grey')}>{index}</div>
        {isActive ?
          <img className='shirt' alt={'active-shirt'} src={activeShirt}/>
          : <img
            alt={'grey-shirt'}
            className={'t-shirt-grey shirt' + ' ' + teem}
            src='/img/gray-shirt.svg' />}
      </div>
    );
  }
}

export default (withGameService)(
    connect((state: any)=> {
      return {
        gameRedux: state.game,
      };
    }, {loading, loaded})(FieldPlayer)
);
