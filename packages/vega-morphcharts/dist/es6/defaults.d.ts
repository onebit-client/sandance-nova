/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Axis, PresenterConfig, PresenterStyle, Stage, StyledLine, VegaTextLayerDatum } from './interfaces';
import { View } from '@msrvida/chart-types';
import { SceneLine, SceneText } from 'vega-typings/types/runtime/scene';
export declare const minHeight = "100px";
export declare const minWidth = "100px";
export declare const defaultPresenterStyle: PresenterStyle;
export declare const defaultPresenterConfig: PresenterConfig;
export declare function createStage(view: View): Stage;
export declare const groupStrokeWidth = 1;
export declare const lineZ = 0;
export declare const defaultView: View;
export declare const minZ = 0.5;
export declare const min3dDepth = 0.05;
export declare const minPixelSize = 0.5;
export declare function defaultOnAxisItem(vegaItem: SceneLine | SceneText, stageItem: StyledLine | VegaTextLayerDatum, stage: Stage, currAxis: Axis): void;
