"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientColorOpacityAnimation = exports.GradientAngleAnimation = exports.AnimatableGradientColor = exports.GradientColorOpacity = exports.GradientAngle = exports.AnimatableGradient = void 0;
const Enums_1 = require("../../Enums");
const AnimatableColor_1 = require("./AnimatableColor");
const Utils_1 = require("../../Utils");
class AnimatableGradient {
    constructor() {
        this.angle = new GradientAngle();
        this.colors = [];
        this.type = Enums_1.GradientType.random;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.angle.load(data.angle);
        if (data.colors !== undefined) {
            this.colors = data.colors.map((s) => {
                const tmp = new AnimatableGradientColor();
                tmp.load(s);
                return tmp;
            });
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
exports.AnimatableGradient = AnimatableGradient;
class GradientAngle {
    constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation();
        this.direction = Enums_1.RotateDirection.clockwise;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        if (data.value !== undefined) {
            this.value = data.value;
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
    }
}
exports.GradientAngle = GradientAngle;
class GradientColorOpacity {
    constructor() {
        this.value = 0;
        this.animation = new GradientColorOpacityAnimation();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        if (data.value !== undefined) {
            this.value = (0, Utils_1.setRangeValue)(data.value);
        }
    }
}
exports.GradientColorOpacity = GradientColorOpacity;
class AnimatableGradientColor {
    constructor() {
        this.stop = 0;
        this.value = new AnimatableColor_1.AnimatableColor();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.stop !== undefined) {
            this.stop = data.stop;
        }
        this.value = AnimatableColor_1.AnimatableColor.create(this.value, data.value);
        if (data.opacity !== undefined) {
            this.opacity = new GradientColorOpacity();
            if (typeof data.opacity === "number") {
                this.opacity.value = data.opacity;
            }
            else {
                this.opacity.load(data.opacity);
            }
        }
    }
}
exports.AnimatableGradientColor = AnimatableGradientColor;
class GradientAngleAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.GradientAngleAnimation = GradientAngleAnimation;
class GradientColorOpacityAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.sync = false;
        this.startValue = Enums_1.StartValueType.random;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
exports.GradientColorOpacityAnimation = GradientColorOpacityAnimation;
