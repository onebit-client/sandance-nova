/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
export function isQuantitative(column) {
    return column.type === 'number' || column.type === 'integer';
}
export function detectNegative(columnName, data) {
    for (let i = 1; i < data.length; i++) {
        const value = columnName == null ? data[i] : data[i][columnName];
        if (value < 0)
            return true;
    }
    return false;
}
export function detectSequentialColumn(columnName, data) {
    if (data.length < 2)
        return false;
    for (let i = 1; i < data.length; i++) {
        const curr = columnName == null ? data[i] : data[i][columnName];
        const prev = columnName == null ? data[i - 1] : data[i - 1][columnName];
        if (curr !== prev + 1)
            return false;
    }
    return true;
}
