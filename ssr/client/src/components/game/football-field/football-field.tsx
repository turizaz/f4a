import * as React from 'react'
import './football-field.scss'
import FieldPlayer from '../field-player'
import Teems from '../../../services/teems'
import {connect} from 'react-redux'

interface Props {
  auth: any,
  game: any
}

class FootballField extends React.Component<Props> {
  state = {
    gameOrder: [],
    players: 0,
  };

  static getDerivedStateFromProps(nextProps: any, prevState: any): {players: number; gameOrder: any} {
    return ({
      gameOrder: nextProps.game.players === prevState.players?
        prevState.gameOrder:
        new Teems(nextProps.game.players).formGameOrder(),
      players: nextProps.game.players})
  }

  render() {
    const {auth} = this.props;
    let fieldClass = ` football-field `;
    fieldClass += auth.isAuthenticated ? `active` : `regular`;
    return (
        <div>
          <div className="north-socket" />
          <div className={fieldClass}>
            <div className='football-field-center'/>
            <div className="left-top-corner"/>
            <div className="right-top-corner"/>
            <div className="left-bottom-corner"/>
            <div className="right-bottom-corner"/>
            {this.state.gameOrder.length > 0 && this.generateLines()}
          </div>
          <div className="south-socket" />
        </div>
    );
  }
  /**
   * Generate tactic lines on field, each line contains few players
   */
  generateLines() {
    const lines = [];
    const {game} = this.props;
    let total = game.players;
    const teemsOnField = [[], []];
    let row = [];
    let rowNum = 1;
    this.state.gameOrder.forEach((it: any, index) => {
      it.forEach((it: any)=> {
        row = [];
        for (let i = 1; i <= it && total > 0; i++) {
          row.push(
              <FieldPlayer
                teem={index === 0 ? 'orange' : 'white'}
                key={i}
                game={game}
                index={total}
                isActive={false}/>);
          total--
        }
        teemsOnField[index].push(
            <div key={rowNum++} className={'tactic-line '}>{row}</div>
        )
      })
    });
    lines.push(<div
      key={'north-side'}
      className={`half-field north-side lines-${teemsOnField[0].length}`}>
      {teemsOnField[0]}</div>);
    lines.push(<div
      key={'south-side'}
      className={`half-field south-side lines-${teemsOnField[1].length}`}>
      {teemsOnField[1]}</div>);
    return lines
  }
}

export default connect((state: any) => {
  return {
    auth: state.auth,
  }
})(FootballField)
