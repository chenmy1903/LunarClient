"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRollUpdater = void 0;
const RollUpdater_1 = require("./RollUpdater");
async function loadRollUpdater(tsParticles) {
    await tsParticles.addParticleUpdater("roll", () => new RollUpdater_1.RollUpdater());
}
exports.loadRollUpdater = loadRollUpdater;
