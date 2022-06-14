"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCircleShape = void 0;
const CircleDrawer_1 = require("./CircleDrawer");
async function loadCircleShape(tsParticles) {
    await tsParticles.addShape("circle", new CircleDrawer_1.CircleDrawer());
}
exports.loadCircleShape = loadCircleShape;
