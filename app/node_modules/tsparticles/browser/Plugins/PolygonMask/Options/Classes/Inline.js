import { InlineArrangement } from "../../Enums";
/**
 * @category Polygon Mask Plugin
 */
export class Inline {
    constructor() {
        this.arrangement = InlineArrangement.onePerPoint;
    }
    load(data) {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
