import { deepExtend, setRangeValue } from "../../../../Utils";
export class Spin {
    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = setRangeValue(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.position = data.position ? deepExtend({}, data.position) : undefined;
    }
}
