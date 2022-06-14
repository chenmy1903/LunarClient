import { isInArray } from "../../../Utils";
import { ClickMode, HoverMode } from "../../../Enums";
import { ExternalInteractorBase } from "../../../Core/ExternalInteractorBase";
export class TrailMaker extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.delay = 0;
    }
    interact(delta) {
        var _a, _b, _c, _d;
        if (!this.container.retina.reduceFactor) {
            return;
        }
        const container = this.container, options = container.actualOptions, trailOptions = options.interactivity.modes.trail, optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;
        if (this.delay < optDelay) {
            this.delay += delta.value;
        }
        if (this.delay < optDelay) {
            return;
        }
        let canEmit = true;
        if (trailOptions.pauseOnStop) {
            if (container.interactivity.mouse.position === this.lastPosition ||
                (((_a = container.interactivity.mouse.position) === null || _a === void 0 ? void 0 : _a.x) === ((_b = this.lastPosition) === null || _b === void 0 ? void 0 : _b.x) &&
                    ((_c = container.interactivity.mouse.position) === null || _c === void 0 ? void 0 : _c.y) === ((_d = this.lastPosition) === null || _d === void 0 ? void 0 : _d.y))) {
                canEmit = false;
            }
        }
        if (container.interactivity.mouse.position) {
            this.lastPosition = {
                x: container.interactivity.mouse.position.x,
                y: container.interactivity.mouse.position.y,
            };
        }
        else {
            delete this.lastPosition;
        }
        if (canEmit) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }
        this.delay -= optDelay;
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events;
        return ((mouse.clicking && mouse.inside && !!mouse.position && isInArray(ClickMode.trail, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && isInArray(HoverMode.trail, events.onHover.mode)));
    }
    reset() {
    }
}
