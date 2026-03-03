/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { quat, vec3 } from 'gl-matrix';
import { easing } from './easing';
export class Transitioner {
    constructor() {
        this.isTransitioning = false;
    }
    begin() {
        this.isTransitioning = true;
        this.time = 0;
    }
    elapse(elapsedTime, totalTime, ease = false) {
        this.time += elapsedTime;
        if (this.time >= totalTime) {
            this.isTransitioning = false;
            this.time = totalTime;
            this.ended && this.ended();
        }
        const t = this.time / totalTime;
        return ease ? easing(t) : t;
    }
}
export class CameraTransitioner extends Transitioner {
    constructor() {
        super();
        this.qRotation = {
            from: quat.create(),
            to: null,
            current: quat.create(),
        };
        this.vPosition = {
            from: vec3.create(),
            to: null,
            current: vec3.create(),
        };
    }
    move(position, rotation) {
        this.begin();
        this.qRotation.to = rotation;
        this.vPosition.to = position;
    }
}
export class ModelTransitioner extends Transitioner {
    constructor() {
        super();
        this.shouldTransition = false;
        this.qRotation = {
            from: null,
            to: null,
            current: quat.create(),
        };
    }
}
