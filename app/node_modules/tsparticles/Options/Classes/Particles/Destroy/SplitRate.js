"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitRate = void 0;
const ValueWithRandom_1 = require("../../ValueWithRandom");
class SplitRate extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.value = { min: 4, max: 9 };
    }
}
exports.SplitRate = SplitRate;
