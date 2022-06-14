"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParticlesCollisionsInteraction = void 0;
const Collider_1 = require("./Collider");
async function loadParticlesCollisionsInteraction(tsParticles) {
    await tsParticles.addInteractor("particlesCollisions", (container) => new Collider_1.Collider(container));
}
exports.loadParticlesCollisionsInteraction = loadParticlesCollisionsInteraction;
