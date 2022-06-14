import { InteractorType } from "../Enums";
export class ParticlesInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = InteractorType.Particles;
    }
}
