/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Core, Renderers } from 'morphcharts';
import { RendererBase } from 'morphcharts/dist/renderers/renderer';
import { MorphChartsRendererOptions } from '../interfaces';
export declare function shouldChangeRenderer(prev: MorphChartsRendererOptions, next: MorphChartsRendererOptions): boolean;
export declare function getRenderer(mcRendererOptions: MorphChartsRendererOptions, core: Core): Renderers.Advanced.Main | Renderers.Basic.Main;
export declare function setRendererOptions(renderer: RendererBase, mcRendererOptions: MorphChartsRendererOptions): void;
export declare function rendererEnabled(advanced: boolean): boolean;
