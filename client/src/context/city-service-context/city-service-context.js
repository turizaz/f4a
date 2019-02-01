import React from 'react';

const {
  Provider: CityServiceProvider,
  Consumer: CityServiceConsumer,
} = React.createContext(null);

export {CityServiceConsumer, CityServiceProvider};
