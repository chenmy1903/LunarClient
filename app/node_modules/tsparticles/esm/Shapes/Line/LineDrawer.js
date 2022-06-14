export class LineDrawer {
    getSidesCount() {
        return 1;
    }
    draw(context, particle, radius) {
        context.moveTo(-radius / 2, 0);
        context.lineTo(radius / 2, 0);
    }
}
