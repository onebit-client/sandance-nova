/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import * as _deepmerge from 'deepmerge';
import { isPlainObject } from 'is-plain-object';
const deepmerge = (_deepmerge.default || _deepmerge);
export function clone(objectToClone) {
    if (!objectToClone)
        return objectToClone;
    return deepmerge.all([objectToClone]);
}
const dontMerge = (destination, source) => source;
export function deepMerge(...objectsToMerge) {
    const objects = objectsToMerge.filter(Boolean);
    return deepmerge.all(objects, { arrayMerge: dontMerge, isMergeableObject: isPlainObject });
}
