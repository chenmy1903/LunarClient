/**
 * @category Options
 */
export class Density {
    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1000;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     */
    get value_area() {
        return this.area;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     * @param value
     */
    set value_area(value) {
        this.area = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;
        if (area !== undefined) {
            this.area = area;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
    }
}
