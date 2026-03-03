/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { base } from '../base';
import { Presenter } from '../presenter';
import { PresenterConfig } from '../interfaces';
import { RendererGl_Class } from './rendererGl';
import { Renderers, Runtime, Color, Loader, LoggerInterface, TooltipHandler, LocaleFormatters } from 'vega-typings';
import { View } from '@msrvida/chart-types';
/**
 * ViewOptions from vNext vega-typings https://github.com/vega/vega/pull/2963
 */
export interface ViewOptions {
    background?: Color;
    bind?: Element | string;
    container?: Element | string;
    hover?: boolean;
    loader?: Loader;
    logger?: LoggerInterface;
    logLevel?: number;
    renderer?: Renderers;
    tooltip?: TooltipHandler;
    locale?: LocaleFormatters;
    expr?: any;
}
/**
 * Options for the View.
 */
export interface ViewGlConfig extends ViewOptions {
    presenter?: Presenter;
    presenterConfig?: PresenterConfig;
    getView?: {
        (): View;
    };
}
/**
 * Subclass of Vega.View, with added properties for accessing a Presenter.
 * This is instantiatable by calling `new ViewGl()`. See https://vega.github.io/vega/docs/api/view/
 */
export declare const ViewGl: typeof ViewGl_Class;
/**
 * Subclass of Vega.View, with added properties for accessing a Presenter.
 * This is not instantiatable, it is the TypeScript declaration of the type.
 */
export declare class ViewGl_Class extends base.vega.View {
    presenter: Presenter;
    constructor(runtime: Runtime, config?: ViewGlConfig);
    renderer(renderer: Renderers | 'morphcharts'): this;
    renderer(): Renderers;
    _renderer: RendererGl_Class;
}
