import { OrbitRotation } from "./OrbitRotation";
import { OptionsColor } from "../../OptionsColor";
import { AnimationOptions } from "../../AnimationOptions";
/**
 * [[include:Options/Particles/Orbit.md]]
 * @category Options
 */
export class Orbit {
    constructor() {
        this.animation = new AnimationOptions();
        this.enable = false;
        this.opacity = 1;
        this.rotation = new OrbitRotation();
        this.width = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.animation.load(data.animation);
        this.rotation.load(data.rotation);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
    }
}
