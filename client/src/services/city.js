import axios from 'axios';

/**
 * Service for working with cities
 */
class CityService {
  /**
   * Grab list of cities where city like function agr
   * @param {string} city name of city or part of it
   * @return {Promise<Response>}
   */
  getCities(city) {
    if (city) {
      return axios.get(`/cities/getByName/${city}`).then((res) => res.data);
    }
    return new Promise((resolve) => {
      resolve([]);
    });
  }
}

export default CityService;
