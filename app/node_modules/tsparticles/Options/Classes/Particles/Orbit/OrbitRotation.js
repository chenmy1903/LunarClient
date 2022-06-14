"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitRotation = void 0;
const ValueWithRandom_1 = require("../../ValueWithRandom");
class OrbitRotation extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.value = 45;
        this.random.enable = false;
        this.random.minimumValue = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        super.load(data);
    }
}
exports.OrbitRotation = OrbitRotation;
