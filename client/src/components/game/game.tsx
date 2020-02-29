/* eslint-disable no-invalid-this */
import React, {Component} from 'react'
import {withGameService} from '../../hoc-helpers'
import {loadGame} from '../../ac/games'
import {connect} from 'react-redux'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faFutbol} from '@fortawesome/free-solid-svg-icons'
import TeemsVsFlags from './teems-vs-flags'
import Chat from './chat'
import './game.scss'
import FootballField from './football-field'
library.add(faFutbol)
interface Props {
  match: any,
  loadGame: any,
  game: any,
  auth: any
}
/**
 * Game session
 */
class Game extends Component<Props> {
  state = {
    gameOrder: [],
    players: 0,
  };
  /**
   * Init
   */
  componentDidMount() {
    document.title = 'Football for everyone';
    const {
      match: {params},
      loadGame,
    } = this.props;
    const {id} = params;
    loadGame(id);
  }
  /**
   * @return {string} html
   */
  render() {
    const {game, auth} = this.props;
    const {
      match: {params},
    } = this.props;
    const {id} = params;
    return (
      <div>
        <div className="row game">
          <div className="col-md-6 left-col">
            <div>
              <p>
                Что бы присоединится
                {auth.isAuthenticated || ', залогинтесь и'} нажмите на футболку
              </p>
            </div>
            <div className="football-field-wrapper shadow-1">
              <div>
                <FootballField game={game}/>
              </div>
            </div>
          </div>
          <div className="col-md-6 right-col padding-0">
            <div className="row">
              <div className="col-md-6 game-info">
                <div>
                  {game.city}
                </div>
                <div>
                  {game.district + ', ' +game.address}
                </div>
                <div>
                  игроков - {game.players}
                </div>
                {game.additional ? <div>доп инфо - {game.additional}</div>: ''}
              </div>
              <div className="col-md-6 padding-0">
                <TeemsVsFlags/>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-12">
                <Chat gameId={id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
    (state: any) => {
      return {
        game: state.game,
        auth: state.auth,
      };
    },
    {loadGame}
)(withGameService(Game));
