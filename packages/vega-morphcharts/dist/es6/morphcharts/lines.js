/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { Layouts, UnitType } from 'morphcharts';
import { increment } from './bounds';
import { ColorMap } from './color';
const key = 'line';
export const createLineLayer = (props) => {
    const { height, ref, stage, width } = props;
    const { core } = ref;
    const lines = new Layouts.Line(core);
    const { ids, fromIds, toIds, lineColors, lineSizes, bounds, positionsX, positionsY, positionsZ, lineMaxColor, palette, } = convert(stage, height, width);
    if (!ids.length)
        return;
    const { renderer } = core;
    let lineTransitionBuffer = renderer.transitionBuffers.find(t => t.key === key);
    if (!lineTransitionBuffer) {
        lineTransitionBuffer = renderer.createTransitionBuffer(ids);
        lineTransitionBuffer.key = key;
        renderer.transitionBuffers.push(lineTransitionBuffer);
    }
    else {
        lineTransitionBuffer.swap();
    }
    lines.layout(lineTransitionBuffer.currentBuffer, ids, fromIds, toIds, {
        positionsX,
        positionsY,
        positionsZ,
        lineSizes,
        sizeScaling: 1,
    });
    let options = {
        lineColors,
        lineMinColor: 0,
        lineMaxColor,
    };
    // Unit type
    lineTransitionBuffer.currentBuffer.unitType = UnitType.cylinder;
    lineTransitionBuffer.currentPalette.colors = palette;
    return {
        update: newBounds => {
            options = Object.assign(Object.assign({}, options), newBounds);
            // reference off of core.renderer to get the actual buffer
            const currLineTransitionBuffer = core.renderer.transitionBuffers.find(t => t.key === key);
            lines.update(currLineTransitionBuffer.currentBuffer, ids, fromIds, toIds, options);
        },
        bounds,
        unitColorMap: {
            ids,
            colors: lineColors,
            minColor: 0,
            maxColor: lineMaxColor,
            palette,
        },
    };
};
function convert(stage, height, width) {
    const { pathData } = stage;
    const positions = [];
    const lines = [];
    const colorMap = new ColorMap();
    pathData.forEach(path => {
        const color = colorMap.registerColor(path.strokeColor);
        let from = positions.length;
        positions.push(path.positions[0]);
        for (let i = 1; i < path.positions.length; i++) {
            const to = positions.length;
            positions.push(path.positions[i]);
            lines.push({
                id: lines.length,
                from,
                to,
                color,
                size: path.strokeWidth,
            });
            from = to;
        }
    });
    const ids = new Uint32Array(lines.length);
    const fromIds = new Uint32Array(lines.length);
    const toIds = new Uint32Array(lines.length);
    const lineColors = new Float64Array(lines.length);
    const lineSizes = new Float64Array(lines.length);
    lines.forEach((line, i) => {
        ids[i] = i;
        fromIds[i] = line.from;
        toIds[i] = line.to;
        lineColors[i] = line.color;
        lineSizes[i] = line.size;
    });
    const positionsX = new Float64Array(positions.length);
    const positionsY = new Float64Array(positions.length);
    const positionsZ = new Float64Array(positions.length);
    let bounds;
    positions.forEach((p, i) => {
        positionsX[i] = p[0];
        positionsY[i] = p[1] + height;
        positionsZ[i] = p[2];
        bounds = increment(bounds, positionsX[i], positionsY[i], positionsZ[i], positionsX[i], positionsY[i], positionsZ[i]);
    });
    const { palette, maxColor: lineMaxColor } = colorMap.getPalette();
    return {
        ids,
        fromIds,
        toIds,
        lineColors,
        lineSizes,
        bounds,
        positionsX,
        positionsY,
        positionsZ,
        lineMaxColor,
        palette,
    };
}
