"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const ClickEvent_1 = require("./ClickEvent");
const DivEvent_1 = require("./DivEvent");
const HoverEvent_1 = require("./HoverEvent");
class Events {
    constructor() {
        this.onClick = new ClickEvent_1.ClickEvent();
        this.onDiv = new DivEvent_1.DivEvent();
        this.onHover = new HoverEvent_1.HoverEvent();
        this.resize = true;
    }
    get onclick() {
        return this.onClick;
    }
    set onclick(value) {
        this.onClick = value;
    }
    get ondiv() {
        return this.onDiv;
    }
    set ondiv(value) {
        this.onDiv = value;
    }
    get onhover() {
        return this.onHover;
    }
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
                    const tmp = new DivEvent_1.DivEvent();
                    tmp.load(div);
                    return tmp;
                });
            }
            else {
                this.onDiv = new DivEvent_1.DivEvent();
                this.onDiv.load(onDiv);
            }
        }
        this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
        if (data.resize !== undefined) {
            this.resize = data.resize;
        }
    }
}
exports.Events = Events;
