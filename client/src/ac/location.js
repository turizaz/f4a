import {SET_CITY} from '../constants';

/**
 * Set city action
 * @param {object} city
 * @return {{payload: *, type: string}}
 */
export function setCity(city) {
  return {
    type: SET_CITY,
    payload: city,
  };
}
