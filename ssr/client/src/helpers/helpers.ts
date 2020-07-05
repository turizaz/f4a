import {OrderedMap, Map} from 'immutable';

/**
 * @param {Array} arr
 * @param {function} DataRecord
 * @return {*}
 */
export function arrToMap(arr: any, DataRecord = Map) {
  return arr.reduce(
      // @ts-ignore
      (acc: any, item: any) => acc.set(item.id, new DataRecord(item)),
      // @ts-ignore
      new OrderedMap({})
  );
}

/**
 * @param {object} obj
 * @return {Array<T>}
 */
export function mapToArr(obj: any) {
  return obj.valueSeq().toArray()
}
