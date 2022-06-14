import { Type } from "../../Enums";
import { Draw } from "./Draw";
import { Move } from "./Move";
import { Inline } from "./Inline";
import { LocalSvg } from "./LocalSvg";
import { deepExtend } from "../../../../Utils";
/**
 * [[include:Options/Plugins/PolygonMask.md]]
 * @category Polygon Mask Plugin
 */
export class PolygonMask {
    constructor() {
        this.draw = new Draw();
        this.enable = false;
        this.inline = new Inline();
        this.move = new Move();
        this.scale = 1;
        this.type = Type.none;
    }
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get inlineArrangement() {
        return this.inline.arrangement;
    }
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    set inlineArrangement(value) {
        this.inline.arrangement = value;
    }
    load(data) {
        var _a;
        if (data !== undefined) {
            this.draw.load(data.draw);
            const inline = (_a = data.inline) !== null && _a !== void 0 ? _a : {
                arrangement: data.inlineArrangement,
            };
            if (inline !== undefined) {
                this.inline.load(inline);
            }
            this.move.load(data.move);
            if (data.scale !== undefined) {
                this.scale = data.scale;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            else {
                this.enable = this.type !== Type.none;
            }
            if (data.url !== undefined) {
                this.url = data.url;
            }
            if (data.data !== undefined) {
                if (typeof data.data === "string") {
                    this.data = data.data;
                }
                else {
                    this.data = new LocalSvg();
                    this.data.load(data.data);
                }
            }
            if (data.position !== undefined) {
                this.position = deepExtend({}, data.position);
            }
        }
    }
}
