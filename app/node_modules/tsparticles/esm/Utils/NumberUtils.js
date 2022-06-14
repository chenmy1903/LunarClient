import { EasingType, MoveDirection } from "../Enums";
import { Vector } from "../Core/Particle/Vector";
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
export function randomInRange(r) {
    const max = getRangeMax(r);
    let min = getRangeMin(r);
    if (max === min) {
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
export function getRangeValue(value) {
    return typeof value === "number" ? value : randomInRange(value);
}
export function getRangeMin(value) {
    return typeof value === "number" ? value : value.min;
}
export function getRangeMax(value) {
    return typeof value === "number" ? value : value.max;
}
export function setRangeValue(source, value) {
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
export function getValue(options) {
    const random = options.random;
    const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;
    return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
export function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
}
export function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
export function getParticleDirectionAngle(direction) {
    if (typeof direction === "number") {
        return (direction * Math.PI) / 180;
    }
    else {
        switch (direction) {
            case MoveDirection.top:
                return -Math.PI / 2;
            case MoveDirection.topRight:
                return -Math.PI / 4;
            case MoveDirection.right:
                return 0;
            case MoveDirection.bottomRight:
                return Math.PI / 4;
            case MoveDirection.bottom:
                return Math.PI / 2;
            case MoveDirection.bottomLeft:
                return (3 * Math.PI) / 4;
            case MoveDirection.left:
                return Math.PI;
            case MoveDirection.topLeft:
                return (-3 * Math.PI) / 4;
            case MoveDirection.none:
            default:
                return Math.random() * Math.PI * 2;
        }
    }
}
export function getParticleBaseVelocity(direction) {
    const baseVelocity = Vector.origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
export function collisionVelocity(v1, v2, m1, m2) {
    return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}
export function calcEasing(value, type) {
    switch (type) {
        case EasingType.easeOutQuad:
            return 1 - (1 - value) ** 2;
        case EasingType.easeOutCubic:
            return 1 - (1 - value) ** 3;
        case EasingType.easeOutQuart:
            return 1 - (1 - value) ** 4;
        case EasingType.easeOutQuint:
            return 1 - (1 - value) ** 5;
        case EasingType.easeOutExpo:
            return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
        case EasingType.easeOutSine:
            return Math.sin((value * Math.PI) / 2);
        case EasingType.easeOutBack: {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }
        case EasingType.easeOutCirc:
            return Math.sqrt(1 - Math.pow(value - 1, 2));
        default:
            return value;
    }
}
