import React, {Component} from 'react';
import './football-field.scss';
import PropTypes from 'prop-types';
import FieldPlayer from '../field-player';
import Teems from 'services/teems';
import {connect} from 'react-redux';
/**
 * Football field in game ui
 */
class FootballField extends Component {
  state = {
    gameOrder: [],
    players: 0,
  };
  /**
   * @param {object} nextProps
   * @param {object} prevState
   * @return {{players: number}}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    return ({
      gameOrder: nextProps.game.players === prevState.players?
        prevState.gameOrder:
        new Teems(nextProps.game.players).formGameOrder(),
      players: nextProps.game.players});
  }

  /**
   * @return {JSX} html
   */
  render() {
    const {auth} = this.props;
    return (
      <div className={
        auth.isAuthenticated ?
          ' football-field  active' : ' football-field  regular'}>
        <div className='football-field-center'/>
        <div className="left-top-corner"/>
        <div className="right-top-corner"/>
        <div className="left-bottom-corner"/>
        <div className="right-bottom-corner"/>
        {this.state.gameOrder.length > 0 && this.generateLines()}
      </div>
    );
  }
  /**
   * Generate tactic lines on field, each line contains few players
   * @return {JSX[]}
   */
  generateLines() {
    const lines = [];
    const {game} = this.props;
    let total = game.players;
    const teemsOnField = [[], []];
    let row = [];
    let rowNum = 1;
    console.log(this.state.gameOrder);
    this.state.gameOrder.forEach((it, index) => {
      it.forEach((it)=> {
        row = [];
        let isActive = false;
        for (let i = 1; i <= it && total > 0; i++) {
          isActive = (total - parseInt(game.active_players)) < 1;
          total--;
          row.push(
              <FieldPlayer
                teem={index === 0 ? 'yellow' : 'blue'}
                key={i}
                isActive={isActive}/>);
        }
        teemsOnField[index].push(
            <div key={rowNum++} className={'tactic-line '}>{row}</div>
        );
      });
    });
    lines.push(<div
      key={'north-side'}
      className={`half-field north-side lines-${teemsOnField[0].length}`}>
      {teemsOnField[0]}</div>);
    lines.push(<div
      key={'south-side'}
      className={`half-field south-side lines-${teemsOnField[1].length}`}>
      {teemsOnField[1]}</div>);
    return lines;
  }
}
FootballField.propTypes = {
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
export default connect((state) => {
  return {
    auth: state.auth,
  };
})(FootballField);
