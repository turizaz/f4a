import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from 'reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import api from 'middlewares/api';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, api))
);
export default store;
