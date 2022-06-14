"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWobbleUpdater = void 0;
const WobbleUpdater_1 = require("./WobbleUpdater");
async function loadWobbleUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("wobble", (container) => new WobbleUpdater_1.WobbleUpdater(container));
}
exports.loadWobbleUpdater = loadWobbleUpdater;
