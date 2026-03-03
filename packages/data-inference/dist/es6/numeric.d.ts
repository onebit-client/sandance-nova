/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Column } from '@msrvida/chart-types';
export declare function isQuantitative(column: Column): boolean;
export declare function detectNegative(columnName: string | number, data: object[] | Float64Array): boolean;
export declare function detectSequentialColumn(columnName: string | number, data: object[] | Float64Array): boolean;
