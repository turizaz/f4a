import {LOAD_GAMES} from '../constants';
/**
 * Api root
 * @type {string}
 * @private
 */
const _url = process.env.REACT_APP_API_PATH;

/**
 * Set city action
 * @param {object} city
 * @return {{payload: *, type: string}}
 */
export function loadGames(city) {
  return {
    type: LOAD_GAMES,
    callApi: `${_url}/load-games/${city.id}`,
  };
}
