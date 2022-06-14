"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrabLinks = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class GrabLinks {
    constructor() {
        this.blink = false;
        this.consent = false;
        this.opacity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.GrabLinks = GrabLinks;
