"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionManager = void 0;
const Utils_1 = require("../Utils");
const Enums_1 = require("../Enums");
class InteractionManager {
    constructor(container) {
        this.container = container;
        this.externalInteractors = [];
        this.particleInteractors = [];
        this.init();
    }
    init() {
        const interactors = Utils_1.Plugins.getInteractors(this.container, true);
        for (const interactor of interactors) {
            switch (interactor.type) {
                case Enums_1.InteractorType.External:
                    this.externalInteractors.push(interactor);
                    break;
                case Enums_1.InteractorType.Particles:
                    this.particleInteractors.push(interactor);
                    break;
            }
        }
    }
    externalInteract(delta) {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.interact(delta);
            }
        }
    }
    particlesInteract(particle, delta) {
        for (const interactor of this.externalInteractors) {
            interactor.reset(particle);
        }
        for (const interactor of this.particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.interact(particle, delta);
            }
        }
    }
}
exports.InteractionManager = InteractionManager;
