"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFull = void 0;
const slim_1 = require("./slim");
const Trail_1 = require("./Interactions/External/Trail");
const Tilt_1 = require("./Updaters/Tilt");
const Wobble_1 = require("./Updaters/Wobble");
const plugin_1 = require("./Plugins/Absorbers/plugin");
const plugin_2 = require("./Plugins/Emitters/plugin");
const plugin_3 = require("./Plugins/PolygonMask/plugin");
const Roll_1 = require("./Updaters/Roll");
async function loadFull(tsParticles) {
    await (0, slim_1.loadSlim)(tsParticles);
    await (0, Trail_1.loadExternalTrailInteraction)(tsParticles);
    await (0, Roll_1.loadRollUpdater)(tsParticles);
    await (0, Tilt_1.loadTiltUpdater)(tsParticles);
    await (0, Wobble_1.loadWobbleUpdater)(tsParticles);
    await (0, plugin_1.loadAbsorbersPlugin)(tsParticles);
    await (0, plugin_2.loadEmittersPlugin)(tsParticles);
    await (0, plugin_3.loadPolygonMaskPlugin)(tsParticles);
}
exports.loadFull = loadFull;
