"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesInteractorBase = void 0;
const Enums_1 = require("../Enums");
class ParticlesInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = Enums_1.InteractorType.Particles;
    }
}
exports.ParticlesInteractorBase = ParticlesInteractorBase;
