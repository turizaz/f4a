import React from 'react';
import {CityServiceConsumer} from 'context/city-service-context';

const withCityService = (WrappedComponent) => {
  return function WithCityService(props) {
    return (
      <CityServiceConsumer>
        {(cityService) => {
          return <WrappedComponent {...props} cityService={cityService} />;
        }}
      </CityServiceConsumer>
    );
  };
};
export default withCityService;
