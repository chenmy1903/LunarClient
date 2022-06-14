"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeAnimation = void 0;
const Enums_1 = require("../../../../Enums");
const AnimationOptions_1 = require("../../AnimationOptions");
class SizeAnimation extends AnimationOptions_1.AnimationOptions {
    constructor() {
        super();
        this.destroy = Enums_1.DestroyType.none;
        this.enable = false;
        this.speed = 5;
        this.startValue = Enums_1.StartValueType.random;
        this.sync = false;
    }
    get size_min() {
        return this.minimumValue;
    }
    set size_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        super.load(data);
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.SizeAnimation = SizeAnimation;
