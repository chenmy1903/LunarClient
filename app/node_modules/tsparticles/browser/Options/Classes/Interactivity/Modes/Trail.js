import { deepExtend } from "../../../../Utils";
/**
 * @category Options
 */
export class Trail {
    constructor() {
        this.delay = 1;
        this.pauseOnStop = false;
        this.quantity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }
        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles);
        }
        if (data.pauseOnStop !== undefined) {
            this.pauseOnStop = data.pauseOnStop;
        }
    }
}
