import {SET_CITY} from '../constants';
import {loadGames} from './games';
/**
 * Set city action
 * @param {object} city
 * @return {{payload: *, type: string}}
 */
export function setCity(city) {
  if (!city) {
    localStorage.setItem('location', '');
    return {
      type: SET_CITY,
      payload: city,
    };
  }
  return (dispatch) => {
    localStorage.setItem('location', JSON.stringify(city));
    dispatch(loadGames(city));
    dispatch({type: SET_CITY, payload: city});
  };
}
