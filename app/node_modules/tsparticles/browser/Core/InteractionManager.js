import { Plugins } from "../Utils";
import { InteractorType } from "../Enums";
/**
 * @category Core
 */
export class InteractionManager {
    constructor(container) {
        this.container = container;
        this.externalInteractors = [];
        this.particleInteractors = [];
        this.init();
    }
    init() {
        const interactors = Plugins.getInteractors(this.container, true);
        for (const interactor of interactors) {
            switch (interactor.type) {
                case InteractorType.External:
                    this.externalInteractors.push(interactor);
                    break;
                case InteractorType.Particles:
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
        /* interaction auto between particles */
        for (const interactor of this.particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.interact(particle, delta);
            }
        }
    }
}
