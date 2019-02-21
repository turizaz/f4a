import {OrderedMap, Map} from 'immutable';

/**
 * @param {Array} arr
 * @param {function} DataRecord
 * @return {*}
 */
export function arrToMap(arr, DataRecord = Map) {
  return arr.reduce(
      (acc, item) => acc.set(item.id, new DataRecord(item)),
      new OrderedMap({})
  );
}

/**
 * @param {object} obj
 * @return {Array<T>}
 */
export function mapToArr(obj) {
  return obj.valueSeq().toArray();
}
