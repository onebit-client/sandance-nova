/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
const vega = {
    CanvasHandler: null,
    inferType: null,
    inferTypes: null,
    loader: null,
    parse: null,
    read: null,
    renderModule: null,
    Renderer: null,
    sceneVisit: null,
    scheme: null,
    truncate: null,
    View: null,
};
/**
 * References to dependency libraries.
 */
export const base = {
    vega,
};
/**
 * Specify the dependency libraries to use for rendering.
 * @param vega Vega library.
 */
export function use(vega) {
    base.vega = vega;
}
