"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bounce = void 0;
class Bounce {
    constructor() {
        this.distance = 200;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}
exports.Bounce = Bounce;
