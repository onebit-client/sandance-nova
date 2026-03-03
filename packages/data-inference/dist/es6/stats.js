/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { isColor } from './color';
import { detectNegative, detectSequentialColumn } from './numeric';
export function getStats(data, ...args) {
    let columnName;
    let columnType;
    let columnQuantitative;
    let distinctValuesCallback;
    if (args.length <= 2) {
        const column = args[0];
        columnName = column.name;
        columnType = column.type;
        columnQuantitative = column.quantitative;
        distinctValuesCallback = args[1];
    }
    else {
        columnName = args[0];
        columnType = args[1];
        columnQuantitative = args[2];
        distinctValuesCallback = args[3];
    }
    const distinctMap = {};
    const stats = {
        nonNull: 0,
        distinctValueCount: null,
        max: null,
        mean: null,
        min: null,
    };
    const columnIsString = columnType === 'string';
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const value = columnName == null ? row : row[columnName];
        if (columnIsString) {
            if (value !== '') {
                stats.nonNull++;
            }
        }
        else if (value != null) {
            stats.nonNull++;
        }
        const num = +value;
        distinctMap[value] = true;
        if (!isNaN(num)) {
            if (stats.max === null || num > stats.max) {
                stats.max = num;
            }
            if (stats.min === null || num < stats.min) {
                stats.min = num;
            }
            sum += num;
        }
        // hex codes, ex. #003300, are parsed as dates
        if ((columnType === 'date' || columnIsString) && !stats.hasColorData && isColor(value)) {
            stats.hasColorData = true;
        }
    }
    if (columnQuantitative) {
        stats.mean = data.length > 0 && (sum / data.length);
        stats.hasNegative = detectNegative(columnName, data);
        if (columnType === 'integer') {
            stats.isSequential = detectSequentialColumn(columnName, data);
        }
    }
    const distinctValues = Object.keys(distinctMap);
    if (distinctValuesCallback) {
        distinctValues.sort();
        distinctValuesCallback(distinctValues);
    }
    stats.distinctValueCount = distinctValues.length;
    return stats;
}
