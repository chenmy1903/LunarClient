"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcEasing = exports.collisionVelocity = exports.getParticleBaseVelocity = exports.getParticleDirectionAngle = exports.getDistance = exports.getDistances = exports.getValue = exports.setRangeValue = exports.getRangeMax = exports.getRangeMin = exports.getRangeValue = exports.randomInRange = exports.mix = exports.clamp = void 0;
const Enums_1 = require("../Enums");
const Vector_1 = require("../Core/Particle/Vector");
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
exports.clamp = clamp;
function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
exports.mix = mix;
function randomInRange(r) {
    const max = getRangeMax(r);
    let min = getRangeMin(r);
    if (max === min) {
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
exports.randomInRange = randomInRange;
function getRangeValue(value) {
    return typeof value === "number" ? value : randomInRange(value);
}
exports.getRangeValue = getRangeValue;
function getRangeMin(value) {
    return typeof value === "number" ? value : value.min;
}
exports.getRangeMin = getRangeMin;
function getRangeMax(value) {
    return typeof value === "number" ? value : value.max;
}
exports.getRangeMax = getRangeMax;
function setRangeValue(source, value) {
    if (source === value || (value === undefined && typeof source === "number")) {
        return source;
    }
    const min = getRangeMin(source), max = getRangeMax(source);
    return value !== undefined
        ? {
            min: Math.min(min, value),
            max: Math.max(max, value),
        }
        : setRangeValue(min, max);
}
exports.setRangeValue = setRangeValue;
function getValue(options) {
    const random = options.random;
    const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;
    return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
exports.getValue = getValue;
function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
}
exports.getDistances = getDistances;
function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
exports.getDistance = getDistance;
function getParticleDirectionAngle(direction) {
    if (typeof direction === "number") {
        return (direction * Math.PI) / 180;
    }
    else {
        switch (direction) {
            case Enums_1.MoveDirection.top:
                return -Math.PI / 2;
            case Enums_1.MoveDirection.topRight:
                return -Math.PI / 4;
            case Enums_1.MoveDirection.right:
                return 0;
            case Enums_1.MoveDirection.bottomRight:
                return Math.PI / 4;
            case Enums_1.MoveDirection.bottom:
                return Math.PI / 2;
            case Enums_1.MoveDirection.bottomLeft:
                return (3 * Math.PI) / 4;
            case Enums_1.MoveDirection.left:
                return Math.PI;
            case Enums_1.MoveDirection.topLeft:
                return (-3 * Math.PI) / 4;
            case Enums_1.MoveDirection.none:
            default:
                return Math.random() * Math.PI * 2;
        }
    }
}
exports.getParticleDirectionAngle = getParticleDirectionAngle;
function getParticleBaseVelocity(direction) {
    const baseVelocity = Vector_1.Vector.origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
exports.getParticleBaseVelocity = getParticleBaseVelocity;
function collisionVelocity(v1, v2, m1, m2) {
    return Vector_1.Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}
exports.collisionVelocity = collisionVelocity;
function calcEasing(value, type) {
    switch (type) {
        case Enums_1.EasingType.easeOutQuad:
            return 1 - (1 - value) ** 2;
        case Enums_1.EasingType.easeOutCubic:
            return 1 - (1 - value) ** 3;
        case Enums_1.EasingType.easeOutQuart:
            return 1 - (1 - value) ** 4;
        case Enums_1.EasingType.easeOutQuint:
            return 1 - (1 - value) ** 5;
        case Enums_1.EasingType.easeOutExpo:
            return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
        case Enums_1.EasingType.easeOutSine:
            return Math.sin((value * Math.PI) / 2);
        case Enums_1.EasingType.easeOutBack: {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }
        case Enums_1.EasingType.easeOutCirc:
            return Math.sqrt(1 - Math.pow(value - 1, 2));
        default:
            return value;
    }
}
exports.calcEasing = calcEasing;
