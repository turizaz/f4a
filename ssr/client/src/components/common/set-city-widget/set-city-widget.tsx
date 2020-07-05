/* eslint-disable no-invalid-this */
import * as React from 'react'
import './set-city-widget.scss'
import CityPicker from '../../../components/common/city-picker'
import {connect} from 'react-redux'
import {setCity} from '../../../ac/location'

interface Props {
  setCity: any,
  location: any
}
/**
 * Set city on which all further game sessions will be based on
 */
class SetCityWidget extends React.Component<Props> {

  componentDidMount() {
    const strLocation = localStorage.getItem('location');
    if (!strLocation) {
      return
    }
    const {setCity} = this.props
    try {
      // @ts-ignore
      setCity(JSON.parse(localStorage.getItem('location')));
    } catch (e) {
      console.error(e)
    }
  }
  resetCity = () => {
    const {setCity} = this.props;
    setCity(null);
  };

  setCity = (city: any) => {
    const {setCity} = this.props;
    setCity(city)
  };

  render() {
    return (
      <div className="city-widget">
        {this.props.location.id ? (
          <span onClick={this.resetCity} className="city-name shadow-1">
            {this.props.location.name}
          </span>
        ) : (
          <div className="table-city-picker shadow-1">
            <CityPicker doChoice={this.setCity}/>
          </div>
        )}
      </div>
    )
  }
}

export default connect(
    (state: {location: any}) => {
      return {
        location: state.location,
      };
    },
    {setCity}
)(SetCityWidget)
