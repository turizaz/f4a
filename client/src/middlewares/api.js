import {START, SUCCESS, FAIL} from '../constants';
import axios from 'axios';

export default (store) => (next) => (action) => {
  const {callAPI, type, ...rest} = action;
  if (!callAPI) return next(action);

  next({
    ...rest,
    type: type + START,
  });

  return axios.get(callAPI).then(
      (response) => {
        next({...rest, type: type + SUCCESS, response});
      },
      (error) => {
        next({...rest, type: type + FAIL, error});
      }
  );
};
