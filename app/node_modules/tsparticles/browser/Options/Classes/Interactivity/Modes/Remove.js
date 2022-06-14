/**
 * @category Options
 */
export class Remove {
    constructor() {
        this.quantity = 2;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    get particles_nb() {
        return this.quantity;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    set particles_nb(value) {
        this.quantity = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
