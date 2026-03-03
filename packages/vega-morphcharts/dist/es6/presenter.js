/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { deepMerge } from './clone';
import { createStage, defaultOnAxisItem, defaultPresenterConfig, defaultPresenterStyle } from './defaults';
import { PresenterElement } from './enums';
import { LegendView } from './legend';
import { className, initializePanel } from './panel';
import { patchCubeArray } from './patchedCubeArray';
import { sceneToStage } from './stagers';
import { getActiveElementInfo, mount, setActiveElement } from 'tsx-create-element';
import { colorConfig, init, morphChartsRender } from './morphcharts';
/**
 * Class which presents a Stage of chart data using MorphCharts to render.
 */
export class Presenter {
    /**
     * Get the previously rendered Stage object.
     */
    get stage() {
        return this._last.stage;
    }
    /**
     * Get the current View camera type.
     */
    get view() {
        return this._last.view;
    }
    /**
     * Instantiate a new Presenter.
     * @param el Parent HTMLElement to present within.
     * @param style Optional PresenterStyle styling options.
     */
    constructor(el, style) {
        this.el = el;
        this.style = deepMerge(defaultPresenterStyle, style);
        initializePanel(this);
        this._last = { view: null, height: null, width: null, cubeCount: null, stage: null };
    }
    /**
     * Cancels any pending animation, calling animationCanceled() on original queue.
     */
    animationCancel() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
            if (this.logger) {
                this.logger(`canceling animation ${(this.queuedAnimationOptions && this.queuedAnimationOptions.handlerLabel) || 'handler'}`);
            }
            if (this.queuedAnimationOptions && this.queuedAnimationOptions.animationCanceled) {
                this.queuedAnimationOptions.animationCanceled.call(null);
            }
        }
    }
    /**
     * Stops the current animation and queues a new animation.
     * @param handler Function to invoke when timeout is complete.
     * @param timeout Length of time to wait before invoking the handler.
     * @param options Optional QueuedAnimationOptions object.
     */
    animationQueue(handler, timeout, options) {
        if (this.logger) {
            this.logger(`queueing animation ${(options && options.waitingLabel) || 'waiting'}...(${timeout})`);
        }
        this.animationCancel();
        this.animationTimer = setTimeout(() => {
            if (this.logger) {
                this.logger(`queueing animation ${(options && options.handlerLabel) || 'handler'}...`);
            }
            handler();
        }, timeout);
    }
    /**
     * Retrieve a sub-element of the rendered output.
     * @param type PresenterElement type of the HTMLElement to retrieve.
     */
    getElement(type) {
        const elements = this.el.getElementsByClassName(className(type, this));
        if (elements && elements.length) {
            return elements[0];
        }
    }
    /**
     * Present the Vega Scene, or Stage object using Morphcharts.
     * @param sceneOrStage Vega Scene object, or Stage object containing chart layout info.
     * @param height Height of the rendering area.
     * @param width Width of the rendering area.
     * @param config Optional presentation configuration object.
     */
    present(sceneOrStage, height, width, config) {
        this.animationCancel();
        const scene = sceneOrStage;
        let stage;
        const options = {
            maxOrdinal: 0,
            currAxis: null,
            defaultCubeColor: this.style.defaultCubeColor,
            assignCubeOrdinal: (config && config.onSceneRectAssignCubeOrdinal) || (() => options.maxOrdinal++),
            modifyAxis: (config === null || config === void 0 ? void 0 : config.onAxisItem) ? config.onAxisItem : defaultOnAxisItem,
            zAxisZindex: config === null || config === void 0 ? void 0 : config.zAxisZindex,
        };
        //determine if this is a vega scene
        if (scene.marktype) {
            stage = createStage(scene.view);
            sceneToStage(options, stage, scene);
        }
        else {
            stage = sceneOrStage;
        }
        const c = deepMerge(defaultPresenterConfig, config);
        if (!this.morphchartsref) {
            this._morphChartsOptions = {
                container: this.getElement(PresenterElement.gl),
                pickGridCallback: c.axisPickGridCallback,
                onCubeHover: (e, ordinal) => {
                    c.onCubeHover(e, { ordinal, color: null, position: null, size: null });
                },
                onCubeClick: (e, ordinal) => {
                    c.onCubeClick(e, { ordinal, color: null, position: null, size: null });
                },
                onCanvasClick: config === null || config === void 0 ? void 0 : config.onLayerClick,
                onLasso: config === null || config === void 0 ? void 0 : config.onLasso,
            };
            this.morphchartsref = init(this._morphChartsOptions, c.renderer || defaultPresenterConfig.renderer);
        }
        let cubeCount = Math.max(this._last.cubeCount, stage.cubeData.length);
        if (options.maxOrdinal) {
            cubeCount = Math.max(cubeCount, options.maxOrdinal);
            const empty = {
                isEmpty: true,
            };
            stage.cubeData = patchCubeArray(cubeCount, empty, stage.cubeData);
        }
        config.preLayer && config.preLayer(stage);
        this.morphChartsRenderResult = morphChartsRender(this.morphchartsref, this._last.stage, stage, height, width, config && config.preStage, config && config.morphChartsColors, c);
        delete stage.cubeData;
        delete stage.redraw;
        this._last = {
            cubeCount,
            height,
            width,
            stage,
            view: stage.view,
        };
        const a = getActiveElementInfo();
        mount(LegendView({ legend: stage.legend, onClick: config && config.onLegendClick }), this.getElement(PresenterElement.legend));
        setActiveElement(a);
        if (config && config.onPresent) {
            config.onPresent();
        }
    }
    canvasToDataURL() {
        return new Promise((resolve, reject) => {
            this.morphchartsref.core.afterRenderCallback = () => {
                this.morphchartsref.core.afterRenderCallback = null;
                const canvas = this.getElement(PresenterElement.gl).getElementsByTagName('canvas')[0];
                const png = canvas.toDataURL('image/png');
                resolve(png);
            };
        });
    }
    configColors(mcColors) {
        colorConfig(this.morphchartsref, mcColors);
    }
    /**
     * Home the camera to the last initial position.
     */
    homeCamera() {
        var _a;
        (_a = this.morphchartsref) === null || _a === void 0 ? void 0 : _a.reset();
    }
    /**
     * Show guidelines of rendering height/width and center of OrbitView.
     */
    showGuides() {
        this.getElement(PresenterElement.gl).classList.add('show-center');
        //TODO Morphcharts gridlines
    }
    finalize() {
        this.animationCancel();
        if (this.morphchartsref)
            this.morphchartsref.core.stop();
        if (this.el)
            this.el.innerHTML = '';
        this._last = null;
        this.morphchartsref = null;
        this.el = null;
        this.logger = null;
        this.queuedAnimationOptions = null;
    }
}
