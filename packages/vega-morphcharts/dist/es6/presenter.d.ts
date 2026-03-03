/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { PresenterElement } from './enums';
import { PresenterConfig, PresenterStyle, QueuedAnimationOptions, Scene3d, Stage, MorphChartsRenderResult, MorphChartsColors, MorphChartsRef } from './interfaces';
import { View } from '@msrvida/chart-types';
/**
 * Class which presents a Stage of chart data using MorphCharts to render.
 */
export declare class Presenter {
    el: HTMLElement;
    /**
     * Handle of the timer for animation.
     */
    animationTimer: number;
    /**
     * MorphCharts instance for rendering WebGL.
     */
    morphchartsref: MorphChartsRef;
    /**
     * Handle to recent MorphCharts rendering result.
     */
    morphChartsRenderResult: MorphChartsRenderResult;
    /**
     * Logger, such as console.log
     */
    logger: (message?: any, ...optionalParams: any[]) => void;
    /**
     * Get the previously rendered Stage object.
     */
    get stage(): Stage;
    /**
     * Options for styling the output.
     */
    style: PresenterStyle;
    /**
     * Get the current View camera type.
     */
    get view(): View;
    private queuedAnimationOptions;
    private _morphChartsOptions;
    private _last;
    /**
     * Instantiate a new Presenter.
     * @param el Parent HTMLElement to present within.
     * @param style Optional PresenterStyle styling options.
     */
    constructor(el: HTMLElement, style?: PresenterStyle);
    /**
     * Cancels any pending animation, calling animationCanceled() on original queue.
     */
    animationCancel(): void;
    /**
     * Stops the current animation and queues a new animation.
     * @param handler Function to invoke when timeout is complete.
     * @param timeout Length of time to wait before invoking the handler.
     * @param options Optional QueuedAnimationOptions object.
     */
    animationQueue(handler: () => void, timeout: number, options?: QueuedAnimationOptions): void;
    /**
     * Retrieve a sub-element of the rendered output.
     * @param type PresenterElement type of the HTMLElement to retrieve.
     */
    getElement(type: PresenterElement): HTMLElement;
    /**
     * Present the Vega Scene, or Stage object using Morphcharts.
     * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
     * @param height Height of the rendering area.
     * @param width Width of the rendering area.
     * @param config Optional presentation configuration object.
     */
    present(sceneOrStage: Scene3d | Stage, height: number, width: number, config?: PresenterConfig): void;
    canvasToDataURL(): Promise<string>;
    configColors(mcColors: MorphChartsColors): void;
    /**
     * Home the camera to the last initial position.
     */
    homeCamera(): void;
    /**
     * Show guidelines of rendering height/width and center of OrbitView.
     */
    showGuides(): void;
    finalize(): void;
}
