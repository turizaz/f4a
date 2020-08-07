import axios from '../libs/axios'

/**
 * Service for working with cities
 */
class CityService {

  getCities(city: any) {
    if (city) {
      return axios.get(`/cities/getByName/${city}`).then((res) => res.data)
    }
    return new Promise((resolve) => {
      resolve([])
    })
  }
}

export default CityService
