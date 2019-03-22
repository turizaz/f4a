/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {withGameService} from 'hoc-helpers';
import {loadGame} from 'ac/games';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFutbol} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Chat from './chat';
import './game.scss';
library.add(faFutbol);
/**
 * Game session
 */
class Game extends Component {
  state = {
    players: 0,
  };
  /**
   * Load game date
   */
  componentDidMount() {
    const {
      match: {params},
    } = this.props;
    const {id} = params;
    this.props.loadGame(id);
    const {game} = this.props;
    this.setState({players: game.active_players});
  }

  /**
   * @param {object} nextProps
   * @param {object} prevState
   * @return {{players: number}}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    return ({players: nextProps.game.active_players});
  }
  /**
   * Create ui balls
   * @return {Array}
   */
  createBalls = ()=>{
    const {game} = this.props;
    const balls = [];
    if (game.players) {
      for (let i = 1; i <= game.players; i++) {
        balls.push(
            <FontAwesomeIcon
              key={i}
              icon="futbol"
              size="5x"
              className={(this.state.players - i) < 0 ? 'fa-disabled' : ''}/>);
      }
    }
    return balls;
  };
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
    console.log(auth);
    const {
      match: {params},
    } = this.props;
    const {id} = params;
    return (
      <div>
        <div className="row game">
          <div className="col-md-4 left-col">
            <div>Что бы присоединится
              {auth.isAuthenticated || ', залогинтесь и'} нажми на мяч</div>
            <div onClick={this.apply}
              className={auth.isAuthenticated ? 'active' : 'regular'}>
              {this.createBalls()}
            </div>
          </div>
          <div className="col-md-8 right-col padding-0">
            <table className="table table-bordered game-table">
              <tbody>
                <tr>
                  <td className="w-25">Город</td>
                  <td>{game.city}</td>
                </tr>
                <tr>
                  <td>Адрес</td>
                  <td>{game.address}</td>
                </tr>
                <tr>
                  <td>Заявлено игроков</td>
                  <td>{game.players}</td>
                </tr>
                <tr>
                  <td>Доп инфо</td>
                  <td>{game.additional}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Chat gameId={id}/>
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
