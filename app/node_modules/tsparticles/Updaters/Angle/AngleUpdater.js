"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngleUpdater = void 0;
const Enums_1 = require("../../Enums");
const Utils_1 = require("../../Utils");
function updateAngle(particle, delta) {
    var _a;
    const rotate = particle.rotate;
    if (!rotate) {
        return;
    }
    const rotateOptions = particle.options.rotate;
    const rotateAnimation = rotateOptions.animation;
    const speed = ((_a = rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const max = 2 * Math.PI;
    if (!rotateAnimation.enable) {
        return;
    }
    switch (rotate.status) {
        case Enums_1.AnimationStatus.increasing:
            rotate.value += speed;
            if (rotate.value > max) {
                rotate.value -= max;
            }
            break;
        case Enums_1.AnimationStatus.decreasing:
        default:
            rotate.value -= speed;
            if (rotate.value < 0) {
                rotate.value += max;
            }
            break;
    }
}
class AngleUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const rotateOptions = particle.options.rotate;
        particle.rotate = {
            enable: rotateOptions.animation.enable,
            value: ((0, Utils_1.getRangeValue)(rotateOptions.value) * Math.PI) / 180,
        };
        let rotateDirection = rotateOptions.direction;
        if (rotateDirection === Enums_1.RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);
            rotateDirection = index > 0 ? Enums_1.RotateDirection.counterClockwise : Enums_1.RotateDirection.clockwise;
        }
        switch (rotateDirection) {
            case Enums_1.RotateDirection.counterClockwise:
            case "counterClockwise":
                particle.rotate.status = Enums_1.AnimationStatus.decreasing;
                break;
            case Enums_1.RotateDirection.clockwise:
                particle.rotate.status = Enums_1.AnimationStatus.increasing;
                break;
        }
        const rotateAnimation = particle.options.rotate.animation;
        if (rotateAnimation.enable) {
            particle.rotate.velocity = (rotateAnimation.speed / 360) * this.container.retina.reduceFactor;
            if (!rotateAnimation.sync) {
                particle.rotate.velocity *= Math.random();
            }
        }
    }
    isEnabled(particle) {
        const rotate = particle.options.rotate;
        const rotateAnimation = rotate.animation;
        return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateAngle(particle, delta);
    }
}
exports.AngleUpdater = AngleUpdater;
