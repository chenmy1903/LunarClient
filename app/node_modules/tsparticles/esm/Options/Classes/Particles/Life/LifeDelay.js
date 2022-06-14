import { ValueWithRandom } from "../../ValueWithRandom";
export class LifeDelay extends ValueWithRandom {
    constructor() {
        super();
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
