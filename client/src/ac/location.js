import {SET_CITY} from '../constants';
import {loadGames} from './game';
/**
 * Set city action
 * @param {object} city
 * @return {{payload: *, type: string}}
 */
export function setCity(city) {
  return (dispatch) => {
    console.log(dispatch(loadGames(city)));
    return {
      type: SET_CITY,
      payload: city,
    };
  };
}
