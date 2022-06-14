"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tilt = void 0;
const TiltAnimation_1 = require("./TiltAnimation");
const Enums_1 = require("../../../../Enums");
const ValueWithRandom_1 = require("../../ValueWithRandom");
class Tilt extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.animation = new TiltAnimation_1.TiltAnimation();
        this.direction = Enums_1.TiltDirection.clockwise;
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        this.animation.load(data.animation);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
exports.Tilt = Tilt;
