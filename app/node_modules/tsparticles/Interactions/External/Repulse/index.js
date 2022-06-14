"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExternalRepulseInteraction = void 0;
const Repulser_1 = require("./Repulser");
async function loadExternalRepulseInteraction(tsParticles) {
    await tsParticles.addInteractor("externalRepulse", (container) => new Repulser_1.Repulser(container));
}
exports.loadExternalRepulseInteraction = loadExternalRepulseInteraction;
