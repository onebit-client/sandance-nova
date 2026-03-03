/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Components, Core } from 'morphcharts';
import { vec3 } from 'gl-matrix';
import { IBounds } from '../interfaces';
export declare function getImageData(url: string): Promise<ImageData>;
export declare function createImageQuad(core: Core, imageData: ImageData, bounds: IBounds, position: vec3, width: number, height: number): Components.ImageQuad;
