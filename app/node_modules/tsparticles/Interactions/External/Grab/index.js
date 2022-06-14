"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExternalGrabInteraction = void 0;
const Grabber_1 = require("./Grabber");
async function loadExternalGrabInteraction(tsParticles) {
    await tsParticles.addInteractor("externalGrab", (container) => new Grabber_1.Grabber(container));
}
exports.loadExternalGrabInteraction = loadExternalGrabInteraction;
