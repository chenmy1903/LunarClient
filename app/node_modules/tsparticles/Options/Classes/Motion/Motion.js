"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motion = void 0;
const MotionReduce_1 = require("./MotionReduce");
class Motion {
    constructor() {
        this.disable = false;
        this.reduce = new MotionReduce_1.MotionReduce();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.disable !== undefined) {
            this.disable = data.disable;
        }
        this.reduce.load(data.reduce);
    }
}
exports.Motion = Motion;
