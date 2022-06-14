import { AnimationStatus, DestroyType } from "../../Enums";
import { clamp } from "../../Utils";
function checkDestroy(particle, value, minValue, maxValue) {
    switch (particle.options.size.animation.destroy) {
        case DestroyType.max:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case DestroyType.min:
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
        case AnimationStatus.increasing:
            if (particle.size.value >= maxValue) {
                particle.size.status = AnimationStatus.decreasing;
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value += sizeVelocity;
            }
            break;
        case AnimationStatus.decreasing:
            if (particle.size.value <= minValue) {
                particle.size.status = AnimationStatus.increasing;
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
        particle.size.value = clamp(particle.size.value, minValue, maxValue);
    }
}
export class SizeUpdater {
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
