import React from 'react';
import PropTypes from 'prop-types';
import './set-city-item.scss';
import {connect} from 'react-redux';

/**
 * Item for autocomplete list
 */
class SetCityItem extends React.Component {
  /**
   * @return {string} html
   */
  render() {
    const {name, country, id, doChoice} = this.props;
    return (
      <div className="city-item" onClick={
        () => {
          doChoice({name: name, country: country, id: id});
        }}>
        { this.composeAddress(this.props.name) }
        { this.composeAddress(this.props.region, ', ') }
        { this.composeAddress(this.props.country, ', ') }
      </div>
    );
  }

  /**
   * @param {string} value
   * @param {string} delimiter
   * @return {*}
   */
  composeAddress(value, delimiter = '') {
    if (!value) return '';
    return <span>{delimiter + value}</span>;
  }
}
SetCityItem.propTypes = {
  name: PropTypes.string,
  country: PropTypes.string,
  region: PropTypes.string,
  doChoice: PropTypes.func.isRequired,
  id: PropTypes.number,
};
export default connect(
    (state) => {
      return {
        location: state.location,
      };
    }, null
)(SetCityItem);
