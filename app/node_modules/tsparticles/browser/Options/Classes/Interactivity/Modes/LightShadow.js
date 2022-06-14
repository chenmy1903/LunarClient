import { OptionsColor } from "../../OptionsColor";
export class LightShadow {
    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#000000";
        this.length = 2000;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.color = OptionsColor.create(this.color, data.color);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
