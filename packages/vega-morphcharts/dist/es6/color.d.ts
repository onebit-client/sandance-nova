/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { RGBAColor } from './interfaces';
/**
 * Compares 2 colors to see if they are equal.
 * @param a RGBAColor to compare
 * @param b RGBAColor to compare
 * @returns True if colors are equal.
 */
export declare function colorIsEqual(a: RGBAColor, b: RGBAColor): boolean;
/**
 * Convert a CSS color string to a Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.).
 * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
 */
export declare function colorFromString(cssColorSpecifier: string): RGBAColor;
/**
 * Convert a Deck.gl color to a CSS rgba() string.
 * @param color A Deck.gl RGBAColor array - (The rgba color of each object, in r, g, b, [a]. Each component is in the 0-255 range.)
 */
export declare function colorToString(color: RGBAColor): string;
export declare function desaturate(color: RGBAColor, value: number): RGBAColor;
