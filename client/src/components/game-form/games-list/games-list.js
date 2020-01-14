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
      <div>
        <div className="head-game-list">
          <div className={'district'}>
            <InputBarrette onChange={this.filterDistrict}/>
          </div>
          <div className={'address table-label'}>Адрес</div>
          <div className={'time table-label'}>Дата</div>
          <div className={'players table-label'}>Игроков</div>
        </div>
        {games.entities.valueSeq().map(
            (it) => {
              if (
                this.state.district !== null
                &&
                it.district.toLowerCase().indexOf(
                    this.state.district.toLowerCase()) === -1
              ) {
                return null;
              }
              return <GameItem key={it.id} item={it} {...it}/>;
            },
        )}
      </div>
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
