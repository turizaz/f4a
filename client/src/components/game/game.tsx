import React, {Component} from 'react'
import {withGameService} from '../../hoc-helpers'
import {loadGame} from '../../ac/games'
import {connect} from 'react-redux'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faFutbol} from '@fortawesome/free-solid-svg-icons'
import GameInfo from './game-info'
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

class Game extends Component<Props> {
  state = {
    gameOrder: [],
    players: 0,
  }

  componentDidMount() {
    document.title = 'Football for everyone';
    const { match: {params}, loadGame} = this.props;
    const {id} = params;
    loadGame(id);
  }

  render() {
    const {game, auth} = this.props;
    const {match: {params}} = this.props;
    const {id} = params;
    return (
      <div>
        <div className="row game">
          <div className="left-col">
            <div>
              <p>
                Чтобы присоединится
                {auth.isAuthenticated || ', залогинтесь и'} нажмите на футболку
              </p>
            </div>
            <div className="football-field-wrapper shadow-1">
              <div>
                <FootballField game={game}/>
              </div>
            </div>
          </div>
          <div className='right-col'>
              <div className='flags-info'>
                <GameInfo game={game}/>
                <TeemsVsFlags/>
              </div>
              <Chat gameId={id}/>
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
