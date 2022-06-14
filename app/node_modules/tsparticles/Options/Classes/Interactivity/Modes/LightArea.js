"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightArea = void 0;
const LightGradient_1 = require("./LightGradient");
class LightArea {
    constructor() {
        this.gradient = new LightGradient_1.LightGradient();
        this.radius = 1000;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.gradient.load(data.gradient);
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
exports.LightArea = LightArea;
