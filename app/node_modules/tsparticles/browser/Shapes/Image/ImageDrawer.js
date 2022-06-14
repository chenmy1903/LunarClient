var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ImageDrawer_images;
import { isInArray } from "../../Utils";
import { ShapeType } from "../../Enums";
import { downloadSvgImage, loadImage, replaceColorSvg } from "./Utils";
/**
 * @category Shape Drawers
 */
export class ImageDrawer {
    constructor() {
        _ImageDrawer_images.set(this, void 0);
        __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
    }
    getSidesCount() {
        return 12;
    }
    getImages(container) {
        const containerImages = __classPrivateFieldGet(this, _ImageDrawer_images, "f").find((t) => t.id === container.id);
        if (!containerImages) {
            __classPrivateFieldGet(this, _ImageDrawer_images, "f").push({
                id: container.id,
                images: [],
            });
            return this.getImages(container);
        }
        else {
            return containerImages;
        }
    }
    addImage(container, image) {
        const containerImages = this.getImages(container);
        containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
    }
    async init(container) {
        await this.loadImagesFromParticlesOptions(container, container.actualOptions.particles);
        await this.loadImagesFromParticlesOptions(container, container.actualOptions.interactivity.modes.trail.particles);
        for (const manualParticle of container.actualOptions.manualParticles) {
            await this.loadImagesFromParticlesOptions(container, manualParticle.options);
        }
        const emitterOptions = container.actualOptions;
        if (emitterOptions.emitters) {
            if (emitterOptions.emitters instanceof Array) {
                for (const emitter of emitterOptions.emitters) {
                    await this.loadImagesFromParticlesOptions(container, emitter.particles);
                }
            }
            else {
                await this.loadImagesFromParticlesOptions(container, emitterOptions.emitters.particles);
            }
        }
        const interactiveEmitters = emitterOptions.interactivity.modes.emitters;
        if (interactiveEmitters) {
            if (interactiveEmitters instanceof Array) {
                for (const emitter of interactiveEmitters) {
                    await this.loadImagesFromParticlesOptions(container, emitter.particles);
                }
            }
            else {
                await this.loadImagesFromParticlesOptions(container, interactiveEmitters.particles);
            }
        }
    }
    destroy() {
        __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
    }
    async loadImagesFromParticlesOptions(container, options) {
        var _a, _b, _c;
        const shapeOptions = options === null || options === void 0 ? void 0 : options.shape;
        if (!(shapeOptions === null || shapeOptions === void 0 ? void 0 : shapeOptions.type) ||
            !shapeOptions.options ||
            (!isInArray(ShapeType.image, shapeOptions.type) && !isInArray(ShapeType.images, shapeOptions.type))) {
            return;
        }
        const idx = __classPrivateFieldGet(this, _ImageDrawer_images, "f").findIndex((t) => t.id === container.id);
        if (idx >= 0) {
            __classPrivateFieldGet(this, _ImageDrawer_images, "f").splice(idx, 1);
        }
        const imageOptions = (_a = shapeOptions.options[ShapeType.images]) !== null && _a !== void 0 ? _a : shapeOptions.options[ShapeType.image];
        if (imageOptions instanceof Array) {
            for (const optionsImage of imageOptions) {
                await this.loadImageShape(container, optionsImage);
            }
        }
        else {
            await this.loadImageShape(container, imageOptions);
        }
        if (options === null || options === void 0 ? void 0 : options.groups) {
            for (const groupName in options.groups) {
                const group = options.groups[groupName];
                await this.loadImagesFromParticlesOptions(container, group);
            }
        }
        if ((_c = (_b = options === null || options === void 0 ? void 0 : options.destroy) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.particles) {
            await this.loadImagesFromParticlesOptions(container, options === null || options === void 0 ? void 0 : options.destroy.split.particles);
        }
    }
    async loadImageShape(container, imageShape) {
        try {
            const imageFunc = imageShape.replaceColor ? downloadSvgImage : loadImage;
            const image = await imageFunc(imageShape.src);
            if (image) {
                this.addImage(container, image);
            }
        }
        catch (_a) {
            console.warn(`tsParticles error - ${imageShape.src} not found`);
        }
    }
    draw(context, particle, radius, opacity) {
        var _a, _b;
        if (!context) {
            return;
        }
        const image = particle.image;
        const element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;
        if (!element) {
            return;
        }
        const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1;
        const pos = {
            x: -radius,
            y: -radius,
        };
        if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
            context.globalAlpha = opacity;
        }
        context.drawImage(element, pos.x, pos.y, radius * 2, (radius * 2) / ratio);
        if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
            context.globalAlpha = 1;
        }
    }
    loadShape(particle) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }
        const images = this.getImages(particle.container).images;
        const imageData = particle.shapeData;
        const image = (_a = images.find((t) => t.source === imageData.src)) !== null && _a !== void 0 ? _a : images[0];
        const color = particle.getFillColor();
        let imageRes;
        if (!image) {
            return;
        }
        if (image.svgData !== undefined && imageData.replaceColor && color) {
            const svgColoredData = replaceColorSvg(image, color, (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1);
            /* prepare to create img with colored svg */
            const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
            const domUrl = URL || window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);
            /* create particle img obj */
            const img = new Image();
            imageRes = {
                data: Object.assign(Object.assign({}, image), { svgData: svgColoredData }),
                ratio: imageData.width / imageData.height,
                replaceColor: (_d = imageData.replaceColor) !== null && _d !== void 0 ? _d : imageData.replace_color,
                source: imageData.src,
            };
            img.addEventListener("load", () => {
                const pImage = particle.image;
                if (pImage) {
                    pImage.loaded = true;
                    image.element = img;
                }
                domUrl.revokeObjectURL(url);
            });
            img.addEventListener("error", () => {
                domUrl.revokeObjectURL(url);
                // deepcode ignore PromiseNotCaughtGeneral: catch can be ignored
                loadImage(imageData.src).then((img2) => {
                    const pImage = particle.image;
                    if (pImage) {
                        image.element = img2 === null || img2 === void 0 ? void 0 : img2.element;
                        pImage.loaded = true;
                    }
                });
            });
            img.src = url;
        }
        else {
            imageRes = {
                data: image,
                loaded: true,
                ratio: imageData.width / imageData.height,
                replaceColor: (_e = imageData.replaceColor) !== null && _e !== void 0 ? _e : imageData.replace_color,
                source: imageData.src,
            };
        }
        if (!imageRes.ratio) {
            imageRes.ratio = 1;
        }
        const fill = (_f = imageData.fill) !== null && _f !== void 0 ? _f : particle.fill;
        const close = (_g = imageData.close) !== null && _g !== void 0 ? _g : particle.close;
        const imageShape = {
            image: imageRes,
            fill,
            close,
        };
        particle.image = imageShape.image;
        particle.fill = imageShape.fill;
        particle.close = imageShape.close;
    }
}
_ImageDrawer_images = new WeakMap();
