/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { base } from '../base';
import { colorFromString } from '../color';
import { lineZ } from '../defaults';
const markStager = (options, stage, scene, x, y, groupType) => {
    base.vega.sceneVisit(scene, function (item) {
        const x1 = item.x || 0;
        const y1 = item.y || 0;
        const x2 = item.x2 != null ? item.x2 : x1;
        const y2 = item.y2 != null ? item.y2 : y1;
        const lineItem = styledLine(x1 + x, y1 + y, x2 + x, y2 + y, item.stroke, item.strokeWidth);
        const { currAxis } = options;
        if (options.modifyAxis) {
            options.modifyAxis(item, lineItem, stage, currAxis);
        }
        if (item.mark.role === 'axis-tick') {
            currAxis.ticks.push(lineItem);
        }
        else if (item.mark.role === 'axis-domain') {
            currAxis.domain = lineItem;
        }
        else {
            stage.gridLines.push(lineItem);
        }
    });
};
function styledLine(x1, y1, x2, y2, stroke, strokeWidth) {
    const line = {
        sourcePosition: [x1, -y1, lineZ], //-1 = change direction of y from SVG to GL
        targetPosition: [x2, -y2, lineZ],
        color: colorFromString(stroke),
        strokeWidth: strokeWidth,
    };
    return line;
}
export function box(gx, gy, height, width, stroke, strokeWidth, diagonals = false) {
    const lines = [
        styledLine(gx, gy, gx + width, gy, stroke, strokeWidth),
        styledLine(gx + width, gy, gx + width, gy + height, stroke, strokeWidth),
        styledLine(gx + width, gy + height, gx, gy + height, stroke, strokeWidth),
        styledLine(gx, gy + height, gx, gy, stroke, strokeWidth),
    ];
    if (diagonals) {
        lines.push(styledLine(gx, gy, gx + width, gy + height, stroke, strokeWidth));
        lines.push(styledLine(gx, gy + height, gx + width, gy, stroke, strokeWidth));
    }
    return lines;
}
export default markStager;
