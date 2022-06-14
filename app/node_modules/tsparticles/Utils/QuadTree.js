"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTree = void 0;
const Rectangle_1 = require("./Rectangle");
const Circle_1 = require("./Circle");
const CircleWarp_1 = require("./CircleWarp");
const NumberUtils_1 = require("./NumberUtils");
class QuadTree {
    constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    subdivide() {
        const x = this.rectangle.position.x;
        const y = this.rectangle.position.y;
        const w = this.rectangle.size.width;
        const h = this.rectangle.size.height;
        const capacity = this.capacity;
        this.northEast = new QuadTree(new Rectangle_1.Rectangle(x, y, w / 2, h / 2), capacity);
        this.northWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
        this.southEast = new QuadTree(new Rectangle_1.Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
        this.southWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this.divided = true;
    }
    insert(point) {
        var _a, _b, _c, _d, _e;
        if (!this.rectangle.contains(point.position)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) {
            this.subdivide();
        }
        return ((_e = (((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) ||
            ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) ||
            ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) ||
            ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point)))) !== null && _e !== void 0 ? _e : false);
    }
    queryCircle(position, radius) {
        return this.query(new Circle_1.Circle(position.x, position.y, radius));
    }
    queryCircleWarp(position, radius, containerOrSize) {
        const container = containerOrSize;
        const size = containerOrSize;
        return this.query(new CircleWarp_1.CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
    }
    queryRectangle(position, size) {
        return this.query(new Rectangle_1.Rectangle(position.x, position.y, size.width, size.height));
    }
    query(range, found) {
        var _a, _b, _c, _d;
        const res = found !== null && found !== void 0 ? found : [];
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        else {
            for (const p of this.points) {
                if (!range.contains(p.position) && (0, NumberUtils_1.getDistance)(range.position, p.position) > p.particle.getRadius()) {
                    continue;
                }
                res.push(p.particle);
            }
            if (this.divided) {
                (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
                (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
                (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
                (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
            }
        }
        return res;
    }
}
exports.QuadTree = QuadTree;
