import { SizeAnimation } from "./SizeAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";
import { setRangeValue } from "../../../../Utils";
export class Size extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }
    get anim() {
        return this.animation;
    }
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
