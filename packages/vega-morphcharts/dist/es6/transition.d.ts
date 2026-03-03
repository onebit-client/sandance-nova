/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { quat, vec3 } from 'gl-matrix';
export declare class Transitioner {
    isTransitioning: boolean;
    time: number;
    ended: () => void;
    constructor();
    begin(): void;
    elapse(elapsedTime: number, totalTime: number, ease?: boolean): number;
}
export interface TransitionSet<T> {
    from: T;
    to: T;
    current: T;
}
export declare class CameraTransitioner extends Transitioner {
    qRotation: TransitionSet<quat>;
    vPosition: TransitionSet<vec3>;
    constructor();
    move(position: vec3, rotation: quat): void;
}
export declare class ModelTransitioner extends Transitioner {
    qRotation: TransitionSet<quat>;
    shouldTransition: boolean;
    constructor();
}
