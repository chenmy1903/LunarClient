"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeManager = void 0;
const shapes = new Map();
class ShapeManager {
    static addShape(name, drawer) {
        if (!ShapeManager.getShape(name)) {
            shapes.set(name, drawer);
        }
    }
    static getShape(name) {
        return shapes.get(name);
    }
    static getSupportedShapes() {
        return shapes.keys();
    }
}
exports.ShapeManager = ShapeManager;
