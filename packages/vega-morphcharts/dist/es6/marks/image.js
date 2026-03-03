/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { base } from '../base';
const markStager = (options, stage, scene, x, y, groupType) => {
    base.vega.sceneVisit(scene, function (item) {
        const { bounds, height, url, width } = item;
        let { x1, x2, y1, y2 } = bounds;
        x1 += x;
        x2 += x;
        y1 += y;
        y2 += y;
        if (!stage.backgroundImages) {
            stage.backgroundImages = [];
        }
        stage.backgroundImages.push({ bounds: { x1, x2, y1, y2 }, height, url, width });
    });
};
export default markStager;
