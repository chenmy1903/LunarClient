"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadColorUpdater = void 0;
const ColorUpdater_1 = require("./ColorUpdater");
async function loadColorUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("color", (container) => new ColorUpdater_1.ColorUpdater(container));
}
exports.loadColorUpdater = loadColorUpdater;
