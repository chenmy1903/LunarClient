"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLineShape = void 0;
const LineDrawer_1 = require("./LineDrawer");
async function loadLineShape(tsParticles) {
    await tsParticles.addShape("line", new LineDrawer_1.LineDrawer());
}
exports.loadLineShape = loadLineShape;
