"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wobble = void 0;
const Utils_1 = require("../../../../Utils");
class Wobble {
    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = 50;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = (0, Utils_1.setRangeValue)(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0, Utils_1.setRangeValue)(data.speed);
        }
    }
}
exports.Wobble = Wobble;
