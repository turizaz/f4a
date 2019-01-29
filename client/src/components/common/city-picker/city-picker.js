/* eslint-disable no-invalid-this */

import React from 'react';
import SetCityItem from './set-city-item';
import CityService from 'services/city';
import PropTypes from 'prop-types';
import './city-picker.scss';

/**
 * Input which select city
 */
class CityPicker extends React.Component {
  state = {
    cities: [],
    city: '',
  };
  /**
   * React on user input city
   * @param {object} event
   */
  handleChange = async (event) => {
    const city = event.target.value;
    this.setState({
      city,
    });
    const client = new CityService();
    if (city.length > 2) {
      const cities = await client.getCities(city);
      this.setState({
        cities,
      });
    }
  };
  /**
   * Intermediate function to clean list on choice
   * @param {{name: string, id: number, country: string}} city
   * @return {Function}
   */
  pickerDoChoice = (city) => {
    this.setState({
      cities: [],
      city: city.name,
    });
    return this.props.doChoice(city);
  };

  /**
   * City input auto complete
   * @return {string} html
   */
  render() {
    return (
      <div className="city-auto-complete">
        <input
          type="text"
          className="form-control"
          id="city"
          value={this.state.city}
          onChange={this.handleChange}
        />
        {this.state.cities.length ? (
          <div className="list">
            {this.state.cities.map((city) => {
              return (
                <SetCityItem
                  key={city.id}
                  {...city}
                  doChoice={this.pickerDoChoice}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

CityPicker.propTypes = {
  doChoice: PropTypes.func.isRequired,
};

export default CityPicker;
