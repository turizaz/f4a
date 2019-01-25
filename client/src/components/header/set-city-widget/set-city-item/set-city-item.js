import React from 'react';
import PropTypes from 'prop-types';
import './set-city-item.scss';
/**
 * Item for autocomplete list
 */
class SetCityItem extends React.Component {
  /**
   * @return {string} html
   */
  render() {
    return (
      <div className="city-item" onClick={
        () => {
          this.props.doChoice(`${this.props.name}, ${this.props.country}`);
        }}>
        {this.props.name ? <span>{this.props.name}</span>: ''}
        {this.props.region ? <span>, {this.props.region}</span>: ''}
        {this.props.country ? <span>, {this.props.country}</span>: ''}
      </div>
    );
  }
}
SetCityItem.propTypes = {
  name: PropTypes.string,
  country: PropTypes.string,
  region: PropTypes.string,
  doChoice: PropTypes.func,
};
export default SetCityItem;
