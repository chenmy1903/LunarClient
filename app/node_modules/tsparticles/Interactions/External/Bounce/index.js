"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExternalBounceInteraction = void 0;
const Bouncer_1 = require("./Bouncer");
async function loadExternalBounceInteraction(tsParticles) {
    await tsParticles.addInteractor("externalBounce", (container) => new Bouncer_1.Bouncer(container));
}
exports.loadExternalBounceInteraction = loadExternalBounceInteraction;
