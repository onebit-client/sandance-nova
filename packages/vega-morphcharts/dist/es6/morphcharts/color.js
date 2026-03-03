/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { colorFromString } from '../color';
export class ColorMap {
    constructor(quant = 5) {
        this.quant = quant;
        this.colorMap = {};
        this.colorArray = [];
    }
    getColorKey(rgbaColor) {
        const color = rgbaColor.slice(0, 3).map(e => Math.floor(e / this.quant) * this.quant);
        color[3] = rgbaColor[3]; //retain alpha
        return JSON.stringify(color);
    }
    registerColor(rgbaColor) {
        const colorKey = this.getColorKey(rgbaColor);
        if (!this.colorMap[colorKey]) {
            this.colorMap[colorKey] = {
                index: this.colorArray.length,
                rgbaColor,
            };
            this.colorArray.push(rgbaColor);
        }
        return this.colorMap[colorKey].index;
    }
    getPalette() {
        return {
            palette: new Uint8Array(this.colorArray.flat()),
            maxColor: this.colorArray.length - 1,
        };
    }
}
function convert(newColor) {
    const c = colorFromString(newColor).slice(0, 3);
    return c.map(v => v / 255);
}
export function colorConfig(ref, colors) {
    if (!colors)
        return;
    const { config } = ref.core;
    config.activeColor = convert(colors.activeItemColor);
    config.backgroundColor = new Float32Array(convert(colors.backgroundColor));
    config.textColor = convert(colors.textColor);
    config.textBorderColor = convert(colors.textBorderColor);
    config.axesTextColor = convert(colors.axesTextLabelColor);
    config.axesGridBackgroundColor = convert(colors.axesGridBackgroundColor);
    config.axesGridHighlightColor = convert(colors.axesGridHighlightColor);
    config.axesGridMinorColor = convert(colors.axesGridMinorColor);
    config.axesGridMajorColor = convert(colors.axesGridMajorColor);
    config.axesGridZeroColor = convert(colors.axesGridZeroColor);
    //TODO fix this - hack to reset the background color
    ref.core.renderer['_theme'] = null;
}
