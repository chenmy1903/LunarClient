import { OptionsColor } from "../../OptionsColor";
import { RollLight } from "./RollLight";
import { setRangeValue } from "../../../../Utils";
import { RollMode } from "../../../../Enums";
export class Roll {
    constructor() {
        this.darken = new RollLight();
        this.enable = false;
        this.enlighten = new RollLight();
        this.mode = RollMode.vertical;
        this.speed = 25;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.backColor !== undefined) {
            this.backColor = OptionsColor.create(this.backColor, data.backColor);
        }
        this.darken.load(data.darken);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.enlighten.load(data.enlighten);
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
    }
}
