/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { MorphChartsCore, MorphChartsRef, PresenterConfig } from '../interfaces';
import { View } from '@msrvida/chart-types';
export declare function applyCameraCallbacks(ref: MorphChartsRef, lastPresenterConfig: PresenterConfig, lastView: View, transistion2dOnly: boolean): void;
export declare function setTransitionTimeAxesVisibility(transistion2dOnly: boolean, core: MorphChartsCore): void;
