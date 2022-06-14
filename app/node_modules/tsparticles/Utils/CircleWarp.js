"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleWarp = void 0;
const Rectangle_1 = require("./Rectangle");
const Circle_1 = require("./Circle");
class CircleWarp extends Circle_1.Circle {
    constructor(x, y, radius, canvasSize) {
        super(x, y, radius);
        this.canvasSize = canvasSize;
        this.canvasSize = {
            height: canvasSize.height,
            width: canvasSize.width,
        };
    }
    contains(point) {
        if (super.contains(point)) {
            return true;
        }
        const posNE = {
            x: point.x - this.canvasSize.width,
            y: point.y,
        };
        if (super.contains(posNE)) {
            return true;
        }
        const posSE = {
            x: point.x - this.canvasSize.width,
            y: point.y - this.canvasSize.height,
        };
        if (super.contains(posSE)) {
            return true;
        }
        const posSW = {
            x: point.x,
            y: point.y - this.canvasSize.height,
        };
        return super.contains(posSW);
    }
    intersects(range) {
        if (super.intersects(range)) {
            return true;
        }
        const rect = range;
        const circle = range;
        const newPos = {
            x: range.position.x - this.canvasSize.width,
            y: range.position.y - this.canvasSize.height,
        };
        if (circle.radius !== undefined) {
            const biggerCircle = new Circle_1.Circle(newPos.x, newPos.y, circle.radius * 2);
            return super.intersects(biggerCircle);
        }
        else if (rect.size !== undefined) {
            const rectSW = new Rectangle_1.Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
            return super.intersects(rectSW);
        }
        return false;
    }
}
exports.CircleWarp = CircleWarp;
