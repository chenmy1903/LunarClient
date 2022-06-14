import { LightGradient } from "./LightGradient";
export class LightArea {
    constructor() {
        this.gradient = new LightGradient();
        this.radius = 1000;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.gradient.load(data.gradient);
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
