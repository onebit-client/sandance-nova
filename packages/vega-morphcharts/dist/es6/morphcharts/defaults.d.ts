/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { quat, vec3 } from 'gl-matrix';
export declare const cameraDefaults: {
    qModelRotation2d: quat;
    qModelRotation3d: import("gl-matrix").vec4;
    qCameraRotation2d: quat;
    qCameraRotation3d: quat;
    vCameraPosition: vec3;
};
