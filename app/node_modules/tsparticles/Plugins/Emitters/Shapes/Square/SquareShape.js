"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareShape = void 0;
function randomSquareCoordinate(position, offset) {
    return position + offset * (Math.random() - 0.5);
}
class SquareShape {
    randomPosition(position, offset, fill) {
        if (fill) {
            return {
                x: randomSquareCoordinate(position.x, offset.x),
                y: randomSquareCoordinate(position.y, offset.y),
            };
        }
        else {
            const halfW = offset.x / 2, halfH = offset.y / 2, side = Math.floor(Math.random() * 4), v = (Math.random() - 0.5) * 2;
            switch (side) {
                case 0:
                    return {
                        x: position.x + v * halfW,
                        y: position.y - halfH,
                    };
                case 1:
                    return {
                        x: position.x - halfW,
                        y: position.y + v * halfH,
                    };
                case 2:
                    return {
                        x: position.x + v * halfW,
                        y: position.y + halfH,
                    };
                case 3:
                default:
                    return {
                        x: position.x + halfW,
                        y: position.y + v * halfH,
                    };
            }
        }
    }
}
exports.SquareShape = SquareShape;
