/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import legend from './marks/legend';
import image from './marks/image';
import rect from './marks/rect';
import rule, { box } from './marks/rule';
import line from './marks/line';
import text from './marks/text';
import { base } from './base';
import { colorFromString } from './color';
import { groupStrokeWidth } from './defaults';
import { GroupType, } from './marks/interfaces';
function getAxisGroupType(item, options) {
    const axisItem = item;
    const axisMark = axisItem === null || axisItem === void 0 ? void 0 : axisItem.mark;
    if ((axisMark === null || axisMark === void 0 ? void 0 : axisMark.zindex) === options.zAxisZindex && options.zAxisZindex !== undefined) {
        return GroupType.zAxis;
    }
    switch (axisItem.orient) {
        case 'bottom':
        case 'top':
            return GroupType.xAxis;
        case 'left':
        case 'right':
            return GroupType.yAxis;
    }
}
function convertGroupRole(item, options) {
    if (item.mark.role === 'legend')
        return GroupType.legend;
    if (item.mark.role === 'axis') {
        const groupType = getAxisGroupType(item, options);
        if (groupType !== undefined) {
            return groupType;
        }
    }
}
const group = (options, stage, scene, x, y, groupType) => {
    base.vega.sceneVisit(scene, function (g) {
        const gx = g.x || 0, gy = g.y || 0;
        if (g.context && g.context.background && !stage.backgroundColor) {
            stage.backgroundColor = colorFromString(g.context.background);
        }
        if (g.stroke) {
            const facetRect = {
                datum: g.datum,
                lines: box(gx + x, gy + y, g.height, g.width, g.stroke, groupStrokeWidth),
            };
            stage.facets.push(facetRect);
        }
        groupType = convertGroupRole(g, options) || groupType;
        setCurrentAxis(options, stage, groupType);
        // draw group contents
        base.vega.sceneVisit(g, function (item) {
            mainStager(options, stage, item, gx + x, gy + y, groupType);
        });
    });
};
function setCurrentAxis(options, stage, groupType) {
    let axisRole;
    switch (groupType) {
        case GroupType.xAxis:
            axisRole = 'x';
            break;
        case GroupType.yAxis:
            axisRole = 'y';
            break;
        case GroupType.zAxis:
            axisRole = 'z';
            break;
        default:
            return;
    }
    options.currAxis = {
        axisRole,
        domain: null,
        tickText: [],
        ticks: [],
    };
    stage.axes[axisRole].push(options.currAxis);
}
const markStagers = {
    group,
    legend,
    image,
    rect,
    rule,
    line,
    text,
};
const mainStager = (options, stage, scene, x, y, groupType) => {
    if (scene.marktype !== 'group' && groupType === GroupType.legend) {
        legend(options, stage, scene, x, y, groupType);
    }
    else {
        const markStager = markStagers[scene.marktype];
        if (markStager) {
            markStager(options, stage, scene, x, y, groupType);
        }
        else {
            //console.log(`need to render ${scene.marktype}`);
        }
    }
};
export function sceneToStage(options, stage, scene) {
    mainStager(options, stage, scene, 0, 0, null);
    sortAxis(stage.axes.x, 0);
    sortAxis(stage.axes.y, 1);
    sortAxis(stage.axes.z, 1);
}
function sortAxis(axes, dim) {
    axes.forEach(axis => {
        if (axis.domain)
            orderDomain(axis.domain, dim);
        axis.ticks.sort((a, b) => a.sourcePosition[dim] - b.sourcePosition[dim]);
        axis.tickText.sort((a, b) => a.position[dim] - b.position[dim]);
    });
}
function orderDomain(domain, dim) {
    if (domain.sourcePosition[dim] > domain.targetPosition[dim]) {
        const temp = domain.targetPosition;
        domain.targetPosition = domain.sourcePosition;
        domain.sourcePosition = temp;
    }
}
