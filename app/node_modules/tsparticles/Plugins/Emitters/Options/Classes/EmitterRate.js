"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterRate = void 0;
const Utils_1 = require("../../../../Utils");
class EmitterRate {
    constructor() {
        this.quantity = 1;
        this.delay = 0.1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.quantity !== undefined) {
            this.quantity = (0, Utils_1.setRangeValue)(data.quantity);
        }
        if (data.delay !== undefined) {
            this.delay = (0, Utils_1.setRangeValue)(data.delay);
        }
    }
}
exports.EmitterRate = EmitterRate;
