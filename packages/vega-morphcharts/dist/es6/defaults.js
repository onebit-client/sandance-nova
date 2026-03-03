/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { colorIsEqual } from './color';
export const minHeight = '100px';
export const minWidth = '100px';
export const defaultPresenterStyle = {
    cssPrefix: 'vega-morphcharts-',
    defaultCubeColor: [128, 128, 128, 255],
    highlightColor: [0, 0, 0, 255],
};
export const defaultPresenterConfig = {
    onCubeClick: (e, cube) => { },
    onCubeHover: (e, cube) => { },
    transitionDurations: {
        position: 600,
        stagger: 600,
        view: 600,
    },
    renderer: {
        advanced: false,
        advancedOptions: {},
        basicOptions: {
            antialias: true,
        },
    },
};
export function createStage(view) {
    const stage = {
        view,
        cubeData: [],
        pathData: [],
        axes: {
            x: [],
            y: [],
            z: [],
        },
        gridLines: [],
        textData: [],
        legend: {
            rows: {},
        },
        facets: [],
    };
    return stage;
}
export const groupStrokeWidth = 1;
export const lineZ = 0;
export const defaultView = '2d';
export const minZ = 0.5;
export const min3dDepth = 0.05;
export const minPixelSize = 0.5;
const zAxisEncodeColor = [7, 7, 7, 255];
const zAxisOutColor = [0, 0, 0, 255];
export function defaultOnAxisItem(vegaItem, stageItem, stage, currAxis) {
    if (colorIsEqual(stageItem.color, zAxisEncodeColor)) {
        stageItem.color = zAxisOutColor;
        if (currAxis.axisRole !== 'z') {
            const previousAxisRole = removeCurrentAxes(stage, currAxis);
            if (previousAxisRole) {
                currAxis.axisRole = 'z';
                stage.axes.z.push(currAxis);
            }
            else {
                //debug: curr axis not found
            }
        }
    }
}
function removeCurrentAxes(stage, currAxis) {
    //find the current axis, remove it from parent
    for (const axisRole in stage.axes) {
        const axes = stage.axes[axisRole];
        for (let i = 0; i < axes.length; i++) {
            if (axes[i] === currAxis) {
                axes.splice(i, 1);
                return axisRole;
            }
        }
    }
}
