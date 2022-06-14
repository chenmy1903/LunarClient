"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualParticle = void 0;
const Utils_1 = require("../../Utils");
class ManualParticle {
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        if (data.position !== undefined) {
            this.position = {
                x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
                y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50,
            };
        }
        if (data.options !== undefined) {
            this.options = (0, Utils_1.deepExtend)({}, data.options);
        }
    }
}
exports.ManualParticle = ManualParticle;
