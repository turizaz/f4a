import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withGameService} from '../../../hoc-helpers';
import GameItem from './game-item';
import './games-list.scss';
import InputBarrette from '../../../components/common/input-barrette';
interface Props {
  games: any
}
/**
 * List of games based on city
 */
class GamesList extends Component<Props> {
  state = {
    district: null,
  };
  /**
   * @param {Event} e
   */
  filterDistrict = (e: any) => {
    this.setState({
      district: e.target.value,
    });
  };
  /**
   * @return {boolean|*}
   */
  render() {
    const {games} = this.props;
    console.log(games.entities.valueSeq().size)
    if (!games.entities.valueSeq().size) {
      return null;
    }
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
            (it: any) => {
              if (
                this.state.district !== null
                &&
                it.district.toLowerCase().indexOf(
                    // @ts-ignore
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

export default connect(
    (state: any) => {
      return {
        location: state.location,
        games: state.games,
      };
    },
    null
)(withGameService(GamesList));
