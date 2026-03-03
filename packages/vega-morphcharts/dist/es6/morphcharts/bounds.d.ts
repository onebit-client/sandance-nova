/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { IBounds } from '../interfaces';
export declare function outerBounds(b1: IBounds, b2: IBounds): IBounds;
export declare function increment(b: IBounds, minBoundsX: number, minBoundsY: number, minBoundsZ: number, maxBoundsX: number, maxBoundsY: number, maxBoundsZ: number): IBounds;
