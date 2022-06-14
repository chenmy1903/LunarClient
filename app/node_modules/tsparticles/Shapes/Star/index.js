"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStarShape = void 0;
const StarDrawer_1 = require("./StarDrawer");
async function loadStarShape(tsParticles) {
    await tsParticles.addShape("star", new StarDrawer_1.StarDrawer());
}
exports.loadStarShape = loadStarShape;
