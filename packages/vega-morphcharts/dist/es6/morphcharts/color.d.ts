/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { MorphChartsColors, MorphChartsRef, RGBAColor } from '../interfaces';
export declare class ColorMap {
    quant: number;
    private colorMap;
    private colorArray;
    constructor(quant?: number);
    private getColorKey;
    registerColor(rgbaColor: RGBAColor): number;
    getPalette(): {
        palette: Uint8Array<ArrayBuffer>;
        maxColor: number;
    };
}
export declare function colorConfig(ref: MorphChartsRef, colors: MorphChartsColors): void;
