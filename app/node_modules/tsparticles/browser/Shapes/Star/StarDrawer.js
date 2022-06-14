/**
 * @category Shape Drawers
 */
export class StarDrawer {
    getSidesCount(particle) {
        var _a, _b;
        const star = particle.shapeData;
        return (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
    }
    draw(context, particle, radius) {
        var _a;
        const star = particle.shapeData;
        const sides = this.getSidesCount(particle);
        const inset = (_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2;
        context.moveTo(0, 0 - radius);
        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius);
        }
    }
}
