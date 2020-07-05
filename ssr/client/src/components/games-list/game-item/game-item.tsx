import * as React from 'react'
import './game-item.scss'
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from 'react-router-dom'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
interface Props extends RouteComponentProps<any> {
  history: any,
  item: any
}

class GameItem extends React.Component<Props> {
  click = () => {
    this.props.history.push(`/game/${this.props.item.id}`)
  }
  dateToReadable() {
    const {date} = this.props.item
    return new Date(date).toISOString().slice(0, 16).replace('T', ' ')
  }
  render() {
    const {address, district, players, activePlayers, id} = this.props.item
    if (!this.props.item) {return null}
    return (
        <TableRow key={id} onClick={this.click}>
          <TableCell>{district}</TableCell>
          <TableCell>{address}</TableCell>
          <TableCell>{this.dateToReadable()}</TableCell>
          <TableCell>{players} ({activePlayers})</TableCell>
        </TableRow>
    )
  }
}
export default withRouter<Props, any>(GameItem)
