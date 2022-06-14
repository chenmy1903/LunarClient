import { GrabLinks } from "./GrabLinks";
/**
 * @category Options
 */
export class Grab {
    constructor() {
        this.distance = 100;
        this.links = new GrabLinks();
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    get line_linked() {
        return this.links;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    set line_linked(value) {
        this.links = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     */
    get lineLinked() {
        return this.links;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new links
     * @param value
     */
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b;
        if (data === undefined) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
    }
}
