import {LOAD_GAMES, SET_CITY, SUCCESS} from '../constants';
import {loadGames} from './games';
/**
 * Set city action
 * @param {object} city
 * @return {{payload: *, type: string}}
 */
export function setCity(city) {
  if (!city) {
    return (dispatch) => {
      localStorage.setItem('location', '');
      dispatch({type: LOAD_GAMES+SUCCESS, payload: {data: null}});
      dispatch({
        type: SET_CITY,
        payload: city,
      });
    };
  }
  return (dispatch) => {
    localStorage.setItem('location', JSON.stringify(city));
    dispatch(loadGames(city));
    dispatch({type: SET_CITY, payload: city});
  };
}
