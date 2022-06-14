"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesNumber = void 0;
const Density_1 = require("./Density");
class ParticlesNumber {
    constructor() {
        this.density = new Density_1.Density();
        this.limit = 0;
        this.value = 100;
    }
    get max() {
        return this.limit;
    }
    set max(value) {
        this.limit = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        this.density.load(data.density);
        const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
        if (limit !== undefined) {
            this.limit = limit;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ParticlesNumber = ParticlesNumber;
