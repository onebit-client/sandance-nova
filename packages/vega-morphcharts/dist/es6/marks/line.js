/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { colorFromString } from '../color';
//change direction of y from SVG to GL
const ty = -1;
const markStager = (options, stage, scene, x, y, groupType) => {
    const g = Object.assign({ opacity: 1, strokeOpacity: 1, strokeWidth: 1 }, scene.items[0]);
    const path = {
        strokeWidth: g.strokeWidth,
        strokeColor: colorFromString(g.stroke),
        positions: scene.items.map((it) => [
            it.x,
            ty * it.y,
            it.z || 0,
        ]),
    };
    path.strokeColor[3] *= g.strokeOpacity;
    path.strokeColor[3] *= g.opacity;
    stage.pathData.push(path);
};
export default markStager;
