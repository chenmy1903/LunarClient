import { DivType } from "../../../../Enums";
/**
 * [[include:Options/Interactivity/Div.md]]
 * @category Options
 */
export class DivEvent {
    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = DivType.circle;
    }
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     */
    get elementId() {
        return this.ids;
    }
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     * @param value
     */
    set elementId(value) {
        this.ids = value;
    }
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     */
    get el() {
        return this.elementId;
    }
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new selectors
     * @param value
     */
    set el(value) {
        this.elementId = value;
    }
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     */
    get ids() {
        return this.selectors instanceof Array
            ? this.selectors.map((t) => t.replace("#", ""))
            : this.selectors.replace("#", "");
        // this is the best we can do, if a non-id selector is used the old property won't work
        // but ids is deprecated so who cares.
    }
    /**
     * The element id to detect the event
     * @deprecated this property is obsolete, please use the new ids
     * @param value
     */
    set ids(value) {
        this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
    }
    load(data) {
        var _a, _b;
        if (data === undefined) {
            return;
        }
        const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;
        if (ids !== undefined) {
            this.ids = ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
