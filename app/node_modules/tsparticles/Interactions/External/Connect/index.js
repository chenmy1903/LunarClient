"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExternalConnectInteraction = void 0;
const Connector_1 = require("./Connector");
async function loadExternalConnectInteraction(tsParticles) {
    await tsParticles.addInteractor("externalConnect", (container) => new Connector_1.Connector(container));
}
exports.loadExternalConnectInteraction = loadExternalConnectInteraction;
