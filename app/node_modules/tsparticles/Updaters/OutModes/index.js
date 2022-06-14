"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOutModesUpdater = void 0;
const OutOfCanvasUpdater_1 = require("./OutOfCanvasUpdater");
async function loadOutModesUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater_1.OutOfCanvasUpdater(container));
}
exports.loadOutModesUpdater = loadOutModesUpdater;
