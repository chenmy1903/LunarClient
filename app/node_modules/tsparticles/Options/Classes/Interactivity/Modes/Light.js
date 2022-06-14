"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
const LightArea_1 = require("./LightArea");
const LightShadow_1 = require("./LightShadow");
class Light {
    constructor() {
        this.area = new LightArea_1.LightArea();
        this.shadow = new LightShadow_1.LightShadow();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.area.load(data.area);
        this.shadow.load(data.shadow);
    }
}
exports.Light = Light;
