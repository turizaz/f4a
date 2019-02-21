import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withGameService} from 'hoc-helpers';
import GameItem from './game-item';

/**
 * List of games based on city
 */
class GamesList extends Component {
  render() {
    const {games} = this.props;
    return (
      games.entities.size !== 0 &&
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Место</th>
            <th scope="col">Время</th>
            <th scope="col">Игроков</th>
          </tr>
        </thead>
        <tbody>
          {games.entities.valueSeq().map(
              (it) => <GameItem key={it.id} item={it} {...it}/>
          )}
        </tbody>
      </table>
    );
  }
}
GamesList.propTypes = {
  gameService: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default connect(
    (state) => {
      return {
        location: state.location,
        games: state.games,
      };
    },
    null
)(withGameService(GamesList));
