import { LifeDelay } from "./LifeDelay";
import { LifeDuration } from "./LifeDuration";
export class Life {
    constructor() {
        this.count = 0;
        this.delay = new LifeDelay();
        this.duration = new LifeDuration();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.delay.load(data.delay);
        this.duration.load(data.duration);
    }
}
