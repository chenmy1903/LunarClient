import { SplitFactor } from "./SplitFactor";
import { SplitRate } from "./SplitRate";
import { deepExtend } from "../../../../Utils";
export class Split {
    constructor() {
        this.count = 1;
        this.factor = new SplitFactor();
        this.rate = new SplitRate();
        this.sizeOffset = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.factor.load(data.factor);
        this.rate.load(data.rate);
        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles);
        }
        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
    }
}
