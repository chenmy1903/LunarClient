/**
 * @category Options
 */
export class Slow {
    constructor() {
        this.factor = 3;
        this.radius = 200;
    }
    /**
     * @deprecated this property will be removed soon, please use the HoverMode.slow in the HoverEvent
     */
    get active() {
        return false;
    }
    /**
     * @deprecated this property will be removed soon, please use the HoverMode.slow in the HoverEvent
     */
    set active(_value) {
        // deprecated
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
