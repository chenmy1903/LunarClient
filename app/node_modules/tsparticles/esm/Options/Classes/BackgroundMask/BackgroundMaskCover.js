import { OptionsColor } from "../OptionsColor";
export class BackgroundMaskCover {
    constructor() {
        this.color = new OptionsColor();
        this.opacity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
