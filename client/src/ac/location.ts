import {LOAD_GAMES, SET_CITY, SUCCESS} from '../constants';
import {loadGames} from './games';
/**
 * Set city action
 * @return {{payload: *, type: string}}
 */
export function setCity(city: any) {
  if (!city) {
    return (dispatch: any) => {
      localStorage.setItem('location', '')
      dispatch({type: LOAD_GAMES+SUCCESS, payload: {data: null}})
      dispatch({
        type: SET_CITY,
        payload: city,
      })
    }
  }
  return (dispatch: any) => {
    localStorage.setItem('location', JSON.stringify(city))
    dispatch(loadGames(city))
    dispatch({type: SET_CITY, payload: city})
  }
}
