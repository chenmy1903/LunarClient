"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bouncer = void 0;
const Utils_1 = require("../../../Utils");
const Enums_1 = require("../../../Enums");
const Vector_1 = require("../../../Core/Particle/Vector");
const ExternalInteractorBase_1 = require("../../../Core/ExternalInteractorBase");
class Bouncer extends ExternalInteractorBase_1.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv;
        return ((mouse.position && events.onHover.enable && (0, Utils_1.isInArray)(Enums_1.HoverMode.bounce, events.onHover.mode)) ||
            (0, Utils_1.isDivModeEnabled)(Enums_1.DivMode.bounce, divs));
    }
    interact() {
        const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === Utils_1.Constants.mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && (0, Utils_1.isInArray)(Enums_1.HoverMode.bounce, hoverMode)) {
            this.processMouseBounce();
        }
        else {
            (0, Utils_1.divModeExecute)(Enums_1.DivMode.bounce, divs, (selector, div) => this.singleSelectorBounce(selector, div));
        }
    }
    reset() {
    }
    processMouseBounce() {
        const container = this.container, pxRatio = container.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
        if (mousePos) {
            this.processBounce(mousePos, radius, new Utils_1.Circle(mousePos.x, mousePos.y, radius + tolerance));
        }
    }
    singleSelectorBounce(selector, div) {
        const container = this.container;
        const query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, radius = (elem.offsetWidth / 2) * pxRatio, tolerance = 10 * pxRatio;
            const area = div.type === Enums_1.DivType.circle
                ? new Utils_1.Circle(pos.x, pos.y, radius + tolerance)
                : new Utils_1.Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
            this.processBounce(pos, radius, area);
        });
    }
    processBounce(position, radius, area) {
        const query = this.container.particles.quadTree.query(area);
        for (const particle of query) {
            if (area instanceof Utils_1.Circle) {
                (0, Utils_1.circleBounce)((0, Utils_1.circleBounceDataFromParticle)(particle), {
                    position,
                    radius,
                    mass: (radius ** 2 * Math.PI) / 2,
                    velocity: Vector_1.Vector.origin,
                    factor: Vector_1.Vector.origin,
                });
            }
            else if (area instanceof Utils_1.Rectangle) {
                (0, Utils_1.rectBounce)(particle, (0, Utils_1.calculateBounds)(position, radius));
            }
        }
    }
}
exports.Bouncer = Bouncer;
