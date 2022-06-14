import { calculateBounds, isPointInside } from "../../Utils";
import { OutMode, OutModeDirection } from "../../Enums";
import { bounceHorizontal, bounceVertical } from "./Utils";
export class OutOfCanvasUpdater {
    constructor(container) {
        this.container = container;
    }
    init() {
        // nothing
    }
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning;
    }
    update(particle, delta) {
        var _a, _b, _c, _d;
        const outModes = particle.options.move.outModes;
        this.updateOutMode(particle, delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, OutModeDirection.bottom);
        this.updateOutMode(particle, delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, OutModeDirection.left);
        this.updateOutMode(particle, delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, OutModeDirection.right);
        this.updateOutMode(particle, delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, OutModeDirection.top);
    }
    updateOutMode(particle, delta, outMode, direction) {
        switch (outMode) {
            case OutMode.bounce:
            case OutMode.bounceVertical:
            case OutMode.bounceHorizontal:
            case "bounceVertical":
            case "bounceHorizontal":
            case OutMode.split:
                this.bounce(particle, delta, direction, outMode);
                break;
            case OutMode.destroy:
                this.destroy(particle, direction);
                break;
            case OutMode.out:
                this.out(particle, direction);
                break;
            case OutMode.none:
            default:
                this.none(particle, direction);
                break;
        }
    }
    destroy(particle, direction) {
        const container = this.container;
        if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
            return;
        }
        container.particles.remove(particle, undefined, true);
    }
    out(particle, direction) {
        const container = this.container;
        if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
            return;
        }
        const wrap = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
            bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
            left: -particle.getRadius() - particle.offset.x,
            right: canvasSize.width + particle.getRadius() + particle.offset.x,
            top: -particle.getRadius() - particle.offset.y,
        }, sizeValue = particle.getRadius(), nextBounds = calculateBounds(particle.position, sizeValue);
        if (direction === OutModeDirection.right && nextBounds.left > canvasSize.width + particle.offset.x) {
            particle.position.x = newPos.left;
            particle.initialPosition.x = particle.position.x;
            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
            }
        }
        else if (direction === OutModeDirection.left && nextBounds.right < -particle.offset.x) {
            particle.position.x = newPos.right;
            particle.initialPosition.x = particle.position.x;
            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
            }
        }
        if (direction === OutModeDirection.bottom && nextBounds.top > canvasSize.height + particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
            }
            particle.position.y = newPos.top;
            particle.initialPosition.y = particle.position.y;
        }
        else if (direction === OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
            }
            particle.position.y = newPos.bottom;
            particle.initialPosition.y = particle.position.y;
        }
    }
    bounce(particle, delta, direction, outMode) {
        const container = this.container;
        let handled = false;
        for (const [, plugin] of container.plugins) {
            if (plugin.particleBounce !== undefined) {
                handled = plugin.particleBounce(particle, delta, direction);
            }
            if (handled) {
                break;
            }
        }
        if (handled) {
            return;
        }
        const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = calculateBounds(pos, size), canvasSize = container.canvas.size;
        bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
        bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }
    none(particle, direction) {
        if ((particle.options.move.distance.horizontal &&
            (direction === OutModeDirection.left || direction === OutModeDirection.right)) ||
            (particle.options.move.distance.vertical &&
                (direction === OutModeDirection.top || direction === OutModeDirection.bottom))) {
            return;
        }
        const gravityOptions = particle.options.move.gravity, container = this.container;
        const canvasSize = container.canvas.size;
        const pRadius = particle.getRadius();
        if (!gravityOptions.enable) {
            if ((particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius) ||
                (particle.velocity.y < 0 && particle.position.y >= -pRadius) ||
                (particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius) ||
                (particle.velocity.x < 0 && particle.position.x >= -pRadius)) {
                return;
            }
            if (!isPointInside(particle.position, container.canvas.size, pRadius, direction)) {
                container.particles.remove(particle);
            }
        }
        else {
            const position = particle.position;
            if ((!gravityOptions.inverse &&
                position.y > canvasSize.height + pRadius &&
                direction === OutModeDirection.bottom) ||
                (gravityOptions.inverse && position.y < -pRadius && direction === OutModeDirection.top)) {
                container.particles.remove(particle);
            }
        }
    }
}
