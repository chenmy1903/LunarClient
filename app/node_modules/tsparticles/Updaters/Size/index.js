"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSizeUpdater = void 0;
const SizeUpdater_1 = require("./SizeUpdater");
async function loadSizeUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("size", () => new SizeUpdater_1.SizeUpdater());
}
exports.loadSizeUpdater = loadSizeUpdater;
