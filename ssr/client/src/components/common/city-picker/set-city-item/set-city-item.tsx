import * as React from 'react'
import './set-city-item.scss'
import {connect} from 'react-redux'

interface Props {
  name?: string,
  country?: string,
  region?: string,
  doChoice: any,
  id: number,
}

/**
 * Item for autocomplete list
 */
class SetCityItem extends React.Component<Props> {
  /**
   * @return {string} html
   */
  render() {
    const {name, country, id, doChoice} = this.props;
    return (
      <div className="city-item" onClick={
        () => {
          doChoice({name: name, country: country, id: id})
        }}>
        { this.composeAddress(this.props.name) }
        <small>{ this.composeAddress(this.props.region, ', ') }</small>
        <small>{ this.composeAddress(this.props.country, ', ') }</small>
      </div>
    )
  }

  /**
   * @param {string} value
   * @param {string} delimiter
   * @return {*}
   */
  composeAddress(value: any, delimiter = '') {
    if (!value) return ''
    return <span>{delimiter + value}</span>
  }
}

export default connect(
    (state: {location: any}) => {
      return {
        location: state.location,
      }
    }, null
)(SetCityItem)
