"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inline = void 0;
const Enums_1 = require("../../Enums");
class Inline {
    constructor() {
        this.arrangement = Enums_1.InlineArrangement.onePerPoint;
    }
    load(data) {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
exports.Inline = Inline;
