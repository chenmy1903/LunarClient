"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twinkle = void 0;
const TwinkleValues_1 = require("./TwinkleValues");
class Twinkle {
    constructor() {
        this.lines = new TwinkleValues_1.TwinkleValues();
        this.particles = new TwinkleValues_1.TwinkleValues();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}
exports.Twinkle = Twinkle;
