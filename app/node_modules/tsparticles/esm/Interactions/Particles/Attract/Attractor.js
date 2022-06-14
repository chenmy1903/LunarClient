import { getDistances } from "../../../Utils";
import { ParticlesInteractorBase } from "../../../Core/ParticlesInteractorBase";
export class Attractor extends ParticlesInteractorBase {
    constructor(container) {
        super(container);
    }
    interact(p1) {
        var _a;
        const container = this.container, distance = (_a = p1.retina.attractDistance) !== null && _a !== void 0 ? _a : container.retina.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
        for (const p2 of query) {
            if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition(), { dx, dy } = getDistances(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * 1000), ay = dy / (rotate.y * 1000), p1Factor = p2.size.value / p1.size.value, p2Factor = 1 / p1Factor;
            p1.velocity.x -= ax * p1Factor;
            p1.velocity.y -= ay * p1Factor;
            p2.velocity.x += ax * p2Factor;
            p2.velocity.y += ay * p2Factor;
        }
    }
    isEnabled(particle) {
        return particle.options.move.attract.enable;
    }
    reset() {
    }
}
