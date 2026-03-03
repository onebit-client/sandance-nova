/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Column, ColumnStats } from '@msrvida/chart-types';
import { TypeInference } from 'vega-typings';
export declare function getStats(data: object[] | Float64Array, columnName: string | number, columnType: TypeInference, columnQuantitative: boolean, distinctValuesCallback?: (distinctValues: string[]) => void): ColumnStats;
export declare function getStats(data: object[], column: Column, distinctValuesCallback?: (distinctValues: string[]) => void): ColumnStats;
