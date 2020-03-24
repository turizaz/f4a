import {LOADING, LOADED} from "../constants";

export function loading() {
    console.log('loading')
    return {
        type: LOADING,
    }
}
export function loaded() {
    console.log('loaded')
    return {
        type: LOADED,
    }
}
