"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceColorSvg = exports.downloadSvgImage = exports.loadImage = void 0;
const Utils_1 = require("../../Utils");
function loadImage(source) {
    return new Promise((resolve, reject) => {
        if (!source) {
            reject("Error tsParticles - No image.src");
            return;
        }
        const image = {
            source: source,
            type: source.substr(source.length - 3),
        };
        const img = new Image();
        img.addEventListener("load", () => {
            image.element = img;
            resolve(image);
        });
        img.addEventListener("error", () => {
            reject(`Error tsParticles - loading image: ${source}`);
        });
        img.src = source;
    });
}
exports.loadImage = loadImage;
async function downloadSvgImage(source) {
    if (!source) {
        throw new Error("Error tsParticles - No image.src");
    }
    const image = {
        source: source,
        type: source.substr(source.length - 3),
    };
    if (image.type !== "svg") {
        return loadImage(source);
    }
    const response = await fetch(image.source);
    if (!response.ok) {
        throw new Error("Error tsParticles - Image not found");
    }
    image.svgData = await response.text();
    return image;
}
exports.downloadSvgImage = downloadSvgImage;
function replaceColorSvg(imageShape, color, opacity) {
    const { svgData } = imageShape;
    if (!svgData) {
        return "";
    }
    if (svgData.includes("fill")) {
        const currentColor = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
        return svgData.replace(currentColor, () => (0, Utils_1.getStyleFromHsl)(color, opacity));
    }
    const preFillIndex = svgData.indexOf(">");
    return `${svgData.substring(0, preFillIndex)} fill="${(0, Utils_1.getStyleFromHsl)(color, opacity)}"${svgData.substring(preFillIndex)}`;
}
exports.replaceColorSvg = replaceColorSvg;
