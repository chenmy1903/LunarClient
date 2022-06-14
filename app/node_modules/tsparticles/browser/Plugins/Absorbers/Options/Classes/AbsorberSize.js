import { ValueWithRandom } from "../../../../Options/Classes/ValueWithRandom";
import { AbsorberSizeLimit } from "./AbsorberSizeLimit";
export class AbsorberSize extends ValueWithRandom {
    constructor() {
        super();
        this.density = 5;
        this.random.minimumValue = 1;
        this.value = 50;
        this.limit = new AbsorberSizeLimit();
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.density !== undefined) {
            this.density = data.density;
        }
        if (typeof data.limit === "number") {
            this.limit.radius = data.limit;
        }
        else {
            this.limit.load(data.limit);
        }
    }
}
