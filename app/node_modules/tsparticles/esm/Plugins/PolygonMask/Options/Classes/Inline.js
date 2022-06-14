import { InlineArrangement } from "../../Enums";
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
