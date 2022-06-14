"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collisions = void 0;
const Enums_1 = require("../../../../Enums");
const Bounce_1 = require("../Bounce/Bounce");
const CollisionsOverlap_1 = require("./CollisionsOverlap");
class Collisions {
    constructor() {
        this.bounce = new Bounce_1.Bounce();
        this.enable = false;
        this.mode = Enums_1.CollisionMode.bounce;
        this.overlap = new CollisionsOverlap_1.CollisionsOverlap();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}
exports.Collisions = Collisions;
