import { BubbleBase } from "./BubbleBase";
/**
 * @category Options
 */
export class BubbleDiv extends BubbleBase {
    constructor() {
        super();
        this.selectors = [];
    }
    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    get ids() {
        return this.selectors instanceof Array
            ? this.selectors.map((t) => t.replace("#", ""))
            : this.selectors.replace("#", "");
    }
    /**
     * @deprecated This property is deprecated, please use the new selectors property
     */
    set ids(value) {
        this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
    }
    load(data) {
        super.load(data);
        if (data === undefined) {
            return;
        }
        if (data.ids !== undefined) {
            this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
