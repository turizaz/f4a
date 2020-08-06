import {START, SUCCESS, FAIL} from '../constants'
import axios from '../libs/axios'

export default (store: any) => (next: any) => (action: any) => {
  const {callApi, type, ...rest} = action
  if (!callApi) return next(action)

  next({
    ...rest,
    type: type + START,
  });
  return axios.get(callApi).then(
      (response) => {
        next({...rest, type: type + SUCCESS, payload:
            {...response, store: store.getState()}})
      },
      (error) => {
        next({...rest, type: type + FAIL, error})
      }
  );
};
