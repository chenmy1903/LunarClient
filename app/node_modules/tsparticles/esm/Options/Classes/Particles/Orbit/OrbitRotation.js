import { ValueWithRandom } from "../../ValueWithRandom";
export class OrbitRotation extends ValueWithRandom {
    constructor() {
        super();
        this.value = 45;
        this.random.enable = false;
        this.random.minimumValue = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        super.load(data);
    }
}
