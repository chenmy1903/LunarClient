import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
/**
 * [[include:Options/Interactivity/Events.md]]
 * @category Options
 */
export class Events {
    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = true;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    get onclick() {
        return this.onClick;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    set onclick(value) {
        this.onClick = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */
    get ondiv() {
        return this.onDiv;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    set ondiv(value) {
        this.onDiv = value;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */
    get onhover() {
        return this.onHover;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    set onhover(value) {
        this.onHover = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
        const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;
        if (onDiv !== undefined) {
            if (onDiv instanceof Array) {
                this.onDiv = onDiv.map((div) => {
                    const tmp = new DivEvent();
                    tmp.load(div);
                    return tmp;
                });
            }
            else {
                this.onDiv = new DivEvent();
                this.onDiv.load(onDiv);
            }
        }
        this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
        if (data.resize !== undefined) {
            this.resize = data.resize;
        }
    }
}
