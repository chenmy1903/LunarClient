import { Circle, clamp, colorMix, colorToHsl, Constants, divMode, divModeExecute, getDistance, getRangeMax, isDivModeEnabled, isInArray, itemFromArray, Rectangle, rgbToHsl, } from "../../../Utils";
import { ClickMode, DivMode, DivType, HoverMode } from "../../../Enums";
import { ExternalInteractorBase } from "../../../Core/ExternalInteractorBase";
import { ProcessBubbleType } from "./ProcessBubbleType";
function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
    if (modeValue >= optionsValue) {
        const value = particleValue + (modeValue - optionsValue) * ratio;
        return clamp(value, particleValue, modeValue);
    }
    else if (modeValue < optionsValue) {
        const value = particleValue - (optionsValue - modeValue) * ratio;
        return clamp(value, modeValue, particleValue);
    }
}
/**
 * Particle bubble manager
 * @category Interactions
 */
export class Bubbler extends ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv, divBubble = isDivModeEnabled(DivMode.bubble, divs);
        if (!(divBubble || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;
        return isInArray(HoverMode.bubble, hoverMode) || isInArray(ClickMode.bubble, clickMode) || divBubble;
    }
    reset(particle, force) {
        if (!(!particle.bubble.inRange || force)) {
            return;
        }
        delete particle.bubble.div;
        delete particle.bubble.opacity;
        delete particle.bubble.radius;
        delete particle.bubble.color;
    }
    interact() {
        const options = this.container.actualOptions, events = options.interactivity.events, onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
        /* on hover event */
        if (hoverEnabled && isInArray(HoverMode.bubble, hoverMode)) {
            this.hoverBubble();
        }
        else if (clickEnabled && isInArray(ClickMode.bubble, clickMode)) {
            this.clickBubble();
        }
        else {
            divModeExecute(DivMode.bubble, divs, (selector, div) => this.singleSelectorHover(selector, div));
        }
    }
    singleSelectorHover(selector, div) {
        const container = this.container, selectors = document.querySelectorAll(selector);
        if (!selectors.length) {
            return;
        }
        selectors.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, repulseRadius = (elem.offsetWidth / 2) * pxRatio, area = div.type === DivType.circle
                ? new Circle(pos.x, pos.y, repulseRadius)
                : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container.particles.quadTree.query(area);
            for (const particle of query) {
                if (!area.contains(particle.getPosition())) {
                    continue;
                }
                particle.bubble.inRange = true;
                const divs = container.actualOptions.interactivity.modes.bubble.divs;
                const divBubble = divMode(divs, elem);
                if (!particle.bubble.div || particle.bubble.div !== elem) {
                    this.reset(particle, true);
                    particle.bubble.div = elem;
                }
                /* size */
                this.hoverBubbleSize(particle, 1, divBubble);
                /* opacity */
                this.hoverBubbleOpacity(particle, 1, divBubble);
                /* color */
                this.hoverBubbleColor(particle, 1, divBubble);
            }
        });
    }
    process(particle, distMouse, timeSpent, data) {
        const container = this.container, bubbleParam = data.bubbleObj.optValue;
        if (bubbleParam === undefined) {
            return;
        }
        const options = container.actualOptions, bubbleDuration = options.interactivity.modes.bubble.duration, bubbleDistance = container.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value || 0, type = data.type;
        if (bubbleParam === particlesParam) {
            return;
        }
        if (!container.bubble.durationEnd) {
            if (distMouse <= bubbleDistance) {
                const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;
                if (obj !== bubbleParam) {
                    const value = pObj - (timeSpent * (pObj - bubbleParam)) / bubbleDuration;
                    if (type === ProcessBubbleType.size) {
                        particle.bubble.radius = value;
                    }
                    if (type === ProcessBubbleType.opacity) {
                        particle.bubble.opacity = value;
                    }
                }
            }
            else {
                if (type === ProcessBubbleType.size) {
                    delete particle.bubble.radius;
                }
                if (type === ProcessBubbleType.opacity) {
                    delete particle.bubble.opacity;
                }
            }
        }
        else if (pObjBubble) {
            if (type === ProcessBubbleType.size) {
                delete particle.bubble.radius;
            }
            if (type === ProcessBubbleType.opacity) {
                delete particle.bubble.opacity;
            }
        }
    }
    clickBubble() {
        var _a, _b;
        const container = this.container, options = container.actualOptions, mouseClickPos = container.interactivity.mouse.clickPosition;
        if (!mouseClickPos) {
            return;
        }
        const distance = container.retina.bubbleModeDistance, query = container.particles.quadTree.queryCircle(mouseClickPos, distance);
        for (const particle of query) {
            if (!container.bubble.clicking) {
                continue;
            }
            particle.bubble.inRange = !container.bubble.durationEnd;
            const pos = particle.getPosition(), distMouse = getDistance(pos, mouseClickPos), timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;
            if (timeSpent > options.interactivity.modes.bubble.duration) {
                container.bubble.durationEnd = true;
            }
            if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.durationEnd = false;
            }
            const sizeData = {
                bubbleObj: {
                    optValue: container.retina.bubbleModeSize,
                    value: particle.bubble.radius,
                },
                particlesObj: {
                    optValue: getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
                    value: particle.size.value,
                },
                type: ProcessBubbleType.size,
            };
            this.process(particle, distMouse, timeSpent, sizeData);
            const opacityData = {
                bubbleObj: {
                    optValue: options.interactivity.modes.bubble.opacity,
                    value: particle.bubble.opacity,
                },
                particlesObj: {
                    optValue: getRangeMax(particle.options.opacity.value),
                    value: (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1,
                },
                type: ProcessBubbleType.opacity,
            };
            this.process(particle, distMouse, timeSpent, opacityData);
            if (!container.bubble.durationEnd) {
                if (distMouse <= container.retina.bubbleModeDistance) {
                    this.hoverBubbleColor(particle, distMouse);
                }
                else {
                    delete particle.bubble.color;
                }
            }
            else {
                delete particle.bubble.color;
            }
        }
    }
    hoverBubble() {
        const container = this.container, mousePos = container.interactivity.mouse.position;
        if (mousePos === undefined) {
            return;
        }
        const distance = container.retina.bubbleModeDistance, query = container.particles.quadTree.queryCircle(mousePos, distance);
        //for (const { distance, particle } of query) {
        for (const particle of query) {
            particle.bubble.inRange = true;
            const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos), ratio = 1 - pointDistance / distance;
            /* mousemove - check ratio */
            if (pointDistance <= distance) {
                if (ratio >= 0 && container.interactivity.status === Constants.mouseMoveEvent) {
                    /* size */
                    this.hoverBubbleSize(particle, ratio);
                    /* opacity */
                    this.hoverBubbleOpacity(particle, ratio);
                    /* color */
                    this.hoverBubbleColor(particle, ratio);
                }
            }
            else {
                this.reset(particle);
            }
            /* mouseleave */
            if (container.interactivity.status === Constants.mouseLeaveEvent) {
                this.reset(particle);
            }
        }
    }
    hoverBubbleSize(particle, ratio, divBubble) {
        const container = this.container, modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;
        if (modeSize === undefined) {
            return;
        }
        const optSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio;
        const pSize = particle.size.value;
        const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }
    hoverBubbleOpacity(particle, ratio, divBubble) {
        var _a, _b, _c;
        const container = this.container, options = container.actualOptions, modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.opacity;
        if (!modeOpacity) {
            return;
        }
        const optOpacity = particle.options.opacity.value;
        const pOpacity = (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1;
        const opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }
    hoverBubbleColor(particle, ratio, divBubble) {
        const options = this.container.actualOptions;
        const bubbleOptions = divBubble !== null && divBubble !== void 0 ? divBubble : options.interactivity.modes.bubble;
        if (!particle.bubble.finalColor) {
            const modeColor = bubbleOptions.color;
            if (!modeColor) {
                return;
            }
            const bubbleColor = modeColor instanceof Array ? itemFromArray(modeColor) : modeColor;
            particle.bubble.finalColor = colorToHsl(bubbleColor);
        }
        if (!particle.bubble.finalColor) {
            return;
        }
        if (bubbleOptions.mix) {
            particle.bubble.color = undefined;
            const pColor = particle.getFillColor();
            particle.bubble.color = pColor
                ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, 1 - ratio, ratio))
                : particle.bubble.finalColor;
        }
        else {
            particle.bubble.color = particle.bubble.finalColor;
        }
    }
}
