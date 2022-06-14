"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trail = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class Trail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new OptionsColor_1.OptionsColor();
        this.fillColor.value = "#000000";
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.fillColor = OptionsColor_1.OptionsColor.create(this.fillColor, data.fillColor);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
exports.Trail = Trail;
