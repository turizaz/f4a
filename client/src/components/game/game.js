/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {withGameService} from 'hoc-helpers';
import {loadGame} from 'ac/games';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFutbol} from '@fortawesome/free-solid-svg-icons';
import TeemsVsFlags from './teems-vs-flags';
import Chat from './chat';
import './game.scss';
import FootballField from './football-field';
library.add(faFutbol);
/**
 * Game session
 */
class Game extends Component {
  state = {
    gameOrder: [],
    players: 0,
  };
  /**
   * Init
   */
  componentDidMount() {
    const {
      match: {params},
      loadGame,
    } = this.props;
    const {id} = params;
    loadGame(id);
  }
  /**
   * Apply join to game by pressing to ball
   */
  apply = () => {
    const {game, gameService, auth} = this.props;
    if (!auth.isAuthenticated) {
      return;
    }
    gameService.joinGame(game.id);
  };
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
                {auth.isAuthenticated || ', залогинтесь и'} нажми на футболку
              </p>
            </div>
            <div className="football-field-wrapper">
              <div onClick={this.apply}>
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
                  {game.address}
                </div>
                <div>
                  игроков - {game.players}
                </div>
                <div>
                  доп инфо - {game.additional}
                </div>
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
Game.propTypes = {
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadGame: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  gameService: PropTypes.object.isRequired,
};
export default connect(
    (state) => {
      return {
        game: state.game,
        auth: state.auth,
      };
    },
    {loadGame}
)(withGameService(Game));
