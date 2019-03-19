import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withGameService} from 'hoc-helpers';
import GameItem from './game-item';
import './games-list.scss';
import InputBarrette from 'components/common/input-barrette';

/**
 * List of games based on city
 */
class GamesList extends Component {
  state = {
    district: null,
  };
  /**
   * @param {Event} e
   */
  filterDistrict = (e) => {
    this.setState({
      district: e.target.value,
    });
  };
  /**
   * @return {boolean|*}
   */
  render() {
    const {games} = this.props;
    return (
      games.entities.size > 0 && <table className="games-list table-striped">
        <thead>
          <tr className="list-header">
            <th scope="col">
              <InputBarrette onChange={this.filterDistrict}/>
            </th>
            <th scope="col">Адрес</th>
            <th scope="col">Время</th>
            <th scope="col">Игроков</th>
            <th scope="col">Инфо</th>
          </tr>
        </thead>
        <tbody>
          {games.entities.valueSeq().map(
              (it) => {
                if (
                  this.state.district !== null
                  &&
                  it.district
                      .toLowerCase()
                      .indexOf(this.state.district.toLowerCase()) === -1
                ) {
                  return null;
                }
                return <GameItem key={it.id} item={it} {...it}/>;
              }
          )}
        </tbody>
      </table>
    );
  }
}
GamesList.propTypes = {
  gameService: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  games: PropTypes.object.isRequired,
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
