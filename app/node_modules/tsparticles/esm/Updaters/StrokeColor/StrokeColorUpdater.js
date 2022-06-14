import { colorToHsl, getHslAnimationFromHsl, itemFromArray, randomInRange } from "../../Utils";
import { AnimationStatus } from "../../Enums";
function updateColorValue(delta, value, valueAnimation, max, decrease) {
    var _a;
    const colorValue = value;
    if (!colorValue || !colorValue.enable) {
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
function updateStrokeColor(particle, delta) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (!((_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color)) {
        return;
    }
    const animationOptions = particle.stroke.color.animation;
    const h = (_c = (_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h) !== null && _c !== void 0 ? _c : (_d = particle.color) === null || _d === void 0 ? void 0 : _d.h;
    if (h) {
        updateColorValue(delta, h, animationOptions.h, 360, false);
    }
    const s = (_f = (_e = particle.strokeColor) === null || _e === void 0 ? void 0 : _e.s) !== null && _f !== void 0 ? _f : (_g = particle.color) === null || _g === void 0 ? void 0 : _g.s;
    if (s) {
        updateColorValue(delta, s, animationOptions.s, 100, true);
    }
    const l = (_j = (_h = particle.strokeColor) === null || _h === void 0 ? void 0 : _h.l) !== null && _j !== void 0 ? _j : (_k = particle.color) === null || _k === void 0 ? void 0 : _k.l;
    if (l) {
        updateColorValue(delta, l, animationOptions.l, 100, true);
    }
}
export class StrokeColorUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        var _a, _b;
        const container = this.container;
        particle.stroke =
            particle.options.stroke instanceof Array
                ? itemFromArray(particle.options.stroke, particle.id, particle.options.reduceDuplicates)
                : particle.options.stroke;
        particle.strokeWidth = particle.stroke.width * container.retina.pixelRatio;
        const strokeHslColor = (_a = colorToHsl(particle.stroke.color)) !== null && _a !== void 0 ? _a : particle.getFillColor();
        if (strokeHslColor) {
            particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, (_b = particle.stroke.color) === null || _b === void 0 ? void 0 : _b.animation, container.retina.reduceFactor);
        }
    }
    isEnabled(particle) {
        var _a, _b, _c, _d;
        const color = (_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color;
        return (!particle.destroyed &&
            !particle.spawning &&
            !!color &&
            ((((_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h.value) !== undefined && color.animation.h.enable) ||
                (((_c = particle.strokeColor) === null || _c === void 0 ? void 0 : _c.s.value) !== undefined && color.animation.s.enable) ||
                (((_d = particle.strokeColor) === null || _d === void 0 ? void 0 : _d.l.value) !== undefined && color.animation.l.enable)));
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateStrokeColor(particle, delta);
    }
}
