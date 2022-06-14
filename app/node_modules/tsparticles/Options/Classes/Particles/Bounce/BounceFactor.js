"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BounceFactor = void 0;
const ValueWithRandom_1 = require("../../ValueWithRandom");
class BounceFactor extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
}
exports.BounceFactor = BounceFactor;
