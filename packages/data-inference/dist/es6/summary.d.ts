/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Column } from '@msrvida/chart-types';
export declare namespace pandasSimulation {
    function head(columns: Column[], data: object[], maxWidth?: number): string;
    function info(columns: Column[], data: object[], maxWidth?: number): string;
}
