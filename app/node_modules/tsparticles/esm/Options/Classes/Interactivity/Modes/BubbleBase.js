import { OptionsColor } from "../../OptionsColor";
export class BubbleBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.mix = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.mix !== undefined) {
            this.mix = data.mix;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.color !== undefined) {
            if (data.color instanceof Array) {
                this.color = data.color.map((s) => OptionsColor.create(undefined, s));
            }
            else {
                if (this.color instanceof Array) {
                    this.color = new OptionsColor();
                }
                this.color = OptionsColor.create(this.color, data.color);
            }
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
    }
}
