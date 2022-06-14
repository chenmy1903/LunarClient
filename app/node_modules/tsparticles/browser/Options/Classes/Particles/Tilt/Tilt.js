import { TiltAnimation } from "./TiltAnimation";
import { TiltDirection } from "../../../../Enums";
import { ValueWithRandom } from "../../ValueWithRandom";
/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export class Tilt extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new TiltAnimation();
        this.direction = TiltDirection.clockwise;
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        this.animation.load(data.animation);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
