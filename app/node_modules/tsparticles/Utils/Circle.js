"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Range_1 = require("./Range");
const NumberUtils_1 = require("./NumberUtils");
class Circle extends Range_1.Range {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    contains(point) {
        return (0, NumberUtils_1.getDistance)(point, this.position) <= this.radius;
    }
    intersects(range) {
        const rect = range;
        const circle = range;
        const pos1 = this.position;
        const pos2 = range.position;
        const xDist = Math.abs(pos2.x - pos1.x);
        const yDist = Math.abs(pos2.y - pos1.y);
        const r = this.radius;
        if (circle.radius !== undefined) {
            const rSum = r + circle.radius;
            const dist = Math.sqrt(xDist * xDist + yDist + yDist);
            return rSum > dist;
        }
        else if (rect.size !== undefined) {
            const w = rect.size.width;
            const h = rect.size.height;
            const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
            if (xDist > r + w || yDist > r + h) {
                return false;
            }
            if (xDist <= w || yDist <= h) {
                return true;
            }
            return edges <= r * r;
        }
        return false;
    }
}
exports.Circle = Circle;
