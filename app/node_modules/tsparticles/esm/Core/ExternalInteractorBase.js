import { InteractorType } from "../Enums";
export class ExternalInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = InteractorType.External;
    }
}
