"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeDefault = void 0;
const Enums_1 = require("../../../Enums");
class ThemeDefault {
    constructor() {
        this.auto = false;
        this.mode = Enums_1.ThemeMode.any;
        this.value = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.auto !== undefined) {
            this.auto = data.auto;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ThemeDefault = ThemeDefault;
