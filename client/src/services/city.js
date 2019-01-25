/**
 * Service for working with cities
 */
class CityService {
  /**
   * Api root
   * @type {string}
   * @private
   */
  _url = process.env.REACT_APP_API_PATH;

  /**
   * Grab list of cities where city like function agr
   * @param {string} city name of city or part of it
   * @return {Promise<Response>}
   */
  async getCities(city) {
    const response = await fetch(`${this._url}/cities/getByName/${city}`);
    if (response.ok) return await response.json();
    throw new Error(response.status);
  }
}

export default CityService;
