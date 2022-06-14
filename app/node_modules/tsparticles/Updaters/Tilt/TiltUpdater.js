"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiltUpdater = void 0;
const Enums_1 = require("../../Enums");
const Utils_1 = require("../../Utils");
function updateTilt(particle, delta) {
    var _a;
    if (!particle.tilt) {
        return;
    }
    const tilt = particle.options.tilt;
    const tiltAnimation = tilt.animation;
    const speed = ((_a = particle.tilt.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const max = 2 * Math.PI;
    if (!tiltAnimation.enable) {
        return;
    }
    switch (particle.tilt.status) {
        case Enums_1.AnimationStatus.increasing:
            particle.tilt.value += speed;
            if (particle.tilt.value > max) {
                particle.tilt.value -= max;
            }
            break;
        case Enums_1.AnimationStatus.decreasing:
        default:
            particle.tilt.value -= speed;
            if (particle.tilt.value < 0) {
                particle.tilt.value += max;
            }
            break;
    }
}
class TiltUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const tiltOptions = particle.options.tilt;
        particle.tilt = {
            enable: tiltOptions.enable,
            value: ((0, Utils_1.getRangeValue)(tiltOptions.value) * Math.PI) / 180,
            sinDirection: Math.random() >= 0.5 ? 1 : -1,
            cosDirection: Math.random() >= 0.5 ? 1 : -1,
        };
        let tiltDirection = tiltOptions.direction;
        if (tiltDirection === Enums_1.TiltDirection.random) {
            const index = Math.floor(Math.random() * 2);
            tiltDirection = index > 0 ? Enums_1.TiltDirection.counterClockwise : Enums_1.TiltDirection.clockwise;
        }
        switch (tiltDirection) {
            case Enums_1.TiltDirection.counterClockwise:
            case "counterClockwise":
                particle.tilt.status = Enums_1.AnimationStatus.decreasing;
                break;
            case Enums_1.TiltDirection.clockwise:
                particle.tilt.status = Enums_1.AnimationStatus.increasing;
                break;
        }
        const tiltAnimation = particle.options.tilt.animation;
        if (tiltAnimation.enable) {
            particle.tilt.velocity = (tiltAnimation.speed / 360) * this.container.retina.reduceFactor;
            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= Math.random();
            }
        }
    }
    isEnabled(particle) {
        const tilt = particle.options.tilt;
        const tiltAnimation = tilt.animation;
        return !particle.destroyed && !particle.spawning && tiltAnimation.enable;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateTilt(particle, delta);
    }
}
exports.TiltUpdater = TiltUpdater;
