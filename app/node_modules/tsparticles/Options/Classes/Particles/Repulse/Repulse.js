"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repulse = void 0;
const ValueWithRandom_1 = require("../../ValueWithRandom");
class Repulse extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.enabled = false;
        this.distance = 1;
        this.duration = 1;
        this.factor = 1;
        this.speed = 1;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
exports.Repulse = Repulse;
