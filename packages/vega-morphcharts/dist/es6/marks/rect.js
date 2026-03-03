/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { base } from '../base';
import { colorFromString } from '../color';
import { min3dDepth, minZ } from '../defaults';
const markStager = (options, stage, scene, x, y, groupType) => {
    base.vega.sceneVisit(scene, function (item) {
        const noZ = item.z === undefined;
        const z = noZ ? 0 : (item.z || 0) + minZ;
        const depth = (noZ ? 0 : (item.depth || 0)) + min3dDepth;
        //change direction of y from SVG to GL
        const ty = -1;
        const ordinal = options.assignCubeOrdinal(item.datum);
        if (ordinal > options.maxOrdinal) {
            options.maxOrdinal = ordinal;
        }
        if (ordinal === undefined) {
            //TODO add to polygons
            //console.log('not a cube');
        }
        else {
            const cube = {
                ordinal,
                size: [item.width, item.height, depth],
                position: [x + ((+item.x) || 0), ty * (y + ((+item.y) || 0)) - (+item.height), z],
                color: colorFromString(item.fill) || options.defaultCubeColor || [128, 128, 128, 128],
            };
            cube.color[3] = item.opacity === undefined ? 255 : 255 * item.opacity;
            stage.cubeData.push(cube);
        }
    });
};
export default markStager;
