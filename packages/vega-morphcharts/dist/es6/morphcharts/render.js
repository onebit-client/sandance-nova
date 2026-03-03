/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { createAxesLayer } from './axes';
import { outerBounds } from './bounds';
import { createCubeLayer } from './cubes';
import { createLineLayer } from './lines';
import { createTextLayer } from './text';
import { createImageQuad, getImageData } from './image';
import { minZ } from '../defaults';
import { colorConfig } from './color';
import { cameraDefaults } from './defaults';
import { applyCameraCallbacks, setTransitionTimeAxesVisibility } from './camera';
export function morphChartsRender(ref, prevStage, stage, height, width, preStage, colors, config) {
    const { qCameraRotation2d, qCameraRotation3d, qModelRotation2d, qModelRotation3d, vCameraPosition } = cameraDefaults;
    const { core, cameraTransitioner, modelTransitioner, positionTransitioner } = ref;
    let transistion2dOnly = false;
    let cameraTo;
    let holdCamera;
    if (config.camera === 'hold') {
        holdCamera = true;
    }
    else {
        cameraTo = config.camera;
    }
    if (prevStage && (prevStage.view !== stage.view)) {
        modelTransitioner.shouldTransition = !holdCamera;
        if (stage.view === '2d') {
            modelTransitioner.qRotation.from = qModelRotation3d;
            modelTransitioner.qRotation.to = qModelRotation2d;
            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation2d;
            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
        }
        else {
            modelTransitioner.qRotation.from = qModelRotation2d;
            modelTransitioner.qRotation.to = qModelRotation3d;
            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation3d;
            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
        }
    }
    else {
        modelTransitioner.shouldTransition = false;
        if (stage.view === '2d') {
            transistion2dOnly = true;
            modelTransitioner.qRotation.to = qModelRotation2d;
            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation2d;
            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
        }
        else {
            modelTransitioner.qRotation.to = qModelRotation3d;
            cameraTransitioner.qRotation.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.rotation) || qCameraRotation3d;
            cameraTransitioner.vPosition.to = (cameraTo === null || cameraTo === void 0 ? void 0 : cameraTo.position) || vCameraPosition;
        }
    }
    core.camera.getOrbit(cameraTransitioner.qRotation.from);
    core.camera.getPosition(cameraTransitioner.vPosition.from);
    if (!prevStage) {
        core.setModelRotation(modelTransitioner.qRotation.to, false);
        core.camera.setOrbit(cameraTransitioner.qRotation.to, false);
        core.camera.setPosition(cameraTransitioner.vPosition.to, false);
    }
    else if (!holdCamera) {
        cameraTransitioner.begin();
    }
    positionTransitioner.begin();
    if (modelTransitioner.shouldTransition) {
        modelTransitioner.begin();
    }
    const props = { ref, stage, height, width, config };
    const cubeLayer = createCubeLayer(props);
    const lineLayer = createLineLayer(props);
    const textLayer = createTextLayer(props);
    const { backgroundImages } = stage;
    let contentBounds = outerBounds(outerBounds(cubeLayer === null || cubeLayer === void 0 ? void 0 : cubeLayer.bounds, lineLayer === null || lineLayer === void 0 ? void 0 : lineLayer.bounds), outerBounds(textLayer === null || textLayer === void 0 ? void 0 : textLayer.bounds, null));
    backgroundImages === null || backgroundImages === void 0 ? void 0 : backgroundImages.forEach(backgroundImage => {
        contentBounds = outerBounds(contentBounds, convertBounds(backgroundImage.bounds));
    });
    props.bounds = contentBounds;
    core.renderer.previousAxes = core.renderer.currentAxes;
    const axesLayer = createAxesLayer(props);
    core.config.transitionStaggering = config.transitionDurations.stagger;
    core.config.transitionDuration = config.transitionDurations.position;
    let bounds;
    if (axesLayer && axesLayer.bounds) {
        bounds = axesLayer.bounds;
    }
    else {
        bounds = contentBounds;
    }
    ref.setMorphChartsRendererOptions(config.renderer);
    if (preStage) {
        preStage(stage, cubeLayer);
    }
    //add images
    core.renderer.images = [];
    if (backgroundImages) {
        const addImage = (imageBounds, imageData) => {
            const imageWidth = imageBounds.maxBoundsX - imageBounds.minBoundsX;
            const imageHeight = imageBounds.maxBoundsY - imageBounds.minBoundsY;
            const position = [imageBounds.minBoundsX + imageWidth / 2, imageBounds.minBoundsY + imageHeight / 2, 0];
            const imageQuad = createImageQuad(core, imageData, contentBounds, position, imageWidth, imageHeight);
            const imageVisual = core.renderer.createImageVisual(imageQuad);
            core.renderer.images.push(imageVisual);
        };
        const imageDataCache = {};
        backgroundImages.forEach(backgroundImage => {
            const imageBounds = convertBounds(backgroundImage.bounds);
            const imageData = imageDataCache[backgroundImage.url];
            if (imageData) {
                addImage(imageBounds, imageData);
            }
            else {
                getImageData(backgroundImage.url).then(imageData => {
                    imageDataCache[backgroundImage.url] = imageData;
                    addImage(imageBounds, imageData);
                });
            }
        });
    }
    //Now call update on each layout
    layersWithSelection(cubeLayer, lineLayer, textLayer, config.layerSelection, bounds, ref.layerStagger);
    applyCameraCallbacks(ref, config, stage.view, transistion2dOnly);
    core.renderer.transitionTime = 0; // Set renderer transition time for this render pass to prevent rendering target buffer for single frame
    colorConfig(ref, colors);
    return {
        bounds,
        getCubeLayer: () => cubeLayer,
        update: layerSelection => layersWithSelection(cubeLayer, lineLayer, textLayer, layerSelection, bounds, ref.layerStagger),
        activate: id => core.renderer.transitionBuffers[0].activeId = id,
        moveCamera: (camera) => {
            if (!(positionTransitioner.isTransitioning || modelTransitioner.isTransitioning)) {
                core.camera.getOrbit(cameraTransitioner.qRotation.from);
                core.camera.getPosition(cameraTransitioner.vPosition.from);
                cameraTransitioner.move(camera.position, camera.rotation);
            }
        },
        setTransitionTimeAxesVisibility: () => {
            setTransitionTimeAxesVisibility(transistion2dOnly, core);
        },
    };
}
function layersWithSelection(cubeLayer, lineLayer, textLayer, layerSelection, bounds, layerStagger) {
    const layerItems = [
        {
            layer: cubeLayer,
            selection: layerSelection === null || layerSelection === void 0 ? void 0 : layerSelection.cubes,
            stagger: layerStagger === null || layerStagger === void 0 ? void 0 : layerStagger.cubes,
        },
        {
            layer: lineLayer,
            selection: layerSelection === null || layerSelection === void 0 ? void 0 : layerSelection.lines,
            stagger: layerStagger === null || layerStagger === void 0 ? void 0 : layerStagger.lines,
        },
        {
            layer: textLayer,
            selection: layerSelection === null || layerSelection === void 0 ? void 0 : layerSelection.texts,
            stagger: layerStagger === null || layerStagger === void 0 ? void 0 : layerStagger.texts,
        },
    ];
    layerItems.forEach(layerItem => { var _a; return (_a = layerItem.layer) === null || _a === void 0 ? void 0 : _a.update(bounds, layerItem.selection, layerItem.stagger); });
}
function convertBounds(bounds) {
    if (!bounds)
        return;
    return {
        minBoundsX: bounds.x1,
        maxBoundsX: bounds.x2,
        minBoundsY: -bounds.y2,
        maxBoundsY: -bounds.y1,
        minBoundsZ: minZ,
        maxBoundsZ: minZ,
    };
}
