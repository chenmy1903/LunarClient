const shapes = new Map();
export class ShapeManager {
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
