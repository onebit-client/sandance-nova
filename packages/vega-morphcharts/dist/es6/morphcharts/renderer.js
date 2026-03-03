/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Renderers } from 'morphcharts';
export function shouldChangeRenderer(prev, next) {
    var _a, _b;
    if (!prev || !next)
        return true;
    if (prev.advanced !== next.advanced)
        return true;
    if (!prev.advanced) {
        return ((_a = prev.basicOptions) === null || _a === void 0 ? void 0 : _a.antialias) != ((_b = next.basicOptions) === null || _b === void 0 ? void 0 : _b.antialias);
    }
}
export function getRenderer(mcRendererOptions, core) {
    const advanced = mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.advanced;
    const r = advanced ?
        new Renderers.Advanced.Main()
        :
            new Renderers.Basic.Main(mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.basicOptions);
    core.renderer = r;
    setRendererOptions(r, mcRendererOptions);
    return r;
}
export function setRendererOptions(renderer, mcRendererOptions) {
    const o = mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.advancedOptions;
    if ((mcRendererOptions === null || mcRendererOptions === void 0 ? void 0 : mcRendererOptions.advanced) && o) {
        for (const key in o) {
            renderer.config[key] = o[key];
        }
    }
}
export function rendererEnabled(advanced) {
    const r = advanced ?
        new Renderers.Advanced.Main()
        :
            new Renderers.Basic.Main();
    return r.isSupported;
}
