"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repulser = void 0;
const Enums_1 = require("../../../Enums");
const Utils_1 = require("../../../Utils");
const Vector_1 = require("../../../Core/Particle/Vector");
const ExternalInteractorBase_1 = require("../../../Core/ExternalInteractorBase");
class Repulser extends ExternalInteractorBase_1.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv, divRepulse = (0, Utils_1.isDivModeEnabled)(Enums_1.DivMode.repulse, divs);
        if (!(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return (0, Utils_1.isInArray)(Enums_1.HoverMode.repulse, hoverMode) || (0, Utils_1.isInArray)(Enums_1.ClickMode.repulse, clickMode) || divRepulse;
    }
    reset() {
    }
    interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === Utils_1.Constants.mouseMoveEvent, events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && (0, Utils_1.isInArray)(Enums_1.HoverMode.repulse, hoverMode)) {
            this.hoverRepulse();
        }
        else if (clickEnabled && (0, Utils_1.isInArray)(Enums_1.ClickMode.repulse, clickMode)) {
            this.clickRepulse();
        }
        else {
            (0, Utils_1.divModeExecute)(Enums_1.DivMode.repulse, divs, (selector, div) => this.singleSelectorRepulse(selector, div));
        }
    }
    singleSelectorRepulse(selector, div) {
        const container = this.container, query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, repulseRadius = (elem.offsetWidth / 2) * pxRatio, area = div.type === Enums_1.DivType.circle
                ? new Utils_1.Circle(pos.x, pos.y, repulseRadius)
                : new Utils_1.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = container.actualOptions.interactivity.modes.repulse.divs, divRepulse = (0, Utils_1.divMode)(divs, elem);
            this.processRepulse(pos, repulseRadius, area, divRepulse);
        });
    }
    hoverRepulse() {
        const container = this.container, mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const repulseRadius = container.retina.repulseModeDistance;
        this.processRepulse(mousePos, repulseRadius, new Utils_1.Circle(mousePos.x, mousePos.y, repulseRadius));
    }
    processRepulse(position, repulseRadius, area, divRepulse) {
        var _a;
        const container = this.container, query = container.particles.quadTree.query(area), repulseOptions = container.actualOptions.interactivity.modes.repulse;
        for (const particle of query) {
            const { dx, dy, distance } = (0, Utils_1.getDistances)(particle.position, position), velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor, repulseFactor = (0, Utils_1.clamp)((0, Utils_1.calcEasing)(1 - distance / repulseRadius, repulseOptions.easing) * velocity, 0, repulseOptions.maxSpeed), normVec = Vector_1.Vector.create(distance === 0 ? velocity : (dx / distance) * repulseFactor, distance === 0 ? velocity : (dy / distance) * repulseFactor);
            particle.position.addTo(normVec);
        }
    }
    clickRepulse() {
        const container = this.container;
        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }
            container.repulse.count++;
            if (container.repulse.count === container.particles.count) {
                container.repulse.finish = true;
            }
        }
        if (container.repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance, repulseRadius = Math.pow(repulseDistance / 6, 3), mouseClickPos = container.interactivity.mouse.clickPosition;
            if (mouseClickPos === undefined) {
                return;
            }
            const range = new Utils_1.Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container.particles.quadTree.query(range);
            for (const particle of query) {
                const { dx, dy, distance } = (0, Utils_1.getDistances)(mouseClickPos, particle.position), d = distance ** 2, velocity = container.actualOptions.interactivity.modes.repulse.speed, force = (-repulseRadius * velocity) / d;
                if (d <= repulseRadius) {
                    container.repulse.particles.push(particle);
                    const vect = Vector_1.Vector.create(dx, dy);
                    vect.length = force;
                    particle.velocity.setTo(vect);
                }
            }
        }
        else if (container.repulse.clicking === false) {
            for (const particle of container.repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.repulse.particles = [];
        }
    }
}
exports.Repulser = Repulser;
