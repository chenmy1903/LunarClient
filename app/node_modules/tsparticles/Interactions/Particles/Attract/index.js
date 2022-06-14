"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParticlesAttractInteraction = void 0;
const Attractor_1 = require("./Attractor");
async function loadParticlesAttractInteraction(tsParticles) {
    await tsParticles.addInteractor("particlesAttract", (container) => new Attractor_1.Attractor(container));
}
exports.loadParticlesAttractInteraction = loadParticlesAttractInteraction;
