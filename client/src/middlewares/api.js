import {START, SUCCESS, FAIL} from '../constants';
import axios from 'axios';

export default (store) => (next) => (action) => {
  const {callApi, type, ...rest} = action;
  if (!callApi) return next(action);

  next({
    ...rest,
    type: type + START,
  });

  return axios.get(callApi).then(
      (response) => {
        next({...rest, type: type + SUCCESS, response});
      },
      (error) => {
        next({...rest, type: type + FAIL, error});
      }
  );
};
