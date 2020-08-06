import * as React from 'react'
import {CityServiceConsumer} from '../context/city-service-context'

const withCityService = (WrappedComponent: any) => {
  return function WithCityService(props: any) {
    return (
      <CityServiceConsumer>
        {(cityService) => {
          return <WrappedComponent {...props} cityService={cityService} />
        }}
      </CityServiceConsumer>
    )
  }
}
export default withCityService
