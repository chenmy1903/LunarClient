"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleDrawer = void 0;
class CircleDrawer {
    getSidesCount() {
        return 12;
    }
    draw(context, particle, radius) {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    }
}
exports.CircleDrawer = CircleDrawer;
