"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
const SizeAnimation_1 = require("./SizeAnimation");
const ValueWithRandom_1 = require("../../ValueWithRandom");
const Utils_1 = require("../../../../Utils");
class Size extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.animation = new SizeAnimation_1.SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = (0, Utils_1.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}
exports.Size = Size;
