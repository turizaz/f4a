/* eslint-disable no-invalid-this */
import React from 'react';
import './set-city-widget.scss';
import CityPicker from 'components/common/city-picker';
import {connect} from 'react-redux';
import ProptTypes from 'prop-types';
import {setCity} from 'ac/location';

/**
 * Set city on which all further game sessions will be based on
 */
class SetCityWidget extends React.Component {
  /**
   * Init location
   */
  componentDidMount() {
    const strLocation = localStorage.getItem('location');
    if (strLocation) {
      const {setCity} = this.props;
      try {
        setCity(JSON.parse(localStorage.getItem('location')));
      } catch (e) {
        console.log(e);
      }
    }
  }
  resetCity = () => {
    const {setCity} = this.props;
    setCity(null);
  };
  /**
   * Set City
   * @param {{name: string, id: number, country: string}}city
   */
  setCity = (city) => {
    const {setCity} = this.props;
    setCity(city);
  };
  /**
   * Main view for widget
   *  @return {string} - html
   */
  render() {
    return (
      <div className="form-row city-widget">
        <span className="city-name col-3">Город : </span>
        {this.props.location.id ? (
          <span onClick={this.resetCity} className="city-name">
            {this.props.location.name}
          </span>
        ) : (
          <CityPicker doChoice={this.setCity}/>
        )}
      </div>
    );
  }
}

SetCityWidget.propTypes = {
  location: ProptTypes.object,
  setCity: ProptTypes.func.isRequired,
};

export default connect(
    (state) => {
      return {
        location: state.location,
      };
    },
    {setCity}
)(SetCityWidget);
