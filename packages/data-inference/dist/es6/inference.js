/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { checkIsColorData } from './color';
import { isQuantitative } from './numeric';
import { getStats } from './stats';
/**
 * Derive column metadata from the data array.
 * @param data Array of data objects.
 */
export function getColumnsFromData(inferTypesFn, data, columnTypes) {
    const sample = data[0];
    const fields = sample ? Object.keys(sample) : [];
    const inferences = Object.assign(Object.assign({}, inferTypesFn(data, fields)), columnTypes);
    const columns = fields.map(name => {
        const column = {
            name,
            type: inferences[name],
        };
        return column;
    });
    inferAll(columns, data);
    return columns;
}
/**
 * Populate columns with type inferences and stats.
 * @param columns Array of columns.
 * @param data Array of data objects.
 */
export function inferAll(columns, data) {
    columns.forEach(column => {
        if (column) {
            if (typeof column.quantitative !== 'boolean') {
                column.quantitative = isQuantitative(column);
            }
            if (!column.stats) {
                column.stats = getStats(data, column);
            }
            // hex codes, ex. #003300, are parsed as dates
            if ((column.type === 'date' || column.type === 'string') && typeof column.isColorData !== 'boolean') {
                checkIsColorData(data, column);
            }
        }
    });
}
