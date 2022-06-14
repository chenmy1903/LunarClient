"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSquareShape = void 0;
const SquareDrawer_1 = require("./SquareDrawer");
async function loadSquareShape(tsParticles) {
    const drawer = new SquareDrawer_1.SquareDrawer();
    await tsParticles.addShape("edge", drawer);
    await tsParticles.addShape("square", drawer);
}
exports.loadSquareShape = loadSquareShape;
