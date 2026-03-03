/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { CanvasHandler, inferType, inferTypes, loader, parse, read, Renderer, renderModule, sceneVisit, scheme, truncate, View } from 'vega-typings';
/**
 * Vega library dependency.
 */
export interface VegaBase {
    CanvasHandler: CanvasHandler;
    inferType: typeof inferType;
    inferTypes: typeof inferTypes;
    loader: typeof loader;
    parse: typeof parse;
    read: typeof read;
    renderModule: typeof renderModule;
    Renderer: typeof Renderer;
    sceneVisit: typeof sceneVisit;
    scheme: typeof scheme;
    truncate: typeof truncate;
    View: typeof View;
}
/**
 * References to dependency libraries.
 */
export interface Base {
    vega: VegaBase;
}
/**
 * References to dependency libraries.
 */
export declare const base: Base;
/**
 * Specify the dependency libraries to use for rendering.
 * @param vega Vega library.
 */
export declare function use(vega: VegaBase): void;
