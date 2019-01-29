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
