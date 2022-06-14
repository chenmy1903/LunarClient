import { LightArea } from "./LightArea";
import { LightShadow } from "./LightShadow";
export class Light {
    constructor() {
        this.area = new LightArea();
        this.shadow = new LightShadow();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.area.load(data.area);
        this.shadow.load(data.shadow);
    }
}
