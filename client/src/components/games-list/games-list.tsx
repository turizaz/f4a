import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withGameService} from '../../HOCs';
import GameItem from './game-item';
import './games-list.scss';
import InputBarrette from '../../components/common/input-barrette'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper'
import {withNamespaces} from "react-i18next";
import SetCityWidget from "../common/set-city-widget";

interface Props {
  games: any,
  t: any
}


class GamesList extends Component<Props> {
  state = {
    district: null,
  };

  filterDistrict = (e: any) => {
    this.setState({
      district: e.target.value,
    });
  };

  render() {
    const {games, t} = this.props;
    if (!games.entities.valueSeq().size) {
      return <SetCityWidget/>;
    }

    return (
        <div className='game-sessions-greed'>
          <SetCityWidget/>
          <div className="head-game-list">
            <div className={'district'}>
              <InputBarrette onChange={this.filterDistrict}/>
            </div>
          </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Район</TableCell>
                    <TableCell align="right">{t('Адрес')}</TableCell>
                    <TableCell align="right">{t('Время')}</TableCell>
                    <TableCell align="right">{t('Игроков')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {games.entities.valueSeq().filter((it: any) => {
                    if (!this.state.district) return true;
                    return it.district.includes(this.state.district);
                  }).map((it: any) => <GameItem key={it.id} item={it}/>)}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    )
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
)(withGameService(
    // @ts-ignore
    withNamespaces()(GamesList)));
