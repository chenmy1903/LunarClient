import { Density } from "./Density";
/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export class ParticlesNumber {
    constructor() {
        this.density = new Density();
        this.limit = 0;
        this.value = 100;
    }
    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    get max() {
        return this.limit;
    }
    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    set max(value) {
        this.limit = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        this.density.load(data.density);
        const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
        if (limit !== undefined) {
            this.limit = limit;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
