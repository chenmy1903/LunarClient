"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attractor = void 0;
const Enums_1 = require("../../../Enums");
const Utils_1 = require("../../../Utils");
const ExternalInteractorBase_1 = require("../../../Core/ExternalInteractorBase");
const Vector_1 = require("../../../Core/Particle/Vector");
class Attractor extends ExternalInteractorBase_1.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events;
        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return (0, Utils_1.isInArray)(Enums_1.HoverMode.attract, hoverMode) || (0, Utils_1.isInArray)(Enums_1.ClickMode.attract, clickMode);
    }
    reset() {
    }
    interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === Utils_1.Constants.mouseMoveEvent, events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode;
        if (mouseMoveStatus && hoverEnabled && (0, Utils_1.isInArray)(Enums_1.HoverMode.attract, hoverMode)) {
            this.hoverAttract();
        }
        else if (clickEnabled && (0, Utils_1.isInArray)(Enums_1.ClickMode.attract, clickMode)) {
            this.clickAttract();
        }
    }
    hoverAttract() {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const attractRadius = container.retina.attractModeDistance;
        this.processAttract(mousePos, attractRadius, new Utils_1.Circle(mousePos.x, mousePos.y, attractRadius));
    }
    processAttract(position, attractRadius, area) {
        const container = this.container;
        const attractOptions = container.actualOptions.interactivity.modes.attract;
        const query = container.particles.quadTree.query(area);
        for (const particle of query) {
            const { dx, dy, distance } = (0, Utils_1.getDistances)(particle.position, position);
            const velocity = attractOptions.speed * attractOptions.factor;
            const attractFactor = (0, Utils_1.clamp)((0, Utils_1.calcEasing)(1 - distance / attractRadius, attractOptions.easing) * velocity, 0, attractOptions.maxSpeed);
            const normVec = Vector_1.Vector.create(distance === 0 ? velocity : (dx / distance) * attractFactor, distance === 0 ? velocity : (dy / distance) * attractFactor);
            particle.position.subFrom(normVec);
        }
    }
    clickAttract() {
        const container = this.container;
        if (!container.attract.finish) {
            if (!container.attract.count) {
                container.attract.count = 0;
            }
            container.attract.count++;
            if (container.attract.count === container.particles.count) {
                container.attract.finish = true;
            }
        }
        if (container.attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition;
            if (!mousePos) {
                return;
            }
            const attractRadius = container.retina.attractModeDistance;
            this.processAttract(mousePos, attractRadius, new Utils_1.Circle(mousePos.x, mousePos.y, attractRadius));
        }
        else if (container.attract.clicking === false) {
            container.attract.particles = [];
        }
        return;
    }
}
exports.Attractor = Attractor;
