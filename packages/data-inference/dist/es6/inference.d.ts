/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Column, ColumnTypeMap } from '@msrvida/chart-types';
import { inferTypes } from 'vega-typings';
/**
 * Derive column metadata from the data array.
 * @param data Array of data objects.
 */
export declare function getColumnsFromData(inferTypesFn: typeof inferTypes, data: object[], columnTypes?: ColumnTypeMap): Column[];
/**
 * Populate columns with type inferences and stats.
 * @param columns Array of columns.
 * @param data Array of data objects.
 */
export declare function inferAll(columns: Column[], data: object[]): void;
