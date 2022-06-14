import { Constants, getLinkRandomColor, getLinkColor, getDistance, isInArray } from "../../../Utils";
import { HoverMode } from "../../../Enums";
import { ExternalInteractorBase } from "../../../Core/ExternalInteractorBase";
export class Grabber extends ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, mouse = container.interactivity.mouse, events = container.actualOptions.interactivity.events;
        return events.onHover.enable && !!mouse.position && isInArray(HoverMode.grab, events.onHover.mode);
    }
    reset() {
    }
    interact() {
        var _a;
        const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
        if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            const distance = container.retina.grabModeDistance, query = container.particles.quadTree.queryCircle(mousePos, distance);
            for (const particle of query) {
                const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos);
                if (pointDistance <= distance) {
                    const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;
                    if (opacityLine <= 0) {
                        continue;
                    }
                    const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.options.links.color;
                    if (!container.particles.grabLineColor) {
                        const linksOptions = options.interactivity.modes.grab.links;
                        container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
                    }
                    const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);
                    if (!colorLine) {
                        return;
                    }
                    container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
                }
            }
        }
    }
}
