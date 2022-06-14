import { OpacityAnimation } from "./OpacityAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";
import { setRangeValue } from "../../../../Utils";
/**
 * [[include:Options/Particles/Opacity.md]]
 * @category Options
 */
export class Opacity extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get anim() {
        return this.animation;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}
