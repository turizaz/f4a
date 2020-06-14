import {LOADING, LOADED} from "../constants";

export function loading() {
    console.log('ac loading')
    return {
        type: LOADING,
    }
}
export function loaded() {
    console.log('ac loaded')
    return {
        type: LOADED,
    }
}
