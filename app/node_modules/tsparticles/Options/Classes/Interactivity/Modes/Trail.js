"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trail = void 0;
const Utils_1 = require("../../../../Utils");
class Trail {
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
            this.particles = (0, Utils_1.deepExtend)({}, data.particles);
        }
        if (data.pauseOnStop !== undefined) {
            this.pauseOnStop = data.pauseOnStop;
        }
    }
}
exports.Trail = Trail;
