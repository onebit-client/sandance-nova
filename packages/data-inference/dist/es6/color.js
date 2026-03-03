/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { color as d3color } from 'd3-color';
export function isColor(cssColorSpecifier) {
    return !!d3color(cssColorSpecifier);
}
export function checkIsColorData(data, column) {
    if (!column.stats.hasColorData) {
        column.isColorData = false;
        return;
    }
    for (let i = 0; i < data.length; i++) {
        if (!isColor(data[i][column.name])) {
            column.isColorData = false;
            return;
        }
    }
    column.isColorData = true;
}
