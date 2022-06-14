import { BubbleDiv } from "./BubbleDiv";
import { BubbleBase } from "./BubbleBase";
/**
 * @category Options
 */
export class Bubble extends BubbleBase {
    load(data) {
        super.load(data);
        if (!(data !== undefined && data.divs !== undefined)) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new BubbleDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new BubbleDiv();
            }
            this.divs.load(data.divs);
        }
    }
}
