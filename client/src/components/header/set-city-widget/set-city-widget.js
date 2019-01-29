/* eslint-disable no-invalid-this */

import React from 'react';
import './set-city-widget.scss';
import CityService from 'services/city';
import SetCityItem from './set-city-item';

/**
 * Set city on which all further game sessions will be based on
 */
class SetCityWidget extends React.Component {
  state = {
    cities: [],
    selectedCity: '',
  };
  /**
   * React on user input city
   * @param {object} event
   */
  handleChange = async (event) => {
    const value = event.target.value;
    const client = new CityService();
    if (value.length > 2) {
      const cities = await client.getCities(value);
      this.setState({
        cities,
      });
    }
  };

  /**
   * Boomerang Function which will return choice from child
   * @param {string} city
   */
  doChoice = (city) => {
    this.setState({
      cities: [],
      selectedCity: city,
    });
  };

  /**
   * @param {body} event
   */
  selectCity = (event) => {
    console.log(event);
  };

  /**
   * Input to select city
   * @return {string} html
   */
  inputSection = () => {
    return (
      <div className="col-6 city-auto-complete">
        <input
          type="text"
          className="form-control"
          onChange={this.handleChange}/>
        {this.state.cities.length ?
          <div className="list">
            {this.state.cities.map((city) => {
              return <SetCityItem
                key={city.id}
                {...city}
                doChoice={this.doChoice}/>;
            })
            }
          </div>
          : null}
      </div>
    );
  };

  /**
   * Main view for widget
   *  @return {string} - html
   */
  render() {
    return (
      <div className="form-row city-widget">
        <span className="city-name col-3">Город : </span>
        {this.state.selectedCity
          ?
          <span className="city-name" onClick={this.resetSearch}>
            {this.state.selectedCity}
          </span> :
          this.inputSection()
        }
      </div>
    );
  }

  resetSearch = () => {
    this.setState({
      selectedCity: null,
    });
  };
}

export default SetCityWidget;
