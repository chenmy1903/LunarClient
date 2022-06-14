"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeUpdater = void 0;
const Enums_1 = require("../../Enums");
const Utils_1 = require("../../Utils");
function checkDestroy(particle, value, minValue, maxValue) {
    switch (particle.options.size.animation.destroy) {
        case Enums_1.DestroyType.max:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case Enums_1.DestroyType.min:
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}
function updateSize(particle, delta) {
    var _a, _b, _c, _d;
    const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const minValue = particle.size.min;
    const maxValue = particle.size.max;
    if (!(!particle.destroyed &&
        particle.size.enable &&
        (((_b = particle.size.loops) !== null && _b !== void 0 ? _b : 0) <= 0 || ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0)))) {
        return;
    }
    switch (particle.size.status) {
        case Enums_1.AnimationStatus.increasing:
            if (particle.size.value >= maxValue) {
                particle.size.status = Enums_1.AnimationStatus.decreasing;
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value += sizeVelocity;
            }
            break;
        case Enums_1.AnimationStatus.decreasing:
            if (particle.size.value <= minValue) {
                particle.size.status = Enums_1.AnimationStatus.increasing;
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value -= sizeVelocity;
            }
    }
    checkDestroy(particle, particle.size.value, minValue, maxValue);
    if (!particle.destroyed) {
        particle.size.value = (0, Utils_1.clamp)(particle.size.value, minValue, maxValue);
    }
}
class SizeUpdater {
    init() {
    }
    isEnabled(particle) {
        var _a, _b, _c;
        return (!particle.destroyed &&
            !particle.spawning &&
            particle.size.enable &&
            (((_a = particle.size.loops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.size.loops) !== null && _b !== void 0 ? _b : 0) < ((_c = particle.size.maxLoops) !== null && _c !== void 0 ? _c : 0)));
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateSize(particle, delta);
    }
}
exports.SizeUpdater = SizeUpdater;
