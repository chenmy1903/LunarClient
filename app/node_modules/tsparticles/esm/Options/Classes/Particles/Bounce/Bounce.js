import { BounceFactor } from "./BounceFactor";
export class Bounce {
    constructor() {
        this.horizontal = new BounceFactor();
        this.vertical = new BounceFactor();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}
