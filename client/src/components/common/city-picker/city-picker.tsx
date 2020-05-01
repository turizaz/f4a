import React from 'react'
import SetCityItem from './set-city-item'
import './city-picker.scss'
import {withCityService} from '../../../HOCs'

interface Props {
  doChoice: any;
  city: string;
  cityService: any;
}

/**
 * Input which select city
 */
class CityPicker extends React.Component<Props> {
  state = {
    cities: [],
    city: '',
    loading: null,
  };

  handleChange = async (event: any) => {
    const city = event.target.value;
    this.setState({city});
    const {cityService} = this.props;
    if (city.length > 2) {
      this.setState({loading: true});
      const cities = await cityService.getCities(city);
      this.setState({loading: false});
      this.setState({cities});
    }
  }

  pickerDoChoice = (city: any) => {
    this.setState({cities: [],city: city.name})
    return this.props.doChoice(city);
  };

  render() {
    return (
      <div className="city-auto-complete">
        <input
          type="text"
          className="form-control"
          autoComplete="off"
          placeholder="Город"
          onChange={this.handleChange}
        />
        {this.state.loading && <div className="lds-hourglass"/>}
        {this.state.cities.length ? (
          <div className="list">
            {this.state.cities.map((city: {id: number}) => {
              return (
                <SetCityItem
                  key={city.id}
                  {...city}
                  doChoice={this.pickerDoChoice}
                />
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }
}

export default withCityService(CityPicker)
