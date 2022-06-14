"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonDrawer = void 0;
const PolygonDrawerBase_1 = require("./PolygonDrawerBase");
class PolygonDrawer extends PolygonDrawerBase_1.PolygonDrawerBase {
    getSidesData(particle, radius) {
        var _a, _b;
        const polygon = particle.shapeData;
        const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * 2.66) / (sides / 3),
        };
    }
    getCenter(particle, radius) {
        const sides = this.getSidesCount(particle);
        return {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
    }
}
exports.PolygonDrawer = PolygonDrawer;
