import { GradientType, RotateDirection, StartValueType } from "../../Enums";
import { AnimatableColor } from "./AnimatableColor";
import { setRangeValue } from "../../Utils";
export class AnimatableGradient {
    constructor() {
        this.angle = new GradientAngle();
        this.colors = [];
        this.type = GradientType.random;
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
export class GradientAngle {
    constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation();
        this.direction = RotateDirection.clockwise;
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
export class GradientColorOpacity {
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
            this.value = setRangeValue(data.value);
        }
    }
}
export class AnimatableGradientColor {
    constructor() {
        this.stop = 0;
        this.value = new AnimatableColor();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.stop !== undefined) {
            this.stop = data.stop;
        }
        this.value = AnimatableColor.create(this.value, data.value);
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
export class GradientAngleAnimation {
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
export class GradientColorOpacityAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.sync = false;
        this.startValue = StartValueType.random;
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
