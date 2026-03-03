/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
export declare function concat<T>(...args: T[][]): T[];
/**
 * Returns array with items which are truthy.
 * @param args array or arrays to concat into a single array.
 */
export declare function allTruthy<T>(...args: T[][]): T[];
/**
 * Add an array to an existing array in place.
 * @param arr Array to append to.
 * @param items Arrof of items to append.
 */
export declare function push<T>(arr: T[], items: T[]): void;
