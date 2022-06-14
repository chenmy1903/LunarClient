/**
 * @category Options
 */
export class Attract {
    constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     */
    get rotateX() {
        return this.rotate.x;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     * @param value
     */
    set rotateX(value) {
        this.rotate.x = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     */
    get rotateY() {
        return this.rotate.y;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     * @param value
     */
    set rotateY(value) {
        this.rotate.y = value;
    }
    load(data) {
        var _a, _b, _c, _d;
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;
        if (rotateX !== undefined) {
            this.rotate.x = rotateX;
        }
        const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;
        if (rotateY !== undefined) {
            this.rotate.y = rotateY;
        }
    }
}
