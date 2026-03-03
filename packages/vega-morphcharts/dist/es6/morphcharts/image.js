/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Components } from 'morphcharts';
export function getImageData(url) {
    return new Promise((resolve, reject) => {
        const imageElement = document.createElement('img');
        imageElement.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const { height, width } = imageElement;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(imageElement, 0, 0);
            resolve(ctx.getImageData(0, 0, width, height));
        };
        imageElement.src = url;
    });
}
export function createImageQuad(core, imageData, bounds, position, width, height) {
    const { maxBoundsX, maxBoundsY, maxBoundsZ, minBoundsX, minBoundsY, minBoundsZ } = bounds;
    const imageOptions = {
        imageData,
        position,
        height,
        width,
        minBoundsX,
        maxBoundsX,
        minBoundsZ,
        maxBoundsZ,
        minBoundsY,
        maxBoundsY,
    };
    return new Components.ImageQuad(core, imageOptions);
}
