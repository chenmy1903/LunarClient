import { HoverMode, InteractivityDetect } from "../../../Enums";
import { Events } from "./Events/Events";
import { Modes } from "./Modes/Modes";
/**
 * [[include:Options/Interactivity.md]]
 * @category Options
 */
export class Interactivity {
    constructor() {
        this.detectsOn = InteractivityDetect.window;
        this.events = new Events();
        this.modes = new Modes();
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     */
    get detect_on() {
        return this.detectsOn;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     * @param value
     */
    set detect_on(value) {
        this.detectsOn = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;
        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }
        this.events.load(data.events);
        this.modes.load(data.modes);
        if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
            if (this.events.onHover.mode instanceof Array) {
                if (this.events.onHover.mode.indexOf(HoverMode.slow) < 0) {
                    this.events.onHover.mode.push(HoverMode.slow);
                }
            }
            else if (this.events.onHover.mode !== HoverMode.slow) {
                this.events.onHover.mode = [this.events.onHover.mode, HoverMode.slow];
            }
        }
    }
}
