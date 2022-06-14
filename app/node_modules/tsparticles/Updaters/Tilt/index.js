"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTiltUpdater = void 0;
const TiltUpdater_1 = require("./TiltUpdater");
async function loadTiltUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("tilt", (container) => new TiltUpdater_1.TiltUpdater(container));
}
exports.loadTiltUpdater = loadTiltUpdater;
