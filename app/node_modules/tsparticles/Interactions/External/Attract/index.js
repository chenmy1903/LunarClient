"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExternalAttractInteraction = void 0;
const Attractor_1 = require("./Attractor");
async function loadExternalAttractInteraction(tsParticles) {
    await tsParticles.addInteractor("externalAttract", (container) => new Attractor_1.Attractor(container));
}
exports.loadExternalAttractInteraction = loadExternalAttractInteraction;
