"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParticlesLinksInteraction = exports.loadInteraction = void 0;
const Linker_1 = require("./Linker");
const plugin_1 = require("./plugin");
async function loadInteraction(tsParticles) {
    await tsParticles.addInteractor("particlesLinks", (container) => new Linker_1.Linker(container));
}
exports.loadInteraction = loadInteraction;
async function loadParticlesLinksInteraction(tsParticles) {
    await loadInteraction(tsParticles);
    await (0, plugin_1.loadPlugin)(tsParticles);
}
exports.loadParticlesLinksInteraction = loadParticlesLinksInteraction;
