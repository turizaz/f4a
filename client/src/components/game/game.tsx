import * as React from 'react'
import {withGameService} from '../../HOCs'
import {loadGame} from '../../ac/games'
import {connect} from 'react-redux'
// import {library} from '@fortawesome/fontawesome-svg-core'
// import {faFutbol} from '@fortawesome/free-solid-svg-icons'
import GameInfo from './game-info'
import TeemsVsFlags from './teems-vs-flags'
import Chat from './chat'
import './game.scss'
import FootballField from './football-field';
import { withNamespaces } from 'react-i18next';
// library.add(faFutbol)

interface Props {
  match: any,
  loadGame: any,
  game: any,
  auth: any,
  t: any
}

class Game extends React.Component<Props> {
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
    const {game, auth, t} = this.props;
    const {match: {params}} = this.props;
    const {id} = params;
    return (
      <div>
        <div className="row game">
          <div className="left-col">
            <div>
              <p>
                {auth.isAuthenticated ? t('Чтобы присоединится нажмите на футболку') : t('Чтобы присоединится, залогинтесь и нажмите на футболку')}
              </p>
            </div>
            <div className="football-field-wrapper shadow-1">
              <div>
                // @ts-ignore
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
    // @ts-ignore
    {loadGame})(withGameService(withNamespaces()(Game)));
