"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTextShape = void 0;
const TextDrawer_1 = require("./TextDrawer");
async function loadTextShape(tsParticles) {
    const drawer = new TextDrawer_1.TextDrawer();
    for (const type of TextDrawer_1.validTypes) {
        await tsParticles.addShape(type, drawer);
    }
}
exports.loadTextShape = loadTextShape;
