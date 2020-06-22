// @ts-nocheck
import {LOADING, LOADED} from '../constants'
import {Record} from 'immutable'

const initialState = new Record({
    loading: false,
    loaded: false
})();

export default (state = initialState, action) => {
    console.log('TYPE ----', action.type)
    switch (action.type) {
        case LOADING:
            console.log('loading !!!!')
            return state.set('loading', true).set('loaded', false)
        case LOADED:
            return state.set('loading', false).set('loaded', true)
        default:
            return state
    }
};
