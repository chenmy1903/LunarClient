import { OptionsColor } from "../../../../Options/Classes/OptionsColor";
import { stringToAlpha } from "../../../../Utils";
/**
 * @category Polygon Mask Plugin
 */
export class DrawStroke {
    constructor() {
        this.color = new OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }
    load(data) {
        var _a;
        if (data !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
            if (typeof this.color.value === "string") {
                this.opacity = (_a = stringToAlpha(this.color.value)) !== null && _a !== void 0 ? _a : this.opacity;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
