import { OptionsColor } from "../../OptionsColor";
/**
 * @category Options
 */
export class Trail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new OptionsColor();
        this.fillColor.value = "#000000";
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
