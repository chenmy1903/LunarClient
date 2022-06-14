"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImageShape = void 0;
const ImageDrawer_1 = require("./ImageDrawer");
async function loadImageShape(tsParticles) {
    const imageDrawer = new ImageDrawer_1.ImageDrawer();
    await tsParticles.addShape("image", imageDrawer);
    await tsParticles.addShape("images", imageDrawer);
}
exports.loadImageShape = loadImageShape;
