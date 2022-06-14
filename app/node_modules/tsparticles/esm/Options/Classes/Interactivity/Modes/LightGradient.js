import { OptionsColor } from "../../OptionsColor";
export class LightGradient {
    constructor() {
        this.start = new OptionsColor();
        this.stop = new OptionsColor();
        this.start.value = "#ffffff";
        this.stop.value = "#000000";
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.start = OptionsColor.create(this.start, data.start);
        this.stop = OptionsColor.create(this.stop, data.stop);
    }
}
