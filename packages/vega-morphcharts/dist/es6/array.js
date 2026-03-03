/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
export function concat(...args) {
    return args.reduce((p, c) => c ? p.concat(c) : p, []);
}
/**
 * Returns array with items which are truthy.
 * @param args array or arrays to concat into a single array.
 */
export function allTruthy(...args) {
    return args.reduce((p, c) => c ? p.concat(c) : p, []).filter(Boolean);
}
/**
 * Add an array to an existing array in place.
 * @param arr Array to append to.
 * @param items Arrof of items to append.
 */
export function push(arr, items) {
    arr.push.apply(arr, items);
}
