/* eslint-disable no-invalid-this */

import React from 'react';
import SetCityItem from './set-city-item';
import PropTypes from 'prop-types';
import './city-picker.scss';
import {withCityService} from 'hoc-helpers';

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
    const {cityService} = this.props;
    if (city.length > 2) {
      this.setState({loading: true});
      const cities = await cityService.getCities(city);
      console.log(cities);
      this.setState({loading: false});
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
   * Listen selected value from parent component
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.state.city) {
      this.setState({city: nextProps.city});
    }
  }
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
          value={this.state.city}
          autoComplete="off"
          placeholder="Город"
          onChange={this.handleChange}
        />
        {this.state.loading && <div className="lds-hourglass"/>}
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
  city: PropTypes.string,
  cityService: PropTypes.object.isRequired,
};

export default withCityService(CityPicker);
