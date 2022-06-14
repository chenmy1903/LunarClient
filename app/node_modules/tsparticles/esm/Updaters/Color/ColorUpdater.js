import { AnimationStatus } from "../../Enums";
import { colorToHsl, getHslAnimationFromHsl, randomInRange } from "../../Utils";
function updateColorValue(delta, value, valueAnimation, max, decrease) {
    var _a;
    const colorValue = value;
    if (!colorValue || !valueAnimation.enable) {
        return;
    }
    const offset = randomInRange(valueAnimation.offset);
    const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;
    if (!decrease || colorValue.status === AnimationStatus.increasing) {
        colorValue.value += velocity;
        if (decrease && colorValue.value > max) {
            colorValue.status = AnimationStatus.decreasing;
            colorValue.value -= colorValue.value % max;
        }
    }
    else {
        colorValue.value -= velocity;
        if (colorValue.value < 0) {
            colorValue.status = AnimationStatus.increasing;
            colorValue.value += colorValue.value;
        }
    }
    if (colorValue.value > max) {
        colorValue.value %= max;
    }
}
function updateColor(particle, delta) {
    var _a, _b, _c;
    const animationOptions = particle.options.color.animation;
    if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== undefined) {
        updateColorValue(delta, particle.color.h, animationOptions.h, 360, false);
    }
    if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== undefined) {
        updateColorValue(delta, particle.color.s, animationOptions.s, 100, true);
    }
    if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== undefined) {
        updateColorValue(delta, particle.color.l, animationOptions.l, 100, true);
    }
}
export class ColorUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const hslColor = colorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);
        if (hslColor) {
            particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
        }
    }
    isEnabled(particle) {
        var _a, _b, _c;
        const animationOptions = particle.options.color.animation;
        return (!particle.destroyed &&
            !particle.spawning &&
            ((((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h.value) !== undefined && animationOptions.h.enable) ||
                (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s.value) !== undefined && animationOptions.s.enable) ||
                (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l.value) !== undefined && animationOptions.l.enable)));
    }
    update(particle, delta) {
        updateColor(particle, delta);
    }
}
